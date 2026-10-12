<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    private const MAX_QTY_PER_ITEM = 20;
    /** Used with the courier rate card for any product that has no weight set. */
    private const DEFAULT_ITEM_WEIGHT_GRAMS = 250;

    // ── Helpers ───────────────────────────────────────────────────────────────

    /** Storefront requests always resolve to a configured store, whatever the client sends. */
    private function identity(Request $request): array
    {
        $pid = trim((string) $request->input('profile_id', ''));
        $sub = trim((string) $request->input('subdomain', ''));
        if ($pid !== '' && $sub !== '') {
            $row = DB::table('app_title')->where('profile_id', $pid)->where('subdomain', $sub)->first();
            if ($row) return ['profile_id' => $row->profile_id, 'subdomain' => $row->subdomain, 'domain' => $row->domain];
        }
        return $this->defaultStore();
    }

    private function scope(string $table, array $id)
    {
        return DB::table($table)->where('profile_id', $id['profile_id'])->where('subdomain', $id['subdomain']);
    }

    private function businessInfo(array $id): array
    {
        $info = $this->scope('giftora_business_info', $id)->first();
        return $info ? (array) $info : [
            'business_name' => '', 'tagline' => '', 'address' => '', 'phone' => '', 'email' => '',
            'open_time' => '', 'close_time' => '', 'about' => '', 'instagram' => '', 'facebook' => '',
            'shipping_charge' => 0, 'free_shipping_min' => 0,
        ];
    }

    private function products(array $id)
    {
        return DB::table('giftora_products as p')
            ->leftJoin('giftora_categories as c', 'c.cat_id', '=', 'p.cat_id')
            ->where('p.profile_id', $id['profile_id'])
            ->where('p.subdomain', $id['subdomain'])
            ->where('p.status', 1)
            ->where(fn($q) => $q->whereNull('p.cat_id')->orWhere('c.status', 1))
            ->select('p.pid', 'p.cat_id', 'c.cat_name', 'p.product_name', 'p.sku', 'p.description',
                     'p.mrp', 'p.price', 'p.stock', 'p.weight_grams', 'p.product_img', 'p.is_featured', 'p.created_at');
    }

    private function phone(Request $request, string $key = 'customer_ph'): string
    {
        return mb_substr(preg_replace('/[^0-9+]/', '', (string) $request->input($key, '')), 0, 20);
    }

    /**
     * Price a cart from the database. Client-side prices are never trusted.
     * $lines: [['pid' => ..., 'qty' => ...], ...]
     */
    private function quote(array $id, array $lines, string $couponCode, bool $lock = false, string $state = ''): array
    {
        $wanted = [];
        foreach ($lines as $line) {
            $pid = trim((string) ($line['pid'] ?? ''));
            $qty = (int) ($line['qty'] ?? 0);
            if ($pid === '' || $qty < 1) continue;
            $wanted[$pid] = min(self::MAX_QTY_PER_ITEM, ($wanted[$pid] ?? 0) + $qty);
        }

        $query = $this->products($id)->whereIn('p.pid', array_keys($wanted));
        if ($lock) $query->lockForUpdate();
        $found = $query->get()->keyBy('pid');

        $items    = [];
        $problems = [];
        $subtotal = 0.0;
        $weight   = 0;
        foreach ($wanted as $pid => $qty) {
            $p = $found[$pid] ?? null;
            if (!$p) {
                $problems[] = 'An item in your cart is no longer available.';
                continue;
            }
            if ($p->stock < 1) {
                $problems[] = "{$p->product_name} is out of stock.";
                continue;
            }
            if ($qty > $p->stock) {
                $problems[] = "Only {$p->stock} left of {$p->product_name}.";
                $qty = (int) $p->stock;
            }
            $line = round($p->price * $qty, 2);
            $subtotal += $line;
            $weight   += ((int) $p->weight_grams ?: self::DEFAULT_ITEM_WEIGHT_GRAMS) * $qty;
            $items[] = [
                'pid' => $p->pid, 'product_name' => $p->product_name, 'product_img' => $p->product_img,
                'price' => (float) $p->price, 'mrp' => (float) $p->mrp, 'qty' => $qty,
                'stock' => (int) $p->stock, 'line_total' => $line,
            ];
        }

        // Coupon
        $discount = 0.0;
        $coupon   = ['code' => '', 'valid' => false, 'message' => ''];
        $code     = strtoupper(trim($couponCode));
        if ($code !== '') {
            $c = $this->scope('giftora_coupons', $id)->where('code', $code)->where('status', 1)->first();
            if (!$c) {
                $coupon['message'] = 'This coupon code is not valid.';
            } elseif ($c->valid_to && $c->valid_to < now()->toDateString()) {
                $coupon['message'] = 'This coupon has expired.';
            } elseif ($subtotal < (float) $c->min_order) {
                $coupon['message'] = 'Add items worth ₹' . number_format((float) $c->min_order) . ' or more to use this coupon.';
            } else {
                $discount = $c->discount_type === 'flat'
                    ? (float) $c->discount_value
                    : round($subtotal * (float) $c->discount_value / 100, 2);
                if ((float) $c->max_discount > 0) $discount = min($discount, (float) $c->max_discount);
                $discount = min($discount, $subtotal);
                $coupon   = ['code' => $c->code, 'valid' => true, 'message' => 'Coupon applied.'];
            }
        }

        // Delivery charge
        $info     = $this->businessInfo($id);
        $charge   = (float) $info['shipping_charge'];
        $freeMin  = (float) $info['free_shipping_min'];
        $payable  = $subtotal - $discount;
        $isFree   = $subtotal <= 0 || ($freeMin > 0 && $payable >= $freeMin);
        $rated    = $isFree ? null : $this->courierRate($id, $weight, $state);
        $shipping = $isFree ? 0.0 : ($rated ?? $charge);

        return [
            // True while the rate depends on a delivery state the shopper has not entered yet.
            'shipping_estimated' => $rated !== null && trim($state) === '',
            'items'             => $items,
            'problems'          => array_values(array_unique($problems)),
            'subtotal'          => round($subtotal, 2),
            'discount'          => round($discount, 2),
            'shipping'          => round($shipping, 2),
            'total'             => round($payable + $shipping, 2),
            'coupon'            => $coupon,
            'free_shipping_min' => $freeMin,
        ];
    }

    /**
     * Delivery charge from the courier rate cards, or null when none are set up
     * (the flat charge from Store Info then applies).
     * Uses the weight bracket nearest to the parcel, billed per kg with a 1 kg minimum;
     * the in-state rate applies when the delivery state is the store's own state.
     */
    private function courierRate(array $id, int $weightGrams, string $state): ?float
    {
        $costs = DB::table('giftora_courier_costs as k')
            ->join('giftora_couriers as c', 'c.cid', '=', 'k.courier_id')
            ->where('k.profile_id', $id['profile_id'])->where('k.subdomain', $id['subdomain'])
            ->where('c.status', 1)
            ->get(['k.avg_weight_grams', 'k.home_rate', 'k.other_rate']);
        if ($costs->isEmpty()) return null;

        $weightGrams = max($weightGrams, 1000);
        $nearest = $costs->sortBy(fn($c) => [abs($c->avg_weight_grams - $weightGrams), (float) $c->other_rate])->first();

        $homeState = strtolower(trim((string) $this->scope('company_info', $id)->value('state')));
        $isHome    = $homeState !== '' && strtolower(trim($state)) === $homeState;
        $rate      = $isHome ? $nearest->home_rate : $nearest->other_rate;

        return round((float) $rate * ($weightGrams / 1000), 2);
    }

    private function cartLines(Request $request): array
    {
        $items = $request->input('items', []);
        if (is_string($items)) $items = json_decode($items, true);
        return is_array($items) ? array_slice($items, 0, 100) : [];
    }

    // ── Home ──────────────────────────────────────────────────────────────────

    public function fetchhome(Request $request)
    {
        $id = $this->identity($request);

        $categories = $this->scope('giftora_categories', $id)->where('status', 1)
            ->orderBy('sort_order')->orderBy('cat_name')->get();
        $counts = $this->scope('giftora_products', $id)->where('status', 1)
            ->select('cat_id', DB::raw('COUNT(*) as n'))->groupBy('cat_id')->pluck('n', 'cat_id');
        foreach ($categories as $c) $c->product_count = (int) ($counts[$c->cat_id] ?? 0);

        return response()->json([
            'status'     => 1,
            'info'       => [$this->businessInfo($id)],
            'categories' => $categories,
            'featured'   => $this->products($id)->where('p.is_featured', 1)->orderByDesc('p.created_at')->limit(8)->get(),
            'products'   => $this->products($id)->orderByDesc('p.created_at')->orderByDesc('p.id')->limit(12)->get(),
            'banners'    => $this->scope('web_banner', $id)->where('status', '1')->orderBy('banner_order')->limit(6)->get(),
            'reviews'    => $this->scope('giftora_reviews', $id)->where('status', 1)->orderByDesc('created_at')->limit(3)->get(),
            'blog'       => $this->scope('giftora_blog', $id)->where('status', 1)
                                ->select('id', 'bid', 'title', 'tag', 'description', 'blog_img', 'created_at')
                                ->orderByDesc('created_at')->limit(3)->get(),
            'offers'     => $this->scope('giftora_coupons', $id)->where('status', 1)
                                ->where(fn($q) => $q->whereNull('valid_to')->orWhere('valid_to', '>=', now()->toDateString()))
                                ->select('code', 'description', 'discount_type', 'discount_value', 'min_order')
                                ->orderByDesc('id')->limit(3)->get(),
            'stats'      => [
                'products'   => $this->scope('giftora_products', $id)->where('status', 1)->count(),
                'categories' => $categories->count(),
                'orders'     => $this->scope('giftora_orders', $id)->where('status', 'delivered')->count(),
                'reviews'    => $this->scope('giftora_reviews', $id)->where('status', 1)->count(),
            ],
        ]);
    }

    // ── Contact / Company Info ─────────────────────────────────────────────────

    public function fetchcontactinfo(Request $request)
    {
        $id = $this->identity($request);
        $ci = $this->scope('company_info', $id)->first();
        $sl = $this->scope('social_links', $id)->first();
        $bi = $this->businessInfo($id);

        return response()->json([
            'status'      => 1,
            'contactinfo' => $ci ? (array) $ci : (object) [],
            'sociallinks' => $sl ? (array) $sl : ['fb' => '', 'insta' => '', 'linked' => ''],
            'info'        => $bi,
            'categories'  => $this->scope('giftora_categories', $id)->where('status', 1)
                                ->orderBy('sort_order')->orderBy('cat_name')->limit(6)->get(['cat_id', 'cat_name']),
        ]);
    }

    public function addcontactenquiry(Request $request)
    {
        $id   = $this->identity($request);
        $name = $this->clean($request, 'cname', 200);
        $msg  = $this->clean($request, 'message', 3000);
        if ($name === '' || $msg === '') {
            return response()->json(['status' => 0, 'message' => 'Please enter your name and message']);
        }
        DB::table('giftora_enquiries')->insert($id + [
            'eid'        => $this->uid(),
            'cname'      => $name,
            'cmobile'    => $this->phone($request, 'cmobile'),
            'cemail'     => $this->clean($request, 'cemail', 150),
            'subject'    => $this->clean($request, 'subject', 300),
            'message'    => $msg,
            'status'     => 'unread',
            'created_at' => now(),
        ]);
        $this->notify($id, "New enquiry from $name", 'enquiry');
        return response()->json(['status' => 1, 'message' => 'Message sent successfully']);
    }

    // ── Banners / About / Policies ────────────────────────────────────────────

    public function fetchuserbanners(Request $request)
    {
        $id = $this->identity($request);
        return response()->json(['status' => 1, 'banners' => $this->scope('web_banner', $id)->where('status', '1')->orderBy('banner_order')->get()]);
    }

    public function fetchuserabout(Request $request)
    {
        $id  = $this->identity($request);
        $row = $this->scope('about', $id)->first();
        return response()->json([
            'status' => 1,
            'about'  => $row ? (array) $row : (object) [],
            'info'   => $this->businessInfo($id),
            'stats'  => [
                'products'   => $this->scope('giftora_products', $id)->where('status', 1)->count(),
                'categories' => $this->scope('giftora_categories', $id)->where('status', 1)->count(),
                'orders'     => $this->scope('giftora_orders', $id)->where('status', 'delivered')->count(),
                'reviews'    => $this->scope('giftora_reviews', $id)->where('status', 1)->count(),
            ],
        ]);
    }

    public function fetchuserterms(Request $request)
    {
        $id   = $this->identity($request);
        $rows = $this->scope('giftora_terms', $id)->get(['termtype', 'terms_title', 'terms_desc', 'updated_at']);
        return response()->json(['status' => 1, 'terms' => $rows]);
    }

    // ── Products ──────────────────────────────────────────────────────────────

    public function fetchuserproducts(Request $request)
    {
        $id = $this->identity($request);
        return response()->json([
            'status'     => 1,
            'products'   => $this->products($id)->orderByDesc('p.created_at')->orderByDesc('p.id')->get(),
            'categories' => $this->scope('giftora_categories', $id)->where('status', 1)
                                ->orderBy('sort_order')->orderBy('cat_name')->get(),
        ]);
    }

    public function fetchproductdetail(Request $request)
    {
        $id      = $this->identity($request);
        $product = $this->products($id)->where('p.pid', $request->input('pid'))->first();
        if (!$product) return response()->json(['status' => 0, 'message' => 'Product not found']);

        $related = $this->products($id)->where('p.pid', '!=', $product->pid)
            ->when($product->cat_id, fn($q) => $q->where('p.cat_id', $product->cat_id))
            ->orderByDesc('p.created_at')->limit(4)->get();

        $reviews = $this->scope('giftora_reviews', $id)->where('status', 1)
            ->where('product_name', $product->product_name)->orderByDesc('created_at')->limit(10)->get();

        return response()->json(['status' => 1, 'product' => $product, 'related' => $related, 'reviews' => $reviews]);
    }

    // ── Cart & Orders ─────────────────────────────────────────────────────────

    public function cartquote(Request $request)
    {
        $id = $this->identity($request);
        return response()->json(['status' => 1] + $this->quote($id, $this->cartLines($request), (string) $request->input('coupon', ''), false, $this->clean($request, 'state', 100)));
    }

    public function placeorder(Request $request)
    {
        $id    = $this->identity($request);
        $name  = $this->clean($request, 'customer_name', 200);
        $ph    = $this->phone($request);
        $email = $this->clean($request, 'customer_email', 150);
        $addr  = $this->clean($request, 'address', 500);
        $city  = $this->clean($request, 'city', 100);
        $state = $this->clean($request, 'state', 100);
        $pin   = $this->clean($request, 'pincode', 20);

        if ($name === '' || $addr === '' || $city === '' || $pin === '') {
            return response()->json(['status' => 0, 'message' => 'Please fill in your name and full delivery address']);
        }
        if (strlen(preg_replace('/\D/', '', $ph)) < 7) {
            return response()->json(['status' => 0, 'message' => 'Please enter a valid phone number']);
        }
        if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return response()->json(['status' => 0, 'message' => 'Please enter a valid email address']);
        }

        $deliveryDate = trim((string) $request->input('delivery_date', ''));
        if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $deliveryDate) || $deliveryDate < now()->toDateString()) {
            $deliveryDate = null;
        }

        $lines = $this->cartLines($request);
        if (!$lines) return response()->json(['status' => 0, 'message' => 'Your cart is empty']);

        return DB::transaction(function () use ($id, $request, $lines, $name, $ph, $email, $addr, $city, $state, $pin, $deliveryDate) {
            $q = $this->quote($id, $lines, (string) $request->input('coupon', ''), true, $state);

            if ($q['problems']) {
                return response()->json(['status' => 0, 'message' => implode(' ', $q['problems']), 'quote' => $q]);
            }
            if (!$q['items']) {
                return response()->json(['status' => 0, 'message' => 'Your cart is empty']);
            }

            do {
                $orderNo = 'ORD' . now()->format('ymd') . '-' . random_int(10000, 99999);
            } while (DB::table('giftora_orders')->where('order_no', $orderNo)->exists());

            $oid = $this->uid();
            DB::table('giftora_orders')->insert($id + [
                'oid'            => $oid,
                'order_no'       => $orderNo,
                'customer_name'  => $name,
                'customer_ph'    => $ph,
                'customer_email' => $email,
                'address'        => $addr,
                'city'           => $city,
                'state'          => $state,
                'pincode'        => $pin,
                'recipient_name' => $this->clean($request, 'recipient_name', 200),
                'gift_message'   => $this->clean($request, 'gift_message', 500),
                'delivery_date'  => $deliveryDate,
                'notes'          => $this->clean($request, 'notes', 1000),
                'subtotal'       => $q['subtotal'],
                'discount'       => $q['discount'],
                'coupon_code'    => $q['coupon']['valid'] ? $q['coupon']['code'] : '',
                'shipping'       => $q['shipping'],
                'total'          => $q['total'],
                'payment_method' => 'cod',
                'payment_status' => 'pending',
                'status'         => 'pending',
                'created_at'     => now(),
                'updated_at'     => now(),
            ]);

            foreach ($q['items'] as $it) {
                DB::table('giftora_order_items')->insert([
                    'oid'          => $oid,
                    'pid'          => $it['pid'],
                    'product_name' => $it['product_name'],
                    'product_img'  => $it['product_img'],
                    'price'        => $it['price'],
                    'qty'          => $it['qty'],
                    'line_total'   => $it['line_total'],
                ]);
                DB::table('giftora_products')->where('pid', $it['pid'])->decrement('stock', $it['qty']);
            }

            // Create or refresh the customer record
            $customer = ['customer_name' => $name, 'address' => $addr, 'city' => $city, 'state' => $state, 'pincode' => $pin];
            if ($email !== '') $customer['customer_email'] = $email;
            if ($this->scope('giftora_customers', $id)->where('customer_ph', $ph)->exists()) {
                $this->scope('giftora_customers', $id)->where('customer_ph', $ph)->update($customer);
            } else {
                DB::table('giftora_customers')->insert($id + $customer + [
                    'customer_ph' => $ph, 'customer_email' => $email, 'created_at' => now(),
                ]);
            }

            $this->notify($id, "New order $orderNo from $name (₹" . number_format($q['total'], 2) . ')', 'order');

            return response()->json([
                'status'   => 1,
                'message'  => 'Order placed successfully',
                'order_no' => $orderNo,
                'oid'      => $oid,
                'total'    => $q['total'],
            ]);
        });
    }

    public function fetchuserorders(Request $request)
    {
        $id = $this->identity($request);
        $ph = $this->phone($request);
        if ($ph === '') return response()->json(['status' => 1, 'orders' => []]);

        $orders = $this->scope('giftora_orders', $id)->where('customer_ph', $ph)
            ->orderByDesc('created_at')->orderByDesc('id')->get();
        return response()->json(['status' => 1, 'orders' => $this->withTracking($id, $orders)]);
    }

    /** Track one order with its order number and the phone number used at checkout. */
    public function trackorder(Request $request)
    {
        $id      = $this->identity($request);
        $ph      = $this->phone($request);
        $orderNo = strtoupper(trim((string) $request->input('order_no', '')));
        if ($ph === '' || $orderNo === '') {
            return response()->json(['status' => 0, 'message' => 'Enter your order number and phone number']);
        }
        $orders = $this->scope('giftora_orders', $id)->where('order_no', $orderNo)->where('customer_ph', $ph)->get();
        if ($orders->isEmpty()) {
            return response()->json(['status' => 0, 'message' => 'No order matches that order number and phone number']);
        }
        return response()->json(['status' => 1, 'order' => $this->withTracking($id, $orders)[0]]);
    }

    /**
     * Adds what a customer needs to follow an order: its items, the courier carrying it
     * (name, contact number, link to the courier's tracking page) and the status timeline.
     * Internal admin notes are deliberately left out.
     */
    private function withTracking(array $id, $orders)
    {
        $oids     = $orders->pluck('oid');
        $items    = DB::table('giftora_order_items')->whereIn('oid', $oids)->orderBy('id')->get()->groupBy('oid');
        $updates  = DB::table('giftora_order_updates')->whereIn('oid', $oids)->orderBy('id')
            ->get(['oid', 'status', 'delivery_status', 'courier_name', 'tracking_code', 'created_at'])->groupBy('oid');
        $couriers = $this->scope('giftora_couriers', $id)->whereIn('cid', $orders->pluck('courier_id')->filter())
            ->get(['cid', 'name', 'contact_number', 'logo_img', 'tracking_url'])->keyBy('cid');

        foreach ($orders as $o) {
            $o->items    = $items[$o->oid] ?? [];
            $o->timeline = collect($updates[$o->oid] ?? [])->map(fn($u) => [
                'status' => $u->status, 'delivery_status' => $u->delivery_status,
                'courier_name' => $u->courier_name, 'tracking_code' => $u->tracking_code, 'at' => $u->created_at,
            ])->values();

            $c = $o->courier_id ? ($couriers[$o->courier_id] ?? null) : null;
            $o->courier = $o->courier_name === '' ? null : [
                'name'           => $o->courier_name,
                'contact_number' => $c->contact_number ?? '',
                'logo_img'       => $c->logo_img ?? '',
                'tracking_link'  => ($c && $c->tracking_url && $o->tracking_code !== '')
                    ? str_replace('{code}', rawurlencode($o->tracking_code), $c->tracking_url) : '',
            ];
            unset($o->courier_id, $o->profile_id, $o->subdomain, $o->domain);
        }
        return $orders;
    }

    // ── Reviews ───────────────────────────────────────────────────────────────

    public function fetchuserreviews(Request $request)
    {
        $id = $this->identity($request);
        return response()->json([
            'status'   => 1,
            'reviews'  => $this->scope('giftora_reviews', $id)->where('status', 1)->orderByDesc('created_at')->get(),
            'products' => $this->products($id)->orderBy('p.product_name')->pluck('p.product_name'),
        ]);
    }

    public function addreview(Request $request)
    {
        $id   = $this->identity($request);
        $name = $this->clean($request, 'reviewer_name', 200);
        $text = $this->clean($request, 'review_text', 2000);
        if ($name === '' || $text === '') {
            return response()->json(['status' => 0, 'message' => 'Please enter your name and review']);
        }
        DB::table('giftora_reviews')->insert($id + [
            'rid'           => $this->uid(),
            'reviewer_name' => $name,
            'reviewer_ph'   => $this->phone($request, 'reviewer_ph'),
            'rating'        => max(1, min(5, (int) $request->input('rating', 5))),
            'review_text'   => $text,
            'product_name'  => $this->clean($request, 'product_name', 255),
            'status'        => 0,
            'created_at'    => now(),
        ]);
        $this->notify($id, "New review from $name is waiting for approval", 'review');
        return response()->json(['status' => 1, 'message' => 'Review submitted, pending approval']);
    }

    // ── Blog ──────────────────────────────────────────────────────────────────

    public function fetchuserblog(Request $request)
    {
        $id   = $this->identity($request);
        $rows = $this->scope('giftora_blog', $id)->where('status', 1)
            ->select('id', 'bid', 'title', 'tag', 'description', 'blog_img', 'created_at')
            ->orderByDesc('created_at')->get();
        return response()->json(['status' => 1, 'posts' => $rows]);
    }

    public function fetchblogdetail(Request $request)
    {
        $id   = $this->identity($request);
        $rows = $this->scope('giftora_blog', $id)->where('bid', $request->input('bid'))->where('status', 1)->get();
        return response()->json(['status' => 1, 'post' => $rows]);
    }

    // ── Customer Profile ──────────────────────────────────────────────────────

    public function fetchuserprofile(Request $request)
    {
        $id   = $this->identity($request);
        $rows = $this->scope('giftora_customers', $id)->where('customer_ph', $this->phone($request))->get();
        return response()->json(['status' => 1, 'profile' => $rows]);
    }

    public function updateuserprofile(Request $request)
    {
        $id = $this->identity($request);
        $this->scope('giftora_customers', $id)->where('customer_ph', $this->phone($request))->update([
            'customer_name'  => $this->clean($request, 'customer_name', 200),
            'customer_email' => $this->clean($request, 'customer_email', 150),
        ]);
        return response()->json(['status' => 1, 'message' => 'Profile updated']);
    }
}
