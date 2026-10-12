<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\RateLimiter;

class AdminController extends Controller
{
    private const ORDER_STATUSES = ['pending', 'confirmed', 'packed', 'shipped', 'delivered', 'cancelled'];
    private const TOKEN_DAYS     = 7;

    // ── Helpers ───────────────────────────────────────────────────────────────

    /** Resolve the logged-in admin from the bearer token; aborts with 401 otherwise. */
    protected function auth(Request $request): array
    {
        $token = $request->bearerToken() ?: trim((string) $request->input('token', ''));
        $admin = null;
        if ($token !== '') {
            $admin = DB::table('giftora_admin_tokens as t')
                ->join('giftora_admins as a', 'a.aid', '=', 't.aid')
                ->where('t.token_hash', hash('sha256', $token))
                ->where('t.expires_at', '>', now())
                ->where('a.status', 'active')
                ->select('a.aid', 'a.name', 'a.email', 'a.profile_id', 'a.subdomain', 'a.domain')
                ->first();
        }
        if (!$admin) {
            abort(response()->json(['status' => 0, 'message' => 'Unauthorized'], 401));
        }
        return [
            'aid'        => $admin->aid,
            'name'       => $admin->name,
            'email'      => $admin->email,
            'profile_id' => $admin->profile_id,
            'subdomain'  => $admin->subdomain,
            'domain'     => $admin->domain,
        ];
    }

    protected function scope(string $table, array $a)
    {
        return DB::table($table)->where('profile_id', $a['profile_id'])->where('subdomain', $a['subdomain']);
    }

    protected function tenant(array $a): array
    {
        return ['profile_id' => $a['profile_id'], 'subdomain' => $a['subdomain'], 'domain' => $a['domain']];
    }

    /** The company name lives in three tables; keep them identical so it changes everywhere at once. */
    private function syncStoreName(array $a, string $name): void
    {
        if ($name === '') return;
        if ($this->scope('app_title', $a)->exists()) {
            $this->scope('app_title', $a)->update(['apptitle' => $name]);
        } else {
            DB::table('app_title')->insert($this->tenant($a) + ['aid' => $this->uid(), 'apptitle' => $name]);
        }
        $this->scope('company_info', $a)->update(['companyname' => $name]);
        $this->scope('giftora_business_info', $a)->update(['business_name' => $name]);
    }

    // ── Admin login ───────────────────────────────────────────────────────────

    public function adminlogin(Request $request)
    {
        $email    = strtolower(trim((string) $request->input('email', '')));
        $password = (string) $request->input('password', '');
        if ($email === '' || $password === '') {
            return response()->json(['status' => 0, 'message' => 'Email and password are required']);
        }

        $key = 'adminlogin:' . sha1($email . '|' . $request->ip());
        if (RateLimiter::tooManyAttempts($key, 5)) {
            return response()->json(['status' => 0, 'message' => 'Too many attempts. Try again in a minute.']);
        }

        $admin = DB::table('giftora_admins')->where('email', $email)->first();
        if (!$admin || $admin->status !== 'active' || !Hash::check($password, $admin->password)) {
            RateLimiter::hit($key, 60);
            return response()->json(['status' => 0, 'message' => 'Invalid email or password']);
        }
        RateLimiter::clear($key);

        $token = bin2hex(random_bytes(32));
        DB::table('giftora_admin_tokens')->where('expires_at', '<', now())->delete();
        DB::table('giftora_admin_tokens')->insert([
            'aid'        => $admin->aid,
            'token_hash' => hash('sha256', $token),
            'expires_at' => now()->addDays(self::TOKEN_DAYS),
            'created_at' => now(),
        ]);

        return response()->json([
            'status' => 1,
            'user'   => [
                'aid'        => $admin->aid,
                'name'       => $admin->name,
                'email'      => $admin->email,
                'profile_id' => $admin->profile_id,
                'subdomain'  => $admin->subdomain,
                'domain'     => $admin->domain,
                'token'      => $token,
            ],
        ]);
    }

    public function adminlogout(Request $request)
    {
        $token = $request->bearerToken();
        if ($token) {
            DB::table('giftora_admin_tokens')->where('token_hash', hash('sha256', $token))->delete();
        }
        return response()->json(['status' => 1, 'message' => 'Logged out']);
    }

    public function fetchadminprofile(Request $request)
    {
        $a = $this->auth($request);
        return response()->json(['status' => 1, 'admin' => ['name' => $a['name'], 'email' => $a['email']]]);
    }

    public function updateadminprofile(Request $request)
    {
        $a     = $this->auth($request);
        $name  = $this->clean($request, 'name', 150);
        $email = strtolower($this->clean($request, 'email', 150));
        if ($name === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return response()->json(['status' => 0, 'message' => 'Enter a name and a valid email']);
        }
        if (DB::table('giftora_admins')->where('email', $email)->where('aid', '!=', $a['aid'])->exists()) {
            return response()->json(['status' => 0, 'message' => 'That email is already in use']);
        }
        $data = ['name' => $name, 'email' => $email];

        $new = (string) $request->input('new_password', '');
        if ($new !== '') {
            $row = DB::table('giftora_admins')->where('aid', $a['aid'])->first();
            if (!Hash::check((string) $request->input('current_password', ''), $row->password)) {
                return response()->json(['status' => 0, 'message' => 'Current password is incorrect']);
            }
            if (strlen($new) < 8) {
                return response()->json(['status' => 0, 'message' => 'New password must be at least 8 characters']);
            }
            $data['password'] = Hash::make($new);
        }
        DB::table('giftora_admins')->where('aid', $a['aid'])->update($data);
        return response()->json(['status' => 1, 'message' => 'Profile updated', 'admin' => ['name' => $name, 'email' => $email]]);
    }

    // ── Branding (public) ─────────────────────────────────────────────────────

