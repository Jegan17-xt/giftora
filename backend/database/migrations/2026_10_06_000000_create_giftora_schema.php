<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Builds the Giftora schema.
 *
 * Safe to run on an empty database or on top of the imported legacy dump:
 * every legacy table is dropped first, then the store tables are created
 * fresh (InnoDB / utf8mb4) with proper keys and relationships.
 */
return new class extends Migration
{
    /** Tables from the previous project that Giftora replaces or no longer needs. */
    private const LEGACY = [
        'cinelux_event_gallery', 'cinelux_event_members', 'cinelux_events',
        'cinelux_emp_ratings', 'cinelux_emp_customers', 'cinelux_employees',
        'cinelux_youtube', 'cinelux_trending', 'cinelux_bookings', 'cinelux_services',
        'cinelux_service_categories', 'cinelux_blog', 'cinelux_business_info',
        'cinelux_customers', 'cinelux_enquiries', 'cinelux_notifications',
        'cinelux_reviews', 'cinelux_terms', 'cinelux_theme',
        'customers', 'dummy', 'enquries', 'leads', 'services', 'theme',
        'about', 'app_logo', 'app_title', 'company_info', 'social_links', 'web_banner',
    ];

    private const GIFTORA = [
        'giftora_order_items', 'giftora_orders', 'giftora_products', 'giftora_categories',
        'giftora_coupons', 'giftora_customers', 'giftora_reviews', 'giftora_blog',
        'giftora_enquiries', 'giftora_notifications', 'giftora_terms', 'giftora_theme',
        'giftora_business_info', 'giftora_admin_tokens', 'giftora_admins',
        'about', 'app_logo', 'app_title', 'company_info', 'social_links', 'web_banner',
    ];

    private function tenant(Blueprint $t): void
    {
        $t->string('profile_id', 32);
        $t->string('subdomain', 100);
        $t->string('domain', 150)->default('');
    }

    public function up(): void
    {
        Schema::disableForeignKeyConstraints();
        foreach (array_merge(self::LEGACY, self::GIFTORA) as $table) {
            Schema::dropIfExists($table);
        }
        Schema::enableForeignKeyConstraints();

        // ── Store identity & branding ────────────────────────────────────────
        Schema::create('app_title', function (Blueprint $t) {
            $t->increments('id');
            $t->string('aid', 16)->unique();
            $this->tenant($t);
            $t->string('apptitle', 255)->default('');
            $t->unique(['profile_id', 'subdomain'], 'uq_app_title_store');
        });

        Schema::create('app_logo', function (Blueprint $t) {
            $t->increments('id');
            $t->string('lid', 16)->unique();
            $this->tenant($t);
            $t->string('logo_img', 255)->default('');
            $t->string('fev_img', 255)->default('');
            $t->string('status', 10)->default('1');
            $t->unique(['profile_id', 'subdomain'], 'uq_app_logo_store');
        });

        Schema::create('giftora_theme', function (Blueprint $t) {
            $t->increments('id');
            $this->tenant($t);
            $t->string('color', 10)->default('#E11D74');
            $t->timestamp('updated_at')->useCurrent()->useCurrentOnUpdate();
            $t->unique(['profile_id', 'subdomain'], 'uniq_vendor');
        });

        Schema::create('company_info', function (Blueprint $t) {
            $t->increments('mid');
            $t->string('cid', 16)->unique();
            $this->tenant($t);
            foreach (['companyname', 'phone_one', 'phone_two', 'email_one', 'email_two', 'house_no',
                      'area', 'city', 'pincode', 'district', 'state', 'country'] as $col) {
                $t->string($col, 255)->default('');
            }
            $t->string('status', 10)->default('1');
            $t->unique(['profile_id', 'subdomain'], 'uq_company_store');
        });

        Schema::create('social_links', function (Blueprint $t) {
            $t->increments('mid');
            $t->string('sid', 16)->unique();
            $this->tenant($t);
            $t->string('fb', 500)->default('');
            $t->string('insta', 500)->default('');
            $t->string('linked', 500)->default('');
            $t->string('status', 10)->default('1');
            $t->unique(['profile_id', 'subdomain'], 'uq_social_store');
        });

        Schema::create('giftora_business_info', function (Blueprint $t) {
            $this->tenant($t);
            $t->string('business_name', 200)->default('');
            $t->string('tagline', 300)->default('');
            $t->string('address', 500)->default('');
            $t->string('phone', 50)->default('');
            $t->string('email', 150)->default('');
            $t->string('open_time', 50)->default('');
            $t->string('close_time', 50)->default('');
            $t->text('about')->nullable();
            $t->string('instagram', 300)->default('');
            $t->string('facebook', 300)->default('');
            $t->decimal('shipping_charge', 10, 2)->default(0);
            $t->decimal('free_shipping_min', 10, 2)->default(0);
            $t->dateTime('created_at')->useCurrent();
            $t->dateTime('updated_at')->useCurrent()->useCurrentOnUpdate();
            $t->primary(['profile_id', 'subdomain']);
        });

        Schema::create('web_banner', function (Blueprint $t) {
            $t->increments('id');
            $t->string('bid', 16)->unique();
            $this->tenant($t);
            $t->integer('banner_order')->default(1);
            $t->string('banner_title', 255)->default('');
            $t->string('banner_img', 255)->default('');
            $t->string('banner_img_ext', 10)->default('');
            $t->string('banner_img_size', 20)->default('');
            $t->string('status', 10)->default('1');
            $t->index(['profile_id', 'subdomain'], 'idx_banner_store');
        });

        Schema::create('about', function (Blueprint $t) {
            $t->increments('id');
            $t->string('aid', 16)->unique();
            $this->tenant($t);
            foreach (['aboutus', 'whoweare', 'ourmission', 'ourvision', 'ourvalues', 'comp', 'whatwedo', 'whyus'] as $p) {
                $t->string("{$p}_img", 255)->default('');
                $t->string("{$p}_img_ext", 10)->default('');
                $t->string("{$p}_img_size", 20)->default('');
                $t->text("{$p}_sdesc")->nullable();
                $t->longText("{$p}_desc")->nullable();
            }
            $t->unique(['profile_id', 'subdomain'], 'uq_about_store');
        });

        Schema::create('giftora_terms', function (Blueprint $t) {
            $t->increments('id');
            $this->tenant($t);
            $t->string('termtype', 50);
            $t->string('terms_title', 255)->default('');
            $t->longText('terms_desc')->nullable();
            $t->dateTime('created_at')->useCurrent();
            $t->dateTime('updated_at')->useCurrent()->useCurrentOnUpdate();
            $t->unique(['profile_id', 'subdomain', 'termtype'], 'uq_terms');
        });

        // ── Admin accounts ───────────────────────────────────────────────────
        Schema::create('giftora_admins', function (Blueprint $t) {
            $t->increments('id');
            $t->string('aid', 16)->unique();
            $this->tenant($t);
            $t->string('name', 150)->default('');
            $t->string('email', 150)->unique();
            $t->string('password', 255);
            $t->string('status', 20)->default('active');
            $t->dateTime('created_at')->useCurrent();
        });

        Schema::create('giftora_admin_tokens', function (Blueprint $t) {
            $t->increments('id');
            $t->string('aid', 16);
            $t->string('token_hash', 64)->unique();
            $t->dateTime('expires_at');
            $t->dateTime('created_at')->useCurrent();
            $t->foreign('aid')->references('aid')->on('giftora_admins')->cascadeOnDelete();
        });

        // ── Catalogue ────────────────────────────────────────────────────────
        Schema::create('giftora_categories', function (Blueprint $t) {
            $t->increments('id');
            $t->string('cat_id', 16)->unique();
            $this->tenant($t);
            $t->string('cat_name', 150)->default('');
            $t->string('cat_desc', 500)->default('');
            $t->string('cat_img', 255)->default('');
            $t->integer('sort_order')->default(0);
            $t->tinyInteger('status')->default(1);
            $t->dateTime('created_at')->useCurrent();
            $t->index(['profile_id', 'subdomain'], 'idx_cat_store');
        });

        Schema::create('giftora_products', function (Blueprint $t) {
            $t->increments('id');
            $t->string('pid', 16)->unique();
            $this->tenant($t);
            $t->string('cat_id', 16)->nullable();
            $t->string('product_name', 255)->default('');
            $t->string('sku', 60)->default('');
            $t->text('description')->nullable();
            $t->decimal('mrp', 10, 2)->default(0);
            $t->decimal('price', 10, 2)->default(0);
            $t->integer('stock')->default(0);
            $t->string('product_img', 255)->default('');
            $t->tinyInteger('is_featured')->default(0);
            $t->tinyInteger('status')->default(1);
            $t->dateTime('created_at')->useCurrent();
            $t->index(['profile_id', 'subdomain'], 'idx_prod_store');
            $t->foreign('cat_id')->references('cat_id')->on('giftora_categories')->nullOnDelete();
        });

        Schema::create('giftora_coupons', function (Blueprint $t) {
            $t->increments('id');
            $t->string('cid', 16)->unique();
            $this->tenant($t);
            $t->string('code', 40);
            $t->string('description', 255)->default('');
            $t->string('discount_type', 10)->default('percent'); // percent | flat
            $t->decimal('discount_value', 10, 2)->default(0);
            $t->decimal('min_order', 10, 2)->default(0);
            $t->decimal('max_discount', 10, 2)->default(0);       // 0 = no cap
            $t->date('valid_to')->nullable();
            $t->tinyInteger('status')->default(1);
            $t->dateTime('created_at')->useCurrent();
            $t->unique(['profile_id', 'subdomain', 'code'], 'uq_coupon_code');
        });

        // ── Customers & orders ───────────────────────────────────────────────
        Schema::create('giftora_customers', function (Blueprint $t) {
            $t->increments('id');
            $this->tenant($t);
            $t->string('customer_name', 200)->default('');
            $t->string('customer_ph', 30)->default('');
            $t->string('customer_email', 150)->default('');
            $t->string('address', 500)->default('');
            $t->string('city', 100)->default('');
            $t->string('state', 100)->default('');
            $t->string('pincode', 20)->default('');
            $t->dateTime('created_at')->useCurrent();
            $t->unique(['profile_id', 'subdomain', 'customer_ph'], 'uq_customer_phone');
        });

        Schema::create('giftora_orders', function (Blueprint $t) {
            $t->increments('id');
            $t->string('oid', 16)->unique();
            $t->string('order_no', 30)->unique();
            $this->tenant($t);
            $t->string('customer_name', 200)->default('');
            $t->string('customer_ph', 30)->default('');
            $t->string('customer_email', 150)->default('');
            $t->string('address', 500)->default('');
            $t->string('city', 100)->default('');
            $t->string('state', 100)->default('');
            $t->string('pincode', 20)->default('');
            $t->string('recipient_name', 200)->default('');
            $t->text('gift_message')->nullable();
            $t->date('delivery_date')->nullable();
            $t->text('notes')->nullable();
            $t->decimal('subtotal', 10, 2)->default(0);
            $t->decimal('discount', 10, 2)->default(0);
            $t->string('coupon_code', 40)->default('');
            $t->decimal('shipping', 10, 2)->default(0);
            $t->decimal('total', 10, 2)->default(0);
            $t->string('payment_method', 30)->default('cod');
            $t->string('payment_status', 30)->default('pending');
            $t->string('status', 30)->default('pending');
            $t->dateTime('created_at')->useCurrent();
            $t->dateTime('updated_at')->useCurrent()->useCurrentOnUpdate();
            $t->index(['profile_id', 'subdomain'], 'idx_order_store');
            $t->index('customer_ph', 'idx_order_ph');
        });

        Schema::create('giftora_order_items', function (Blueprint $t) {
            $t->increments('id');
            $t->string('oid', 16);
            $t->string('pid', 16)->nullable();
            $t->string('product_name', 255)->default('');
            $t->string('product_img', 255)->default('');
            $t->decimal('price', 10, 2)->default(0);
            $t->integer('qty')->default(1);
            $t->decimal('line_total', 10, 2)->default(0);
            $t->foreign('oid')->references('oid')->on('giftora_orders')->cascadeOnDelete();
            $t->foreign('pid')->references('pid')->on('giftora_products')->nullOnDelete();
        });

        // ── Engagement ───────────────────────────────────────────────────────
        Schema::create('giftora_reviews', function (Blueprint $t) {
            $t->increments('id');
            $t->string('rid', 16)->unique();
            $this->tenant($t);
            $t->string('reviewer_name', 200)->default('');
            $t->string('reviewer_ph', 30)->default('');
            $t->tinyInteger('rating')->default(5);
            $t->text('review_text')->nullable();
            $t->string('product_name', 255)->default('');
            $t->tinyInteger('status')->default(0);
            $t->dateTime('created_at')->useCurrent();
            $t->index(['profile_id', 'subdomain'], 'idx_review_store');
        });

        Schema::create('giftora_blog', function (Blueprint $t) {
            $t->increments('id');
            $t->string('bid', 16)->unique();
            $this->tenant($t);
            $t->string('title', 500)->default('');
            $t->string('tag', 200)->default('');
            $t->text('description')->nullable();
            $t->longText('content')->nullable();
            $t->string('blog_img', 300)->default('');
            $t->tinyInteger('status')->default(1);
            $t->dateTime('created_at')->useCurrent();
            $t->index(['profile_id', 'subdomain'], 'idx_blog_store');
        });

        Schema::create('giftora_enquiries', function (Blueprint $t) {
            $t->increments('id');
            $t->string('eid', 16)->unique();
            $this->tenant($t);
            $t->string('cname', 200)->default('');
            $t->string('cmobile', 30)->default('');
            $t->string('cemail', 150)->default('');
            $t->string('subject', 300)->default('');
            $t->text('message')->nullable();
            $t->string('status', 20)->default('unread');
            $t->dateTime('created_at')->useCurrent();
            $t->index(['profile_id', 'subdomain'], 'idx_enquiry_store');
        });

        Schema::create('giftora_notifications', function (Blueprint $t) {
            $t->increments('id');
            $t->string('nid', 16)->unique();
            $t->string('profile_id', 32);
            $t->string('subdomain', 100);
            $t->text('message')->nullable();
            $t->string('type', 50)->default('general');
            $t->tinyInteger('is_read')->default(0);
            $t->dateTime('created_at')->useCurrent();
            $t->index(['profile_id', 'subdomain'], 'idx_notif_store');
        });
    }

    public function down(): void
    {
        Schema::disableForeignKeyConstraints();
        foreach (self::GIFTORA as $table) {
            Schema::dropIfExists($table);
        }
        Schema::enableForeignKeyConstraints();
    }
};
