<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

/**
 * Default data for a fresh Giftora store.
 * Everything inserted here is editable from the admin panel afterwards.
 */
class DatabaseSeeder extends Seeder
{
    private const PROFILE_ID = 'gft1a2b3c4d5e6f7';
    private const SUBDOMAIN  = 'store';

    private function uid(): string
    {
        return bin2hex(random_bytes(8));
    }

    private function tenant(): array
    {
        return ['profile_id' => self::PROFILE_ID, 'subdomain' => self::SUBDOMAIN, 'domain' => ''];
    }

    public function run(): void
    {
        $t = $this->tenant();

        DB::statement('SET FOREIGN_KEY_CHECKS=0');
        foreach (['giftora_order_updates', 'giftora_tracking_codes', 'giftora_tracking_uploads', 'giftora_courier_costs', 'giftora_couriers',
                  'giftora_order_items', 'giftora_orders', 'giftora_products', 'giftora_categories',
                  'giftora_coupons', 'giftora_customers', 'giftora_reviews', 'giftora_blog',
                  'giftora_enquiries', 'giftora_notifications', 'giftora_terms', 'giftora_theme',
                  'giftora_business_info', 'giftora_admin_tokens', 'giftora_admins',
                  'about', 'app_logo', 'app_title', 'company_info', 'social_links', 'web_banner'] as $table) {
            DB::table($table)->truncate();
        }
        DB::statement('SET FOREIGN_KEY_CHECKS=1');

        // ── Branding & store settings ────────────────────────────────────────
        DB::table('app_title')->insert($t + ['aid' => $this->uid(), 'apptitle' => 'Giftora']);

        DB::table('app_logo')->insert($t + [
            'lid' => $this->uid(), 'logo_img' => 'giftora-logo.png', 'fev_img' => 'giftora-favicon.png', 'status' => '1',
        ]);

        DB::table('giftora_theme')->insert($t + ['color' => '#E11D74']);

        DB::table('company_info')->insert($t + [
            'cid' => $this->uid(), 'companyname' => 'Giftora',
            'phone_one' => '+91 98765 43210', 'phone_two' => '',
            'email_one' => 'hello@giftora.in', 'email_two' => 'support@giftora.in',
            'house_no' => '24', 'area' => 'Gift Street, T. Nagar', 'city' => 'Chennai',
            'pincode' => '600017', 'district' => 'Chennai', 'state' => 'Tamil Nadu', 'country' => 'India',
            'status' => '1',
        ]);

        DB::table('social_links')->insert($t + [
            'sid' => $this->uid(),
            'fb' => 'https://facebook.com/', 'insta' => 'https://instagram.com/', 'linked' => 'https://linkedin.com/',
            'status' => '1',
        ]);

        DB::table('giftora_business_info')->insert($t + [
            'business_name' => 'Giftora',
            'tagline'       => 'Thoughtful gifts, greeting cards and surprises delivered with love.',
            'address'       => '24, Gift Street, T. Nagar, Chennai - 600017, Tamil Nadu, India',
            'phone'         => '+91 98765 43210',
            'email'         => 'hello@giftora.in',
            'open_time'     => '9:00 AM',
            'close_time'    => '9:00 PM',
            'about'         => 'We are an online gifting store that helps you celebrate every occasion. Choose from curated gift hampers, handmade greeting cards, surprise boxes, fresh flowers, personalised keepsakes and chocolates, and we will pack and deliver them with care.',
            'instagram'     => 'https://instagram.com/',
            'facebook'      => 'https://facebook.com/',
            'shipping_charge'   => 60,
            'free_shipping_min' => 999,
        ]);

        // ── Admin account (change the password after first login) ────────────
        DB::table('giftora_admins')->insert($t + [
            'aid' => $this->uid(), 'name' => 'Store Admin', 'email' => 'admin@giftora.in',
            'password' => Hash::make('Admin@123'), 'status' => 'active',
        ]);

        // ── Home banners ─────────────────────────────────────────────────────
        foreach ([
            ['banner-1.jpg', 'Gifts for every occasion'],
            ['banner-2.jpg', 'Surprise gifts delivered to their door'],
            ['banner-3.jpg', 'Greeting cards made with love'],
        ] as $i => [$img, $title]) {
            DB::table('web_banner')->insert($t + [
                'bid' => $this->uid(), 'banner_order' => $i + 1, 'banner_title' => $title,
                'banner_img' => $img, 'banner_img_ext' => 'jpg', 'banner_img_size' => '', 'status' => '1',
            ]);
        }

        // ── Categories ───────────────────────────────────────────────────────
        $categories = [
            'online'   => ['Online Gifts',         'Curated gift hampers and boxes for every celebration.', 'cat-online-gifts.jpg'],
            'cards'    => ['Greeting Cards',       'Handmade and printed cards for every occasion.',        'cat-greeting-cards.jpg'],
            'surprise' => ['Surprise Gifts',       'Surprise boxes and midnight deliveries.',               'cat-surprise-gifts.jpg'],
            'flowers'  => ['Flowers & Bouquets',   'Fresh hand-tied bouquets and flower baskets.',          'cat-flowers.jpg'],
            'personal' => ['Personalised Gifts',   'Mugs, frames and keepsakes made just for them.',        'cat-personalised.jpg'],
            'sweets'   => ['Chocolates & Sweets',  'Chocolate boxes, truffles and sweet treats.',           'cat-chocolates.jpg'],
        ];
        $catIds = [];
        $order  = 0;
        foreach ($categories as $key => [$name, $desc, $img]) {
            $catIds[$key] = $this->uid();
            DB::table('giftora_categories')->insert($t + [
                'cat_id' => $catIds[$key], 'cat_name' => $name, 'cat_desc' => $desc, 'cat_img' => $img,
                'sort_order' => ++$order, 'status' => 1,
            ]);
        }

        // ── Products ─────────────────────────────────────────────────────────
        // [category, name, sku, mrp, price, stock, featured, image, description]
        $products = [
            ['online', 'Luxury Celebration Gift Hamper', 'GH-001', 2499, 1999, 25, 1, 'p-celebration-hamper.jpg',
                'A premium hamper packed with gourmet treats, a scented candle and a keepsake box. Beautifully wrapped and ready to gift.'],
            ['online', 'Spa & Self-Care Gift Box', 'GH-002', 1799, 1499, 30, 0, 'p-spa-gift-box.jpg',
                'Bath salts, handmade soap, a soft towel and aroma oil in a ribboned box. A relaxing treat for someone special.'],
            ['online', 'Gourmet Tea & Cookies Hamper', 'GH-003', 1299, 999, 40, 1, 'p-tea-hamper.jpg',
                'Assorted fine teas with butter cookies in a reusable gift basket. Perfect for housewarmings and thank-you gifts.'],

            ['cards', 'Handmade Birthday Greeting Card', 'GC-001', 199, 149, 120, 1, 'p-birthday-card.jpg',
                'A handcrafted birthday card on textured paper with space for your personal message. Envelope included.'],
            ['cards', 'Anniversary Greeting Card', 'GC-002', 349, 279, 80, 0, 'p-anniversary-card.jpg',
                'An elegant anniversary card with a heartfelt verse inside. Comes with a matching envelope.'],
            ['cards', 'Thank You Cards (Pack of 5)', 'GC-003', 299, 249, 100, 0, 'p-thankyou-cards.jpg',
                'Five thank-you cards with envelopes. Blank inside so you can write your own note.'],

            ['surprise', 'Surprise Balloon Box', 'SG-001', 1499, 1199, 20, 1, 'p-balloon-box.jpg',
                'A box that opens to a burst of balloons with a small gift and message card inside. Great for birthdays.'],
            ['surprise', 'Mystery Surprise Gift Box', 'SG-002', 999, 799, 35, 1, 'p-mystery-box.jpg',
                'A hand-picked mix of gifts chosen by our team. Tell us the occasion and we will do the rest.'],
            ['surprise', 'Party Surprise Kit', 'SG-003', 899, 699, 30, 0, 'p-party-kit.jpg',
                'Confetti, party poppers, candles and a celebration banner in one kit for an instant surprise party.'],

            ['flowers', 'Red Roses Bouquet', 'FL-001', 799, 649, 50, 1, 'p-red-roses.jpg',
                'Twelve fresh red roses hand-tied with seasonal greens and wrapped in premium paper.'],
            ['flowers', 'Mixed Flower Bouquet', 'FL-002', 1199, 949, 25, 0, 'p-flower-basket.jpg',
                'A cheerful bouquet of daisies and mixed seasonal flowers arranged by our florists.'],
            ['flowers', 'Pink Tulip Bunch', 'FL-003', 999, 849, 20, 0, 'p-pink-tulips.jpg',
                'A soft bunch of pink tulips tied with a satin ribbon.'],

            ['personal', 'Personalised Printed Mug', 'PG-001', 399, 299, 200, 1, 'p-photo-mug.jpg',
                'An enamel mug printed with a design, name or message of your choice. Tell us what to print in the order notes.'],
            ['personal', 'Classic Photo Frame', 'PG-002', 799, 599, 60, 0, 'p-photo-frame.jpg',
                'A clean white frame for a favourite memory. Holds a 5x7 inch photo and stands or hangs.'],
            ['personal', 'Custom Printed Cushion', 'PG-003', 699, 549, 45, 0, 'p-cushion.jpg',
                'A soft cushion printed with artwork, a name or a short message of your choice. Filler included.'],

            ['sweets', 'Assorted Chocolate Gift Box', 'CH-001', 899, 749, 70, 1, 'p-chocolate-box.jpg',
                'A box of assorted milk, dark and white chocolates in a gift-ready pack.'],
            ['sweets', 'Dry Fruits Gift Tray', 'CH-002', 1599, 1299, 30, 0, 'p-dry-fruits.jpg',
                'Premium almonds, cashews, pistachios and raisins in a decorative tray.'],
            ['sweets', 'Chocolate Truffle Box', 'CH-003', 649, 499, 55, 1, 'p-truffles.jpg',
                'Hand-rolled chocolate truffles dusted with cocoa. Sixteen pieces per box.'],
        ];
        foreach ($products as $i => [$cat, $name, $sku, $mrp, $price, $stock, $featured, $img, $desc]) {
            DB::table('giftora_products')->insert($t + [
                'pid' => $this->uid(), 'cat_id' => $catIds[$cat], 'product_name' => $name, 'sku' => $sku,
                'description' => $desc, 'mrp' => $mrp, 'price' => $price, 'stock' => $stock,
                'product_img' => $img, 'is_featured' => $featured, 'status' => 1,
                'created_at' => now()->subMinutes(count($products) - $i),
            ]);
        }

        // ── Offers / coupons ─────────────────────────────────────────────────
        foreach ([
            ['WELCOME10', '10% off your first order', 'percent', 10, 499, 200],
            ['GIFT100',   'Flat ₹100 off on orders above ₹999', 'flat', 100, 999, 0],
            ['FESTIVE15', '15% off festive gifting', 'percent', 15, 1499, 400],
        ] as [$code, $desc, $type, $value, $min, $max]) {
            DB::table('giftora_coupons')->insert($t + [
                'cid' => $this->uid(), 'code' => $code, 'description' => $desc, 'discount_type' => $type,
                'discount_value' => $value, 'min_order' => $min, 'max_discount' => $max,
                'valid_to' => now()->addYear()->toDateString(), 'status' => 1,
            ]);
        }

        // ── Reviews ──────────────────────────────────────────────────────────
        foreach ([
            ['Ananya R.', 5, 'The hamper was beautifully packed and arrived right on time. My sister loved it!', 'Luxury Celebration Gift Hamper'],
            ['Karthik S.', 5, 'Ordered roses for our anniversary. Fresh flowers and a lovely handwritten note.', 'Red Roses Bouquet'],
            ['Meera V.', 4, 'The photo mug print quality is great. Delivery took a day longer than expected.', 'Personalised Printed Mug'],
            ['Rahul D.', 5, 'The surprise balloon box made my friend\'s birthday. Will order again.', 'Surprise Balloon Box'],
        ] as $i => [$name, $rating, $text, $product]) {
            DB::table('giftora_reviews')->insert($t + [
                'rid' => $this->uid(), 'reviewer_name' => $name, 'reviewer_ph' => '', 'rating' => $rating,
                'review_text' => $text, 'product_name' => $product, 'status' => 1,
                'created_at' => now()->subDays($i + 1),
            ]);
        }

        // ── Blog ─────────────────────────────────────────────────────────────
        foreach ([
            ['How to Choose the Perfect Gift for Any Occasion', 'Gift Guide', 'blog-1.jpg',
                'A simple way to pick a gift they will remember, whatever the occasion.',
                '<p>Start with the person, not the product. Think about what they enjoy day to day, then match the gift to the occasion and your budget.</p><p>Hampers work well when you are unsure, personalised gifts suit close friends and family, and flowers or chocolates are always welcome as an add-on.</p>'],
            ['5 Surprise Gift Ideas That Never Fail', 'Surprise Gifts', 'blog-2.jpg',
                'Midnight deliveries, balloon boxes and other surprises worth planning.',
                '<p>A surprise is about timing as much as the gift. Try a midnight delivery, a balloon box at the door, a mystery box, a photo keepsake, or a party kit sent ahead of the celebration.</p>'],
            ['Why a Handwritten Card Still Matters', 'Greeting Cards', 'blog-3.jpg',
                'A few honest lines in a card can mean more than the gift itself.',
                '<p>Cards are kept long after the wrapping is gone. Write something specific: a shared memory, what you admire about them, or what you are looking forward to together.</p>'],
        ] as $i => [$title, $tag, $img, $desc, $content]) {
            DB::table('giftora_blog')->insert($t + [
                'bid' => $this->uid(), 'title' => $title, 'tag' => $tag, 'description' => $desc,
                'content' => $content, 'blog_img' => $img, 'status' => 1, 'created_at' => now()->subDays($i * 3 + 1),
            ]);
        }

        // ── About ────────────────────────────────────────────────────────────
        $about = $t + ['aid' => $this->uid()];
        $sections = [
            'aboutus'    => ['about-us.jpg', 'Gifting made simple, personal and joyful.',
                '<p>We started as a small gift studio with one belief: a thoughtful gift can make someone\'s day. Today we deliver gift hampers, greeting cards, surprise boxes, flowers and personalised keepsakes for every occasion.</p>'],
            'whoweare'   => ['about-who.jpg', 'A team of gift curators, florists and packers.',
                '<p>Every order is checked, packed and sealed by hand by people who care about how it looks when it is opened.</p>'],
            'ourmission' => ['', 'To help people celebrate each other, wherever they are.',
                '<p>We make it easy to send something meaningful, on time, at a fair price.</p>'],
            'ourvision'  => ['', 'To be the most loved gifting store for every celebration.',
                '<p>We want every customer to feel confident that their gift will arrive beautifully and on time.</p>'],
            'ourvalues'  => ['', 'Care, honesty and attention to detail.',
                '<p>We pack with care, describe our products honestly and fix problems quickly when they happen.</p>'],
            'comp'       => ['', 'An online gifting store serving customers across India.',
                '<p>We work with local makers, florists and chocolatiers to bring you a carefully chosen range of gifts.</p>'],
            'whatwedo'   => ['', 'Gifts, cards, flowers and surprises, delivered.',
                '<p>Browse by category, add a gift message, pick a delivery date and we take care of the rest.</p>'],
            'whyus'      => ['', 'Hand-packed gifts, careful delivery and friendly support.',
                '<p>Quality-checked products, gift-ready packaging, order tracking and a support team that replies.</p>'],
        ];
        foreach ($sections as $prefix => [$img, $short, $long]) {
            $about["{$prefix}_img"]      = $img;
            $about["{$prefix}_img_ext"]  = $img ? 'jpg' : '';
            $about["{$prefix}_img_size"] = '';
            $about["{$prefix}_sdesc"]    = $short;
            $about["{$prefix}_desc"]     = $long;
        }
        DB::table('about')->insert($about);

        // ── Terms & policies ─────────────────────────────────────────────────
        foreach ([
            'conditions'   => ['Terms and Conditions',
                'By placing an order you agree to provide accurate delivery details and to pay the order total shown at checkout. Product images are for reference; flowers and handmade items may vary slightly. Orders can be cancelled before they are packed.'],
            'privacy'      => ['Privacy Policy',
                'We collect your name, phone number, email and delivery address only to process and deliver your orders and to contact you about them. We do not sell your personal information.'],
            'disclaimer'   => ['Disclaimer',
                'Delivery dates are estimates and may be affected by weather, holidays or courier delays. Perishable items should be consumed as indicated on the pack.'],
            'cookiepolicy' => ['Cookie Policy',
                'This site stores your cart and preferences in your browser so they are available on your next visit. No advertising cookies are used.'],
        ] as $type => [$title, $desc]) {
            DB::table('giftora_terms')->insert($t + ['termtype' => $type, 'terms_title' => $title, 'terms_desc' => $desc]);
        }

        DB::table('giftora_notifications')->insert([
            'nid' => $this->uid(), 'profile_id' => self::PROFILE_ID, 'subdomain' => self::SUBDOMAIN,
            'message' => 'Your store is ready. Update your logo, banners and products from the admin panel.',
            'type' => 'general', 'is_read' => 0,
        ]);
    }
}