    public function fetchapplogo_open(Request $request)
    {
        $hostname = trim((string) $request->input('hostname', ''));

        $titleRow = null;
        if ($hostname !== '') {
            $titleRow = DB::table('app_title')
                ->where(fn($q) => $q->where('subdomain', $hostname)->orWhere('domain', $hostname))
                ->first();
        }
        $titleRow = $titleRow ?: DB::table('app_title')->orderBy('id')->first();
        if (!$titleRow) {
            return response()->json(['status' => 0, 'message' => 'Store is not configured']);
        }
        $store = ['profile_id' => $titleRow->profile_id, 'subdomain' => $titleRow->subdomain, 'domain' => $titleRow->domain];

        $logo  = $this->scope('app_logo', $store)->first();
        $theme = $this->scope('giftora_theme', $store)->value('color');
        $info  = $this->scope('giftora_business_info', $store)->first();

        return response()->json([
            'status'      => 1,
            'logo'        => $logo ?: null,
            'profile_id'  => $store['profile_id'],
            'subdomain'   => $store['subdomain'],
            'theme_color' => $theme ?? '',
            'app_title'   => $titleRow->apptitle ?? '',
            'tagline'     => $info->tagline ?? '',
        ]);
    }

    // ── App Logo / Favicon ────────────────────────────────────────────────────

    public function fetchapplogo(Request $request)
    {
        $a = $this->auth($request);
        return response()->json(['status' => 1, 'applogo' => $this->scope('app_logo', $a)->get()]);
    }

    private function saveBrandImage(array $a, string $column, string $folder, string $filename): void
    {
        $row = $this->scope('app_logo', $a)->first();
        if ($row) {
            $this->removeUpload($folder, $row->{$column});
            $this->scope('app_logo', $a)->update([$column => $filename]);
        } else {
            DB::table('app_logo')->insert($this->tenant($a) + [
                'lid' => $this->uid(), 'logo_img' => '', 'fev_img' => '', 'status' => '1', $column => $filename,
            ]);
        }
    }

    public function editapplogobypid(Request $request)
    {
        $a = $this->auth($request);
        if (!$request->hasFile('logopic')) return response()->json(['status' => 0, 'message' => 'No file selected']);
        $filename = $this->saveUpload($request, 'logopic', 'logo');
        if (!$filename) return response()->json(['status' => 0, 'message' => 'Invalid file type']);
        $this->saveBrandImage($a, 'logo_img', 'logo', $filename);
        return response()->json(['status' => 1, 'message' => 'Logo updated', 'logo_img' => $filename]);
    }

    public function deleteapplogo(Request $request)
    {
        $a   = $this->auth($request);
        $row = $this->scope('app_logo', $a)->first();
        if ($row) {
            $this->removeUpload('logo', $row->logo_img);
            $this->scope('app_logo', $a)->update(['logo_img' => '']);
        }
        return response()->json(['status' => 1, 'message' => 'Logo deleted']);
    }

    public function editappfeviconbypid(Request $request)
    {
        $a = $this->auth($request);
        if (!$request->hasFile('feviconpic')) return response()->json(['status' => 0, 'message' => 'No file selected']);
        $filename = $this->saveUpload($request, 'feviconpic', 'fevicon', ['jpg', 'jpeg', 'png', 'ico', 'webp']);
        if (!$filename) return response()->json(['status' => 0, 'message' => 'Invalid file type']);
        $this->saveBrandImage($a, 'fev_img', 'fevicon', $filename);
        return response()->json(['status' => 1, 'message' => 'Favicon updated', 'fev_img' => $filename]);
    }

    public function deleteappfevicon(Request $request)
    {
        $a   = $this->auth($request);
        $row = $this->scope('app_logo', $a)->first();
        if ($row) {
            $this->removeUpload('fevicon', $row->fev_img);
            $this->scope('app_logo', $a)->update(['fev_img' => '']);
        }
        return response()->json(['status' => 1, 'message' => 'Favicon deleted']);
    }

    // ── App Title (company name) ──────────────────────────────────────────────

    public function myappname(Request $request)
    {
        $a = $this->auth($request);
        return response()->json(['status' => 1, 'appname' => $this->scope('app_title', $a)->get()]);
    }

    public function updateappname(Request $request)
    {
        $a        = $this->auth($request);
        $apptitle = $this->clean($request, 'apptitle', 60);
        if ($apptitle === '') return response()->json(['status' => 0, 'message' => 'Title is required']);
        $this->syncStoreName($a, $apptitle);
        return response()->json(['status' => 1, 'message' => 'Company name updated successfully']);
    }

    // ── Dashboard ─────────────────────────────────────────────────────────────

    public function admindashboard(Request $request)
    {
        $a      = $this->auth($request);
        $orders = fn() => $this->scope('giftora_orders', $a);

        return response()->json([
            'status' => 1,
            'stats'  => [
                'total_orders'    => $orders()->count(),
                'pending'         => $orders()->where('status', 'pending')->count(),
                'in_progress'     => $orders()->whereIn('status', ['confirmed', 'packed', 'shipped'])->count(),
                'delivered'       => $orders()->where('status', 'delivered')->count(),
                'cancelled'       => $orders()->where('status', 'cancelled')->count(),
                'revenue'         => (float) $orders()->where('status', '!=', 'cancelled')->sum('total'),
                'total_customers' => $this->scope('giftora_customers', $a)->count(),
                'total_products'  => $this->scope('giftora_products', $a)->count(),
                'low_stock'       => $this->scope('giftora_products', $a)->where('status', 1)->where('stock', '<=', 5)->count(),
                'total_reviews'   => $this->scope('giftora_reviews', $a)->count(),
                'unread_alerts'   => $this->scope('giftora_notifications', $a)->where('is_read', 0)->count(),
            ],
        ]);
    }

