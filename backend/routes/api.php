<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CourierController;

// ── Public (no auth) ─────────────────────────────────────────────────────────
Route::post('/fetchapplogo_open',     [AdminController::class, 'fetchapplogo_open']);
Route::post('/adminlogin',            [AdminController::class, 'adminlogin']);
Route::post('/adminlogout',           [AdminController::class, 'adminlogout']);

// ── Storefront routes ────────────────────────────────────────────────────────
Route::post('/fetchhome',             [UserController::class, 'fetchhome']);
Route::post('/fetchcontactinfo',      [UserController::class, 'fetchcontactinfo']);
Route::post('/addcontactenquiry',     [UserController::class, 'addcontactenquiry']);
Route::post('/fetchuserbanners',      [UserController::class, 'fetchuserbanners']);
Route::post('/fetchuserabout',        [UserController::class, 'fetchuserabout']);
Route::post('/fetchuserterms',        [UserController::class, 'fetchuserterms']);
Route::post('/fetchuserproducts',     [UserController::class, 'fetchuserproducts']);
Route::post('/fetchproductdetail',    [UserController::class, 'fetchproductdetail']);
Route::post('/cartquote',             [UserController::class, 'cartquote']);
Route::post('/placeorder',            [UserController::class, 'placeorder']);
Route::post('/fetchuserorders',       [UserController::class, 'fetchuserorders']);
Route::post('/trackorder',            [UserController::class, 'trackorder'])->middleware('throttle:30,1');
Route::post('/fetchuserreviews',      [UserController::class, 'fetchuserreviews']);
Route::post('/addreview',             [UserController::class, 'addreview']);
Route::post('/fetchuserblog',         [UserController::class, 'fetchuserblog']);
Route::post('/fetchblogdetail',       [UserController::class, 'fetchblogdetail']);
Route::post('/fetchuserprofile',      [UserController::class, 'fetchuserprofile']);
Route::post('/updateuserprofile',     [UserController::class, 'updateuserprofile']);

// ── Admin routes (bearer token required; checked in AdminController::auth) ───
Route::post('/fetchadminprofile',     [AdminController::class, 'fetchadminprofile']);
Route::post('/updateadminprofile',    [AdminController::class, 'updateadminprofile']);

Route::post('/fetchapplogo',          [AdminController::class, 'fetchapplogo']);
Route::post('/editapplogobypid',      [AdminController::class, 'editapplogobypid']);
Route::post('/deleteapplogo',         [AdminController::class, 'deleteapplogo']);
Route::post('/editappfeviconbypid',   [AdminController::class, 'editappfeviconbypid']);
Route::post('/deleteappfevicon',      [AdminController::class, 'deleteappfevicon']);

Route::post('/myappname',             [AdminController::class, 'myappname']);
Route::post('/updateappname',         [AdminController::class, 'updateappname']);

Route::post('/fetchthemecolor',       [AdminController::class, 'fetchthemecolor']);
Route::post('/updatethemecolor',      [AdminController::class, 'updatethemecolor']);

Route::post('/admindashboard',        [AdminController::class, 'admindashboard']);

Route::post('/fetchorders',           [AdminController::class, 'fetchorders']);
Route::post('/fetchorderdetail',      [AdminController::class, 'fetchorderdetail']);
Route::post('/updateorderstatus',     [AdminController::class, 'updateorderstatus']);
Route::post('/deleteorder',           [AdminController::class, 'deleteorder']);

