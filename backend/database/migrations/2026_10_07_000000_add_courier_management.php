<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Courier management and delivery tracking for orders.
 * Additive only: existing tables keep their data.
 */
return new class extends Migration
{
    private function tenant(Blueprint $t): void
    {
        $t->string('profile_id', 32);
        $t->string('subdomain', 100);
        $t->string('domain', 150)->default('');
    }

    public function up(): void
    {
        // ── Couriers ─────────────────────────────────────────────────────────
        Schema::create('giftora_couriers', function (Blueprint $t) {
            $t->increments('id');
            $t->string('cid', 16)->unique();
            $this->tenant($t);
            $t->string('name', 150);
            $t->string('contact_person', 150)->default('');
            $t->string('contact_number', 50)->default('');
            $t->string('logo_img', 255)->default('');
            // Optional link to the courier's own tracking page; {code} is replaced by the tracking code.
            $t->string('tracking_url', 500)->default('');
            $t->tinyInteger('status')->default(1);
            $t->dateTime('created_at')->useCurrent();
            $t->index(['profile_id', 'subdomain'], 'idx_courier_store');
        });

        // Rate card: one row per courier and weight bracket.
        Schema::create('giftora_courier_costs', function (Blueprint $t) {
            $t->increments('id');
            $t->string('ccid', 16)->unique();
            $this->tenant($t);
            $t->string('courier_id', 16);
            $t->unsignedInteger('avg_weight_grams');
            $t->decimal('home_rate', 10, 2)->default(0);    // per kg, delivery inside the store's own state
            $t->decimal('other_rate', 10, 2)->default(0);   // per kg, delivery to any other state
            $t->dateTime('created_at')->useCurrent();
            $t->foreign('courier_id')->references('cid')->on('giftora_couriers')->cascadeOnDelete();
        });

        // ── Tracking code pool ───────────────────────────────────────────────
        Schema::create('giftora_tracking_uploads', function (Blueprint $t) {
            $t->increments('id');
            $t->string('uid', 16)->unique();
            $this->tenant($t);
            $t->string('courier_id', 16);
            $t->string('title', 255);
            $t->string('file_name', 255)->default('');
            $t->string('file_path', 255)->default('');
            $t->unsignedInteger('total_codes')->default(0);
            $t->dateTime('created_at')->useCurrent();
            $t->foreign('courier_id')->references('cid')->on('giftora_couriers')->cascadeOnDelete();
        });

        Schema::create('giftora_tracking_codes', function (Blueprint $t) {
            $t->increments('id');
            $this->tenant($t);
            $t->string('upload_id', 16);
            $t->string('courier_id', 16);
            $t->string('tracking_code', 100);
            // Filled in when the code is given to an order; empty means "not used".
            $t->string('oid', 16)->nullable();
            $t->string('order_no', 30)->default('');
            $t->string('customer', 200)->default('');
            $t->date('order_date')->nullable();
            $t->dateTime('created_at')->useCurrent();
            $t->unique(['profile_id', 'subdomain', 'tracking_code'], 'uq_tracking_code');
            $t->foreign('upload_id')->references('uid')->on('giftora_tracking_uploads')->cascadeOnDelete();
            $t->foreign('courier_id')->references('cid')->on('giftora_couriers')->cascadeOnDelete();
            $t->foreign('oid')->references('oid')->on('giftora_orders')->nullOnDelete();
        });

        // ── Orders: courier assignment and delivery progress ─────────────────
        Schema::table('giftora_orders', function (Blueprint $t) {
            $t->string('courier_id', 16)->nullable()->after('status');
            $t->string('courier_name', 150)->default('')->after('courier_id');   // kept even if the courier is later deleted
            $t->string('tracking_code', 100)->default('')->after('courier_name');
            $t->string('delivery_status', 255)->default('')->after('tracking_code');
            $t->dateTime('shipped_at')->nullable()->after('delivery_status');
            $t->dateTime('delivered_at')->nullable()->after('shipped_at');
            $t->dateTime('cancelled_at')->nullable()->after('delivered_at');
            $t->foreign('courier_id')->references('cid')->on('giftora_couriers')->nullOnDelete();
        });

        // History of every status / courier change (the order timeline).
        Schema::create('giftora_order_updates', function (Blueprint $t) {
            $t->increments('id');
            $t->string('oid', 16);
            $t->string('admin_id', 16)->nullable();
            $t->string('admin_name', 150)->default('');
            $t->string('status', 30)->default('');
            $t->string('delivery_status', 255)->default('');
            $t->string('courier_name', 150)->default('');
            $t->string('tracking_code', 100)->default('');
            $t->text('note')->nullable();                    // internal, never shown to the customer
            $t->dateTime('created_at')->useCurrent();
            $t->foreign('oid')->references('oid')->on('giftora_orders')->cascadeOnDelete();
        });

        // Parcel weight used with the courier rate card.
        Schema::table('giftora_products', function (Blueprint $t) {
            $t->unsignedInteger('weight_grams')->default(0)->after('stock');
        });
    }

    public function down(): void
    {
        Schema::table('giftora_products', fn (Blueprint $t) => $t->dropColumn('weight_grams'));
        Schema::dropIfExists('giftora_order_updates');
        Schema::table('giftora_orders', function (Blueprint $t) {
            $t->dropForeign(['courier_id']);
            $t->dropColumn(['courier_id', 'courier_name', 'tracking_code', 'delivery_status', 'shipped_at', 'delivered_at', 'cancelled_at']);
        });
        Schema::dropIfExists('giftora_tracking_codes');
        Schema::dropIfExists('giftora_tracking_uploads');
        Schema::dropIfExists('giftora_courier_costs');
        Schema::dropIfExists('giftora_couriers');
    }
};