    // ── Orders ────────────────────────────────────────────────────────────────

    public function fetchorders(Request $request)
    {
        $a      = $this->auth($request);
        $orders = $this->scope('giftora_orders', $a)->orderByDesc('created_at')->orderByDesc('id')->get();
        $counts = DB::table('giftora_order_items')
            ->whereIn('oid', $orders->pluck('oid'))
            ->select('oid', DB::raw('SUM(qty) as items'))
            ->groupBy('oid')->pluck('items', 'oid');
        foreach ($orders as $o) $o->item_count = (int) ($counts[$o->oid] ?? 0);
        return response()->json(['status' => 1, 'orders' => $orders]);
    }

    public function fetchorderdetail(Request $request)
    {
        $a     = $this->auth($request);
        $order = $this->scope('giftora_orders', $a)->where('oid', $request->input('oid'))->first();
        if (!$order) return response()->json(['status' => 0, 'message' => 'Order not found']);

        return response()->json(['status' => 1] + $this->orderPayload($a, $order));
    }

    /** Everything the admin order page shows: the order, its items, its timeline and the couriers to pick from. */
    private function orderPayload(array $a, object $order): array
    {
        $couriers = $this->scope('giftora_couriers', $a)->orderBy('name')->get(['cid', 'name', 'contact_number', 'status']);
        $unused   = $this->scope('giftora_tracking_codes', $a)->whereNull('oid')
            ->select('courier_id', DB::raw('COUNT(*) as n'))->groupBy('courier_id')->pluck('n', 'courier_id');
        foreach ($couriers as $c) $c->unused_codes = (int) ($unused[$c->cid] ?? 0);

        return [
            'order'    => $order,
            'items'    => DB::table('giftora_order_items')->where('oid', $order->oid)->orderBy('id')->get(),
            'updates'  => DB::table('giftora_order_updates')->where('oid', $order->oid)->orderByDesc('id')->get(),
            'couriers' => $couriers,
        ];
    }

    /** Hand a pool tracking code back so it can be used for another order. */
    private function releaseTrackingCode(array $a, string $oid): void
    {
        $this->scope('giftora_tracking_codes', $a)->where('oid', $oid)
            ->update(['oid' => null, 'order_no' => '', 'customer' => '', 'order_date' => null]);
    }

    /**
     * Updates an order's status and, when sent, its delivery status, courier and tracking code.
     * Every change is written to the order timeline (giftora_order_updates).
     * Callers may send only "status" (the quick dropdown on the orders list); fields that are
     * not sent are left as they are.
     */
    public function updateorderstatus(Request $request)
    {
        $a      = $this->auth($request);
        $status = (string) $request->input('status', '');
        if (!in_array($status, self::ORDER_STATUSES, true)) {
            return response()->json(['status' => 0, 'message' => 'Invalid status']);
        }
        $fail = fn(string $message) => response()->json(['status' => 0, 'message' => $message]);

        return DB::transaction(function () use ($a, $request, $status, $fail) {
            $order = $this->scope('giftora_orders', $a)->where('oid', $request->input('oid'))->lockForUpdate()->first();
            if (!$order) return $fail('Order not found');

            $data = [];

            // ── Courier ──────────────────────────────────────────────────────
            $courierId   = $order->courier_id;
            $courierName = $order->courier_name;
            if ($request->has('courier_id')) {
                $courierId = trim((string) $request->input('courier_id', '')) ?: null;
                if ($courierId) {
                    $courier = $this->scope('giftora_couriers', $a)->where('cid', $courierId)->first();
                    if (!$courier) return $fail('Selected courier does not exist');
                    $courierName = $courier->name;
                } else {
                    $courierName = '';
                }
            }

            // ── Tracking code ────────────────────────────────────────────────
            $tracking = $order->tracking_code;
            if ($request->boolean('auto_code')) {
                if (!$courierId) return $fail('Choose a courier before taking a tracking code');
                $next = $this->scope('giftora_tracking_codes', $a)->where('courier_id', $courierId)
                    ->whereNull('oid')->orderBy('id')->lockForUpdate()->first();
                if (!$next) return $fail('No unused tracking codes left for this courier. Upload more or type one in.');
                $tracking = $next->tracking_code;
            } elseif ($request->has('tracking_code')) {
                $tracking = mb_substr(trim(strip_tags((string) $request->input('tracking_code', ''))), 0, 100);
            }
            if (!$courierId) $tracking = '';   // a tracking code only makes sense with a courier

            if ($tracking !== '' && ($tracking !== $order->tracking_code || $courierId !== $order->courier_id)) {
                $pooled = $this->scope('giftora_tracking_codes', $a)->where('tracking_code', $tracking)->lockForUpdate()->first();
                if ($pooled && $pooled->courier_id !== $courierId) return $fail('That tracking code belongs to a different courier');
                if ($pooled && $pooled->oid && $pooled->oid !== $order->oid) return $fail("That tracking code is already used by order {$pooled->order_no}");
                $taken = $this->scope('giftora_orders', $a)->where('tracking_code', $tracking)->where('oid', '!=', $order->oid)->value('order_no');
                if ($taken) return $fail("That tracking code is already used by order $taken");
            }
            if ($tracking !== $order->tracking_code) {
                $this->releaseTrackingCode($a, $order->oid);
                if ($tracking !== '') {
                    $this->scope('giftora_tracking_codes', $a)->where('tracking_code', $tracking)->update([
                        'oid' => $order->oid, 'order_no' => $order->order_no,
                        'customer' => $order->customer_name, 'order_date' => substr($order->created_at, 0, 10),
                    ]);
                }
            }

            // ── Stock follows cancellation ───────────────────────────────────
            if ($status !== $order->status) {
                $items = DB::table('giftora_order_items')->where('oid', $order->oid)->whereNotNull('pid')->get();
                if ($status === 'cancelled') {
                    // Put the reserved stock back on the shelf.
                    foreach ($items as $it) {
                        DB::table('giftora_products')->where('pid', $it->pid)->increment('stock', $it->qty);
                    }
                } elseif ($order->status === 'cancelled') {
                    // Re-opening a cancelled order needs the stock again.
                    foreach ($items as $it) {
                        $left = DB::table('giftora_products')->where('pid', $it->pid)->lockForUpdate()->value('stock');
                        if ($left === null || $left < $it->qty) return $fail("Not enough stock for {$it->product_name}");
                    }
                    foreach ($items as $it) {
                        DB::table('giftora_products')->where('pid', $it->pid)->decrement('stock', $it->qty);
                    }
                    $data['cancelled_at'] = null;
                }
                if ($status === 'shipped' && !$order->shipped_at)     $data['shipped_at']   = now();
                if ($status === 'delivered' && !$order->delivered_at) $data['delivered_at'] = now();
                if ($status === 'cancelled')                          $data['cancelled_at'] = now();
                if ($status === 'delivered')                          $data['payment_status'] = 'paid';
            }

            $delivery = $request->has('delivery_status')
                ? $this->clean($request, 'delivery_status', 255)
                : $order->delivery_status;
            $note = $this->clean($request, 'note', 2000);

            $changed = $status !== $order->status || $delivery !== $order->delivery_status
                || $courierId !== $order->courier_id || $tracking !== $order->tracking_code;

            if ($changed) {
                DB::table('giftora_orders')->where('oid', $order->oid)->update($data + [
                    'status' => $status, 'delivery_status' => $delivery,
                    'courier_id' => $courierId, 'courier_name' => $courierName, 'tracking_code' => $tracking,
                    'updated_at' => now(),
                ]);
            }
            if ($changed || $note !== '') {
                DB::table('giftora_order_updates')->insert([
                    'oid' => $order->oid, 'admin_id' => $a['aid'], 'admin_name' => $a['name'],
                    'status' => $status, 'delivery_status' => $delivery,
                    'courier_name' => $courierName, 'tracking_code' => $tracking,
                    'note' => $note ?: null, 'created_at' => now(),
                ]);
            }

            $fresh = DB::table('giftora_orders')->where('oid', $order->oid)->first();
            return response()->json(['status' => 1, 'message' => 'Order status updated'] + $this->orderPayload($a, $fresh));
        });
    }