// Couriers, rate cards and the tracking code pool
Route::post('/fetchcouriers',          [CourierController::class, 'fetchcouriers']);
Route::post('/savecourier',            [CourierController::class, 'savecourier']);
Route::post('/deletecourier',          [CourierController::class, 'deletecourier']);
Route::post('/fetchcouriercosts',      [CourierController::class, 'fetchcouriercosts']);
Route::post('/savecouriercost',        [CourierController::class, 'savecouriercost']);
Route::post('/deletecouriercost',      [CourierController::class, 'deletecouriercost']);
Route::post('/fetchtrackinguploads',   [CourierController::class, 'fetchtrackinguploads']);
Route::post('/uploadtrackingcodes',    [CourierController::class, 'uploadtrackingcodes']);
Route::post('/deletetrackingupload',   [CourierController::class, 'deletetrackingupload']);
Route::post('/downloadtrackingupload', [CourierController::class, 'downloadtrackingupload']);
Route::post('/fetchtrackingcodes',     [CourierController::class, 'fetchtrackingcodes']);

Route::post('/fetchproducts',         [AdminController::class, 'fetchproducts']);
Route::post('/addproduct',            [AdminController::class, 'addproduct']);
Route::post('/updateproduct',         [AdminController::class, 'updateproduct']);
Route::post('/deleteproduct',         [AdminController::class, 'deleteproduct']);

Route::post('/fetchcategories',       [AdminController::class, 'fetchcategories']);
Route::post('/addcategory',           [AdminController::class, 'addcategory']);
Route::post('/updatecategory',        [AdminController::class, 'updatecategory']);
Route::post('/deletecategory',        [AdminController::class, 'deletecategory']);

Route::post('/fetchcoupons',          [AdminController::class, 'fetchcoupons']);
Route::post('/savecoupon',            [AdminController::class, 'savecoupon']);
Route::post('/deletecoupon',          [AdminController::class, 'deletecoupon']);

Route::post('/fetchcustomers',        [AdminController::class, 'fetchcustomers']);

Route::post('/fetchreviews',          [AdminController::class, 'fetchreviews']);
Route::post('/updatereviewstatus',    [AdminController::class, 'updatereviewstatus']);
Route::post('/deletereview',          [AdminController::class, 'deletereview']);

Route::post('/fetchenquiries',        [AdminController::class, 'fetchenquiries']);
Route::post('/updateenquirystatus',   [AdminController::class, 'updateenquirystatus']);
Route::post('/deleteenquiry',         [AdminController::class, 'deleteenquiry']);

Route::post('/fetchblogposts',        [AdminController::class, 'fetchblogposts']);
Route::post('/addblogpost',           [AdminController::class, 'addblogpost']);
Route::post('/updateblogpost',        [AdminController::class, 'updateblogpost']);
Route::post('/deleteblogpost',        [AdminController::class, 'deleteblogpost']);

Route::post('/fetchbusinessinfo',     [AdminController::class, 'fetchbusinessinfo']);
Route::post('/updatebusinessinfo',    [AdminController::class, 'updatebusinessinfo']);

Route::post('/fetchcompanyinfo',      [AdminController::class, 'fetchcompanyinfo']);
Route::post('/updatecompanyinfo',     [AdminController::class, 'updatecompanyinfo']);
Route::post('/fetchsociallinks',      [AdminController::class, 'fetchsociallinks']);
Route::post('/updatesociallinkinfo',  [AdminController::class, 'updatesociallinkinfo']);

Route::post('/listhomebanners',       [AdminController::class, 'listhomebanners']);
Route::post('/addhomebanner',         [AdminController::class, 'addhomebanner']);
Route::post('/updatehomebanner',      [AdminController::class, 'updatehomebanner']);
Route::post('/deletehomebanner',      [AdminController::class, 'deletehomebanner']);

Route::post('/fetchaboutus',          [AdminController::class, 'fetchaboutus']);
Route::post('/update_about',          [AdminController::class, 'update_about']);
Route::post('/deletaboutimg',         [AdminController::class, 'deletaboutimg']);

Route::post('/fetchterms',            [AdminController::class, 'fetchterms']);
Route::post('/updateterms',           [AdminController::class, 'updateterms']);

Route::post('/fetchnotifications',    [AdminController::class, 'fetchnotifications']);
Route::post('/marknotificationread',  [AdminController::class, 'marknotificationread']);