    public function deleteorder(Request $request)
    {
        $a = $this->auth($request);

        return DB::transaction(function () use ($a, $request) {
            $order = $this->scope('giftora_orders', $a)->where('oid', $request->input('oid'))->lockForUpdate()->first();
            if (!$order) return response()->json(['status' => 0, 'message' => 'Order not found']);

            // An order that was never delivered (or cancelled, which already returned it) still holds stock.
            if (!in_array($order->status, ['cancelled', 'delivered'], true)) {
                $items = DB::table('giftora_order_items')->where('oid', $order->oid)->whereNotNull('pid')->get();
                foreach ($items as $it) {
                    DB::table('giftora_products')->where('pid', $it->pid)->increment('stock', $it->qty);
                }
            }
            $this->releaseTrackingCode($a, $order->oid);
            // Items and timeline rows go with the order (ON DELETE CASCADE).
            DB::table('giftora_orders')->where('oid', $order->oid)->delete();

            return response()->json(['status' => 1, 'message' => "Order {$order->order_no} deleted"]);
        });
    }

    // ── Products ──────────────────────────────────────────────────────────────

    public function fetchproducts(Request $request)
    {
        $a    = $this->auth($request);
        $rows = DB::table('giftora_products as p')
            ->leftJoin('giftora_categories as c', 'c.cat_id', '=', 'p.cat_id')
            ->where('p.profile_id', $a['profile_id'])
            ->where('p.subdomain', $a['subdomain'])
            ->orderByDesc('p.created_at')->orderByDesc('p.id')
            ->select('p.*', 'c.cat_name')
            ->get();
        return response()->json(['status' => 1, 'products' => $rows]);
    }

    private function productData(Request $request, array $a): array|string
    {
        $name = $this->clean($request, 'product_name', 255);
        if ($name === '') return 'Product name is required';

        $price = round((float) $request->input('price', 0), 2);
        $mrp   = round((float) $request->input('mrp', 0), 2);
        if ($price <= 0) return 'Enter a selling price greater than zero';
        if ($mrp < $price) $mrp = $price;

        $catId = trim((string) $request->input('cat_id', '')) ?: null;
        if ($catId && !$this->scope('giftora_categories', $a)->where('cat_id', $catId)->exists()) {
            return 'Selected category does not exist';
        }

        return [
            'product_name' => $name,
            'cat_id'       => $catId,
            'sku'          => $this->clean($request, 'sku', 60),
            'description'  => $this->clean($request, 'description', 5000),
            'mrp'          => $mrp,
            'price'        => $price,
            'stock'        => max(0, (int) $request->input('stock', 0)),
            'weight_grams' => max(0, (int) $request->input('weight_grams', 0)),
            'is_featured'  => (int) $request->input('is_featured', 0) ? 1 : 0,
            'status'       => (int) $request->input('status', 1) ? 1 : 0,
        ];
    }

    public function addproduct(Request $request)
    {
        $a    = $this->auth($request);
        $data = $this->productData($request, $a);
        if (is_string($data)) return response()->json(['status' => 0, 'message' => $data]);

        DB::table('giftora_products')->insert($this->tenant($a) + $data + [
            'pid'         => $this->uid(),
            'product_img' => $this->saveUpload($request, 'product_img', 'products'),
            'created_at'  => now(),
        ]);
        return response()->json(['status' => 1, 'message' => 'Product added successfully']);
    }

    public function updateproduct(Request $request)
    {
        $a   = $this->auth($request);
        $row = $this->scope('giftora_products', $a)->where('pid', $request->input('pid'))->first();
        if (!$row) return response()->json(['status' => 0, 'message' => 'Product not found']);

        $data = $this->productData($request, $a);
        if (is_string($data)) return response()->json(['status' => 0, 'message' => $data]);

        $img = $this->saveUpload($request, 'product_img', 'products');
        if ($img) {
            $this->removeUpload('products', $row->product_img);
            $data['product_img'] = $img;
        }
        $this->scope('giftora_products', $a)->where('pid', $row->pid)->update($data);
        return response()->json(['status' => 1, 'message' => 'Product updated successfully']);
    }

    public function deleteproduct(Request $request)
    {
        $a   = $this->auth($request);
        $row = $this->scope('giftora_products', $a)->where('pid', $request->input('pid'))->first();
        if ($row) {
            $this->removeUpload('products', $row->product_img);
            $this->scope('giftora_products', $a)->where('pid', $row->pid)->delete();
        }
        return response()->json(['status' => 1, 'message' => 'Product deleted']);
    }

    // ── Categories ────────────────────────────────────────────────────────────

    public function fetchcategories(Request $request)
    {
        $a      = $this->auth($request);
        $rows   = $this->scope('giftora_categories', $a)->orderBy('sort_order')->orderBy('cat_name')->get();
        $counts = $this->scope('giftora_products', $a)
            ->select('cat_id', DB::raw('COUNT(*) as n'))->groupBy('cat_id')->pluck('n', 'cat_id');
        foreach ($rows as $r) $r->product_count = (int) ($counts[$r->cat_id] ?? 0);
        return response()->json(['status' => 1, 'categories' => $rows]);
    }

    public function addcategory(Request $request)
    {
        $a    = $this->auth($request);
        $name = $this->clean($request, 'cat_name', 150);
        if ($name === '') return response()->json(['status' => 0, 'message' => 'Category name required']);
        DB::table('giftora_categories')->insert($this->tenant($a) + [
            'cat_id'     => $this->uid(),
            'cat_name'   => $name,
            'cat_desc'   => $this->clean($request, 'cat_desc', 500),
            'cat_img'    => $this->saveUpload($request, 'cat_img', 'categories'),
            'sort_order' => (int) $request->input('sort_order', 0),
            'status'     => (int) $request->input('status', 1) ? 1 : 0,
            'created_at' => now(),
        ]);
        return response()->json(['status' => 1, 'message' => 'Category added']);
    }

    public function updatecategory(Request $request)
    {
        $a   = $this->auth($request);
        $row = $this->scope('giftora_categories', $a)->where('cat_id', $request->input('cat_id'))->first();
        if (!$row) return response()->json(['status' => 0, 'message' => 'Category not found']);
        $name = $this->clean($request, 'cat_name', 150);
        if ($name === '') return response()->json(['status' => 0, 'message' => 'Category name required']);

        $data = [
            'cat_name'   => $name,
            'cat_desc'   => $this->clean($request, 'cat_desc', 500),
            'sort_order' => (int) $request->input('sort_order', 0),
            'status'     => (int) $request->input('status', 1) ? 1 : 0,
        ];
        $img = $this->saveUpload($request, 'cat_img', 'categories');
        if ($img) {
            $this->removeUpload('categories', $row->cat_img);
            $data['cat_img'] = $img;
        }
        $this->scope('giftora_categories', $a)->where('cat_id', $row->cat_id)->update($data);
        return response()->json(['status' => 1, 'message' => 'Category updated']);
    }

    public function deletecategory(Request $request)
    {
        $a   = $this->auth($request);
        $row = $this->scope('giftora_categories', $a)->where('cat_id', $request->input('cat_id'))->first();
        if (!$row) return response()->json(['status' => 1, 'message' => 'Category deleted']);
        $inUse = $this->scope('giftora_products', $a)->where('cat_id', $row->cat_id)->count();
        if ($inUse > 0) {
            return response()->json(['status' => 0, 'message' => "Move or delete the $inUse product(s) in this category first"]);
        }
        $this->removeUpload('categories', $row->cat_img);
        $this->scope('giftora_categories', $a)->where('cat_id', $row->cat_id)->delete();
        return response()->json(['status' => 1, 'message' => 'Category deleted']);
    }

    // ── Offers / Coupons ──────────────────────────────────────────────────────

    public function fetchcoupons(Request $request)
    {
        $a = $this->auth($request);
        return response()->json(['status' => 1, 'coupons' => $this->scope('giftora_coupons', $a)->orderByDesc('id')->get()]);
    }

    public function savecoupon(Request $request)
    {
        $a    = $this->auth($request);
        $cid  = trim((string) $request->input('cid', ''));
        $code = strtoupper(preg_replace('/[^A-Za-z0-9]/', '', (string) $request->input('code', '')));
        $type = $request->input('discount_type') === 'flat' ? 'flat' : 'percent';
        $val  = round((float) $request->input('discount_value', 0), 2);
        if ($code === '') return response()->json(['status' => 0, 'message' => 'Coupon code is required']);
        if ($val <= 0 || ($type === 'percent' && $val > 100)) {
            return response()->json(['status' => 0, 'message' => 'Enter a valid discount value']);
        }
        $dupe = $this->scope('giftora_coupons', $a)->where('code', $code)->when($cid, fn($q) => $q->where('cid', '!=', $cid))->exists();
        if ($dupe) return response()->json(['status' => 0, 'message' => 'That coupon code already exists']);

        $validTo = trim((string) $request->input('valid_to', ''));
        $data = [
            'code'           => mb_substr($code, 0, 40),
            'description'    => $this->clean($request, 'description', 255),
            'discount_type'  => $type,
            'discount_value' => $val,
            'min_order'      => max(0, round((float) $request->input('min_order', 0), 2)),
            'max_discount'   => max(0, round((float) $request->input('max_discount', 0), 2)),
            'valid_to'       => preg_match('/^\d{4}-\d{2}-\d{2}$/', $validTo) ? $validTo : null,
            'status'         => (int) $request->input('status', 1) ? 1 : 0,
        ];

        if ($cid) {
            $this->scope('giftora_coupons', $a)->where('cid', $cid)->update($data);
            return response()->json(['status' => 1, 'message' => 'Offer updated']);
        }
        DB::table('giftora_coupons')->insert($this->tenant($a) + $data + ['cid' => $this->uid(), 'created_at' => now()]);
        return response()->json(['status' => 1, 'message' => 'Offer added']);
    }

    public function deletecoupon(Request $request)
    {
        $a = $this->auth($request);
        $this->scope('giftora_coupons', $a)->where('cid', $request->input('cid'))->delete();
        return response()->json(['status' => 1, 'message' => 'Offer deleted']);
    }

    // ── Customers ─────────────────────────────────────────────────────────────

    public function fetchcustomers(Request $request)
    {
        $a     = $this->auth($request);
        $rows  = $this->scope('giftora_customers', $a)->orderByDesc('created_at')->get();
        $stats = $this->scope('giftora_orders', $a)->where('status', '!=', 'cancelled')
            ->select('customer_ph', DB::raw('COUNT(*) as orders'), DB::raw('SUM(total) as spent'))
            ->groupBy('customer_ph')->get()->keyBy('customer_ph');
        foreach ($rows as $r) {
            $r->order_count = (int) ($stats[$r->customer_ph]->orders ?? 0);
            $r->total_spent = (float) ($stats[$r->customer_ph]->spent ?? 0);
        }
        return response()->json(['status' => 1, 'customers' => $rows]);
    }

    // ── Reviews ───────────────────────────────────────────────────────────────

    public function fetchreviews(Request $request)
    {
        $a = $this->auth($request);
        return response()->json(['status' => 1, 'reviews' => $this->scope('giftora_reviews', $a)->orderByDesc('created_at')->get()]);
    }

    public function updatereviewstatus(Request $request)
    {
        $a = $this->auth($request);
        $this->scope('giftora_reviews', $a)->where('rid', $request->input('rid'))
            ->update(['status' => (int) $request->input('status') ? 1 : 0]);
        return response()->json(['status' => 1, 'message' => 'Review status updated']);
    }

    public function deletereview(Request $request)
    {
        $a = $this->auth($request);
        $this->scope('giftora_reviews', $a)->where('rid', $request->input('rid'))->delete();
        return response()->json(['status' => 1, 'message' => 'Review deleted']);
    }

    // ── Enquiries ─────────────────────────────────────────────────────────────

    public function fetchenquiries(Request $request)
    {
        $a = $this->auth($request);
        return response()->json(['status' => 1, 'enquiries' => $this->scope('giftora_enquiries', $a)->orderByDesc('created_at')->get()]);
    }

    public function updateenquirystatus(Request $request)
    {
        $a      = $this->auth($request);
        $status = $request->input('status') === 'read' ? 'read' : 'unread';
        $this->scope('giftora_enquiries', $a)->where('eid', $request->input('eid'))->update(['status' => $status]);
        return response()->json(['status' => 1, 'message' => 'Enquiry updated']);
    }

    public function deleteenquiry(Request $request)
    {
        $a = $this->auth($request);
        $this->scope('giftora_enquiries', $a)->where('eid', $request->input('eid'))->delete();
        return response()->json(['status' => 1, 'message' => 'Enquiry deleted']);
    }

    // ── Blog ──────────────────────────────────────────────────────────────────

    public function fetchblogposts(Request $request)
    {
        $a = $this->auth($request);
        return response()->json(['status' => 1, 'posts' => $this->scope('giftora_blog', $a)->orderByDesc('created_at')->get()]);
    }

    public function addblogpost(Request $request)
    {
        $a     = $this->auth($request);
        $title = $this->clean($request, 'title', 500);
        if ($title === '') return response()->json(['status' => 0, 'message' => 'Title is required']);
        DB::table('giftora_blog')->insert($this->tenant($a) + [
            'bid'         => $this->uid(),
            'title'       => $title,
            'tag'         => $this->clean($request, 'tag', 200),
            'description' => $this->clean($request, 'description', 2000),
            'content'     => (string) $request->input('content', ''),
            'blog_img'    => $this->saveUpload($request, 'blog_img', 'blog'),
            'status'      => 1,
            'created_at'  => now(),
        ]);
        return response()->json(['status' => 1, 'message' => 'Blog post added']);
    }

    public function updateblogpost(Request $request)
    {
        $a   = $this->auth($request);
        $row = $this->scope('giftora_blog', $a)->where('bid', $request->input('bid'))->first();
        if (!$row) return response()->json(['status' => 0, 'message' => 'Post not found']);
        $data = [
            'title'       => $this->clean($request, 'title', 500),
            'tag'         => $this->clean($request, 'tag', 200),
            'description' => $this->clean($request, 'description', 2000),
            'content'     => (string) $request->input('content', ''),
        ];
        $img = $this->saveUpload($request, 'blog_img', 'blog');
        if ($img) {
            $this->removeUpload('blog', $row->blog_img);
            $data['blog_img'] = $img;
        }
        $this->scope('giftora_blog', $a)->where('bid', $row->bid)->update($data);
        return response()->json(['status' => 1, 'message' => 'Blog post updated']);
    }

    public function deleteblogpost(Request $request)
    {
        $a   = $this->auth($request);
        $row = $this->scope('giftora_blog', $a)->where('bid', $request->input('bid'))->first();
        if ($row) {
            $this->removeUpload('blog', $row->blog_img);
            $this->scope('giftora_blog', $a)->where('bid', $row->bid)->delete();
        }
        return response()->json(['status' => 1, 'message' => 'Blog post deleted']);
    }

    // ── Store Info (hours, tagline, delivery charges) ─────────────────────────

    public function fetchbusinessinfo(Request $request)
    {
        $a = $this->auth($request);
        return response()->json(['status' => 1, 'info' => $this->scope('giftora_business_info', $a)->get()]);
    }

    public function updatebusinessinfo(Request $request)
    {
        $a    = $this->auth($request);
        $data = [];
        foreach (['business_name' => 200, 'tagline' => 300, 'address' => 500, 'phone' => 50, 'email' => 150,
                  'open_time' => 50, 'close_time' => 50, 'about' => 5000, 'instagram' => 300, 'facebook' => 300] as $k => $max) {
            // Only touch the fields this form actually sent (the mobile form has fewer of them).
            if ($request->has($k)) $data[$k] = $this->clean($request, $k, $max);
        }
        foreach (['shipping_charge', 'free_shipping_min'] as $k) {
            if ($request->has($k)) $data[$k] = max(0, round((float) $request->input($k, 0), 2));
        }

        if ($this->scope('giftora_business_info', $a)->exists()) {
            $this->scope('giftora_business_info', $a)->update($data + ['updated_at' => now()]);
        } else {
            DB::table('giftora_business_info')->insert($this->tenant($a) + $data + ['created_at' => now(), 'updated_at' => now()]);
        }
        $this->syncStoreName($a, $data['business_name'] ?? '');
        return response()->json(['status' => 1, 'message' => 'Store info updated']);
    }

    // ── Company Info ──────────────────────────────────────────────────────────

    public function fetchcompanyinfo(Request $request)
    {
        $a   = $this->auth($request);
        $row = $this->scope('company_info', $a)->first();
        return response()->json(['status' => 1, 'companyinfo' => $row ? [$row] : []]);
    }

    public function updatecompanyinfo(Request $request)
    {
        $a    = $this->auth($request);
        $data = [];
        foreach (['companyname', 'phone_one', 'phone_two', 'email_one', 'email_two',
                  'house_no', 'area', 'city', 'pincode', 'district', 'state', 'country'] as $k) {
            $data[$k] = $this->clean($request, $k);
        }

        if ($this->scope('company_info', $a)->exists()) {
            $this->scope('company_info', $a)->update($data);
        } else {
            DB::table('company_info')->insert($this->tenant($a) + $data + ['cid' => $this->uid(), 'status' => '1']);
        }
        $this->syncStoreName($a, $data['companyname']);
        return response()->json(['status' => 1, 'message' => 'Company info updated']);
    }

    public function fetchsociallinks(Request $request)
    {
        $a   = $this->auth($request);
        $row = $this->scope('social_links', $a)->first();
        return response()->json(['status' => 1, 'sociallinks' => $row ? [$row] : []]);
    }

    public function updatesociallinkinfo(Request $request)
    {
        $a    = $this->auth($request);
        $data = [
            'fb'     => $this->clean($request, 'fb', 500),
            'insta'  => $this->clean($request, 'insta', 500),
            'linked' => $this->clean($request, 'linked', 500),
        ];
        if ($this->scope('social_links', $a)->exists()) {
            $this->scope('social_links', $a)->update($data);
        } else {
            DB::table('social_links')->insert($this->tenant($a) + $data + ['sid' => $this->uid(), 'status' => '1']);
        }
        return response()->json(['status' => 1, 'message' => 'Social links updated']);
    }

    // ── Home Banners ──────────────────────────────────────────────────────────

    public function listhomebanners(Request $request)
    {
        $a = $this->auth($request);
        return response()->json(['status' => 1, 'homebanner' => $this->scope('web_banner', $a)->orderBy('banner_order')->get()]);
    }

    public function addhomebanner(Request $request)
    {
        $a = $this->auth($request);
        if (!$request->hasFile('bannerimg')) return response()->json(['status' => 0, 'message' => 'No image selected']);
        $size     = (string) $request->file('bannerimg')->getSize(); // read before move() removes the temp file
        $filename = $this->saveUpload($request, 'bannerimg', 'homeBanners');
        if (!$filename) return response()->json(['status' => 0, 'message' => 'Invalid file type']);

        DB::table('web_banner')->insert($this->tenant($a) + [
            'bid'             => $this->uid(),
            'banner_order'    => (int) $this->scope('web_banner', $a)->max('banner_order') + 1,
            'banner_title'    => $this->clean($request, 'bannertitle'),
            'banner_img'      => $filename,
            'banner_img_ext'  => pathinfo($filename, PATHINFO_EXTENSION),
            'banner_img_size' => $size,
            'status'          => '1',
        ]);
        return response()->json(['status' => 1, 'message' => 'Banner added']);
    }

    public function updatehomebanner(Request $request)
    {
        $a   = $this->auth($request);
        $row = $this->scope('web_banner', $a)->where('bid', $request->input('bid'))->first();
        if (!$row) return response()->json(['status' => 0, 'message' => 'Banner not found']);
        $data = [
            'banner_title' => $this->clean($request, 'bannertitle'),
            'banner_order' => max(1, (int) $request->input('banner_order', $row->banner_order)),
            'status'       => (string) $request->input('status', $row->status) === '0' ? '0' : '1',
        ];
        $img = $this->saveUpload($request, 'bannerimg', 'homeBanners');
        if ($img) {
            $this->removeUpload('homeBanners', $row->banner_img);
            $data['banner_img']     = $img;
            $data['banner_img_ext'] = pathinfo($img, PATHINFO_EXTENSION);
        }
        $this->scope('web_banner', $a)->where('bid', $row->bid)->update($data);
        return response()->json(['status' => 1, 'message' => 'Banner updated']);
    }

    public function deletehomebanner(Request $request)
    {
        $a   = $this->auth($request);
        $row = $this->scope('web_banner', $a)->where('bid', $request->input('bid'))->first();
        if ($row) {
            $this->removeUpload('homeBanners', $row->banner_img);
            $this->scope('web_banner', $a)->where('bid', $row->bid)->delete();
        }
        return response()->json(['status' => 1, 'message' => 'Banner deleted']);
    }

    // ── About ─────────────────────────────────────────────────────────────────

    private const ABOUT_SLUG_MAP = [
        'aboutus'         => 'aboutus',
        'whoweare'        => 'whoweare',
        'ourmission'      => 'ourmission',
        'ourvision'       => 'ourvision',
        'ourvalues'       => 'ourvalues',
        'companyoverview' => 'comp',
        'whatwedo'        => 'whatwedo',
        'whychooseus'     => 'whyus',
    ];

    public function fetchaboutus(Request $request)
    {
        $a = $this->auth($request);
        return response()->json(['status' => 1, 'aboutus' => $this->scope('about', $a)->get()]);
    }

    public function update_about(Request $request)
    {
        $a   = $this->auth($request);
        $pre = self::ABOUT_SLUG_MAP[$request->input('slug', '')] ?? null;
        if (!$pre) return response()->json(['status' => 0, 'message' => 'Invalid section']);

        $row = $this->scope('about', $a)->first();
        if (!$row) {
            DB::table('about')->insert($this->tenant($a) + ['aid' => $this->uid()]);
            $row = $this->scope('about', $a)->first();
        }

        $data = [
            "{$pre}_sdesc" => trim((string) $request->input('shortdesc', '')),
            "{$pre}_desc"  => trim((string) $request->input('desc', '')),
        ];
        $img = $this->saveUpload($request, 'aboutimg', 'aboutUs');
        if ($img) {
            $this->removeUpload('aboutUs', $row->{"{$pre}_img"});
            $data["{$pre}_img"]     = $img;
            $data["{$pre}_img_ext"] = pathinfo($img, PATHINFO_EXTENSION);
        }
        $this->scope('about', $a)->update($data);

        $resp = ['status' => 1, 'message' => 'Updated successfully'];
        if ($img) $resp['img'] = $img;
        return response()->json($resp);
    }

    public function deletaboutimg(Request $request)
    {
        $a   = $this->auth($request);
        $pre = self::ABOUT_SLUG_MAP[$request->input('slug', '')] ?? null;
        if (!$pre) return response()->json(['status' => 0, 'message' => 'Invalid section']);

        $row = $this->scope('about', $a)->first();
        if ($row) $this->removeUpload('aboutUs', $row->{"{$pre}_img"});
        $this->scope('about', $a)->update(["{$pre}_img" => '', "{$pre}_img_ext" => '', "{$pre}_img_size" => '']);
        return response()->json(['status' => 1, 'message' => 'Image deleted']);
    }

    // ── Terms & Policy ────────────────────────────────────────────────────────

    public function fetchterms(Request $request)
    {
        $a    = $this->auth($request);
        $rows = $this->scope('giftora_terms', $a)->where('termtype', trim((string) $request->input('termtype', '')))->get();
        return response()->json(['status' => 1, 'terms' => $rows]);
    }

    public function updateterms(Request $request)
    {
        $a    = $this->auth($request);
        $type = trim((string) $request->input('termtype', ''));
        if (!in_array($type, ['conditions', 'privacy', 'disclaimer', 'cookiepolicy'], true)) {
            return response()->json(['status' => 0, 'message' => 'Invalid section']);
        }
        $data = [
            'terms_title' => $this->clean($request, 'title'),
            'terms_desc'  => trim((string) $request->input('description', '')),
            'updated_at'  => now(),
        ];
        if ($this->scope('giftora_terms', $a)->where('termtype', $type)->exists()) {
            $this->scope('giftora_terms', $a)->where('termtype', $type)->update($data);
        } else {
            DB::table('giftora_terms')->insert($this->tenant($a) + $data + ['termtype' => $type, 'created_at' => now()]);
        }
        return response()->json(['status' => 1, 'message' => 'Updated successfully']);
    }

    // ── Notifications ─────────────────────────────────────────────────────────

    public function fetchnotifications(Request $request)
    {
        $a = $this->auth($request);
        return response()->json(['status' => 1, 'notifications' => $this->scope('giftora_notifications', $a)->orderByDesc('created_at')->orderByDesc('id')->get()]);
    }

    public function marknotificationread(Request $request)
    {
        $a   = $this->auth($request);
        $nid = trim((string) $request->input('nid', ''));
        $this->scope('giftora_notifications', $a)->when($nid !== 'all', fn($q) => $q->where('nid', $nid))->update(['is_read' => 1]);
        return response()->json(['status' => 1, 'message' => 'Marked as read']);
    }

    // ── Theme Color ───────────────────────────────────────────────────────────

    public function fetchthemecolor(Request $request)
    {
        $a     = $this->auth($request);
        $color = $this->scope('giftora_theme', $a)->value('color');
        return response()->json(['status' => 1, 'color' => $color ? [['color' => $color]] : []]);
    }

    public function updatethemecolor(Request $request)
    {
        $a     = $this->auth($request);
        $color = (string) $request->input('tcolor', '');
        if (!preg_match('/^#[0-9a-fA-F]{6}$/', $color)) {
            return response()->json(['status' => 0, 'message' => 'Invalid color format']);
        }
        if ($this->scope('giftora_theme', $a)->exists()) {
            $this->scope('giftora_theme', $a)->update(['color' => $color, 'updated_at' => now()]);
        } else {
            DB::table('giftora_theme')->insert($this->tenant($a) + ['color' => $color]);
        }
        return response()->json(['status' => 1, 'message' => 'Theme color updated']);
    }
}
