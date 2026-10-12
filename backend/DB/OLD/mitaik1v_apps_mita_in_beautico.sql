-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: May 05, 2026 at 04:01 PM
-- Server version: 5.7.23-23
-- PHP Version: 8.1.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mitaik1v_apps_mita_in_beautico`
--

-- --------------------------------------------------------

--
-- Table structure for table `about`
--

CREATE TABLE `about` (
  `id` int(11) NOT NULL,
  `aid` varchar(255) NOT NULL,
  `profile_id` varchar(255) NOT NULL,
  `subdomain` varchar(255) NOT NULL,
  `domain` varchar(255) NOT NULL,
  `aboutus_img` mediumtext NOT NULL,
  `aboutus_img_ext` varchar(255) NOT NULL,
  `aboutus_img_size` varchar(255) NOT NULL,
  `aboutus_sdesc` mediumtext NOT NULL,
  `aboutus_desc` longtext NOT NULL,
  `whoweare_img` mediumtext NOT NULL,
  `whoweare_img_ext` varchar(255) NOT NULL,
  `whoweare_img_size` varchar(255) NOT NULL,
  `whoweare_sdesc` mediumtext NOT NULL,
  `whoweare_desc` longtext NOT NULL,
  `ourmission_img` mediumtext NOT NULL,
  `ourmission_img_ext` varchar(255) NOT NULL,
  `ourmission_img_size` varchar(255) NOT NULL,
  `ourmission_sdesc` mediumtext NOT NULL,
  `ourmission_desc` longtext NOT NULL,
  `ourvision_img` mediumtext NOT NULL,
  `ourvision_img_ext` varchar(255) NOT NULL,
  `ourvision_img_size` varchar(255) NOT NULL,
  `ourvision_sdesc` mediumtext NOT NULL,
  `ourvision_desc` longtext NOT NULL,
  `ourvalues_img` mediumtext NOT NULL,
  `ourvalues_img_ext` varchar(255) NOT NULL,
  `ourvalues_img_size` varchar(255) NOT NULL,
  `ourvalues_sdesc` mediumtext NOT NULL,
  `ourvalues_desc` longtext NOT NULL,
  `comp_img` mediumtext NOT NULL,
  `comp_img_ext` varchar(255) NOT NULL,
  `comp_img_size` varchar(255) NOT NULL,
  `comp_sdesc` mediumtext NOT NULL,
  `comp_desc` longtext NOT NULL,
  `whatwedo_img` mediumtext NOT NULL,
  `whatwedo_img_ext` varchar(255) NOT NULL,
  `whatwedo_img_size` varchar(255) NOT NULL,
  `whatwedo_sdesc` mediumtext NOT NULL,
  `whatwedo_desc` longtext NOT NULL,
  `whyus_img` mediumtext NOT NULL,
  `whyus_sdesc` mediumtext NOT NULL,
  `whyus_desc` longtext NOT NULL,
  `whyus_img_ext` varchar(255) NOT NULL,
  `whyus_img_size` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `app_logo`
--

CREATE TABLE `app_logo` (
  `id` int(11) NOT NULL,
  `lid` varchar(255) NOT NULL,
  `profile_id` varchar(255) NOT NULL,
  `subdomain` varchar(255) NOT NULL,
  `domain` varchar(255) NOT NULL,
  `logo_img` varchar(255) NOT NULL,
  `fev_img` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `app_logo`
--

INSERT INTO `app_logo` (`id`, `lid`, `profile_id`, `subdomain`, `domain`, `logo_img`, `fev_img`, `status`) VALUES
(1, '7ce72db569c36e0c', 'b0e212bb6c992785', 'studiojeisalon369.mita.in', 'studiojeisalon369.com', '1777884004_studiojeilogo.png', '1777884012_studiojeilogo-fevicon.png', '1');

-- --------------------------------------------------------

--
-- Table structure for table `app_title`
--

CREATE TABLE `app_title` (
  `id` int(11) NOT NULL,
  `aid` varchar(255) NOT NULL,
  `profile_id` varchar(255) NOT NULL,
  `subdomain` varchar(255) NOT NULL,
  `domain` varchar(255) NOT NULL,
  `apptitle` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `app_title`
--

INSERT INTO `app_title` (`id`, `aid`, `profile_id`, `subdomain`, `domain`, `apptitle`) VALUES
(1, 'b8c55b159b80d438', 'b0e212bb6c992785', 'studiojeisalon369.mita.in', 'studiojeisalon369.com', 'Studio Jei Salon');

-- --------------------------------------------------------

--
-- Table structure for table `beautico_blog`
--

CREATE TABLE `beautico_blog` (
  `id` int(11) NOT NULL,
  `bid` varchar(16) COLLATE utf8mb4_unicode_ci NOT NULL,
  `profile_id` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `subdomain` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `domain` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `title` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `tag` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `blog_img` varchar(300) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `status` tinyint(4) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `beautico_bookings`
--

CREATE TABLE `beautico_bookings` (
  `id` int(11) NOT NULL,
  `bid` varchar(16) COLLATE utf8mb4_unicode_ci NOT NULL,
  `profile_id` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `subdomain` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `domain` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `customer_name` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `customer_ph` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `customer_email` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `service_id` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `service_name` varchar(300) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `booking_date` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `booking_time` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `notes` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `beautico_business_info`
--

CREATE TABLE `beautico_business_info` (
  `profile_id` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `subdomain` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `domain` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `business_name` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `address` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `phone` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `email` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `open_time` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `close_time` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `about` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `instagram` varchar(300) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `facebook` varchar(300) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `beautico_customers`
--

CREATE TABLE `beautico_customers` (
  `id` int(11) NOT NULL,
  `profile_id` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `subdomain` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `domain` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `customer_name` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `customer_ph` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `customer_email` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `beautico_employees`
--

CREATE TABLE `beautico_employees` (
  `id` int(11) NOT NULL,
  `eid` varchar(16) NOT NULL,
  `profile_id` varchar(50) NOT NULL,
  `subdomain` varchar(100) NOT NULL DEFAULT '',
  `domain` varchar(100) NOT NULL DEFAULT '',
  `name` varchar(100) NOT NULL DEFAULT '',
  `email` varchar(150) NOT NULL DEFAULT '',
  `phone` varchar(20) NOT NULL DEFAULT '',
  `address` text,
  `id_proof` varchar(255) NOT NULL DEFAULT '',
  `profile_pic` varchar(255) NOT NULL DEFAULT '',
  `father_name` varchar(100) NOT NULL DEFAULT '',
  `mother_name` varchar(100) NOT NULL DEFAULT '',
  `emergency_contact` varchar(20) NOT NULL DEFAULT '',
  `blood_group` varchar(10) NOT NULL DEFAULT '',
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `status` varchar(20) NOT NULL DEFAULT 'active',
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `beautico_emp_customers`
--

CREATE TABLE `beautico_emp_customers` (
  `id` int(11) NOT NULL,
  `ecid` varchar(16) NOT NULL,
  `eid` varchar(16) NOT NULL,
  `profile_id` varchar(50) NOT NULL,
  `subdomain` varchar(100) NOT NULL DEFAULT '',
  `customer_name` varchar(100) NOT NULL DEFAULT '',
  `customer_phone` varchar(20) NOT NULL DEFAULT '',
  `customer_email` varchar(150) NOT NULL DEFAULT '',
  `notes` text,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `beautico_emp_ratings`
--

CREATE TABLE `beautico_emp_ratings` (
  `id` int(11) NOT NULL,
  `rid` varchar(16) NOT NULL,
  `eid` varchar(16) NOT NULL,
  `ecid` varchar(16) NOT NULL,
  `profile_id` varchar(50) NOT NULL,
  `subdomain` varchar(100) NOT NULL DEFAULT '',
  `q1` tinyint(4) NOT NULL DEFAULT '0',
  `q2` tinyint(4) NOT NULL DEFAULT '0',
  `q3` tinyint(4) NOT NULL DEFAULT '0',
  `q4` tinyint(4) NOT NULL DEFAULT '0',
  `q5` tinyint(4) NOT NULL DEFAULT '0',
  `overall` decimal(3,1) NOT NULL DEFAULT '0.0',
  `remarks` text,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `beautico_enquiries`
--

CREATE TABLE `beautico_enquiries` (
  `id` int(11) NOT NULL,
  `eid` varchar(16) COLLATE utf8mb4_unicode_ci NOT NULL,
  `profile_id` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `subdomain` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `domain` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `cname` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `cmobile` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `cemail` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `subject` varchar(300) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'unread',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `beautico_notifications`
--

CREATE TABLE `beautico_notifications` (
  `id` int(11) NOT NULL,
  `nid` varchar(16) COLLATE utf8mb4_unicode_ci NOT NULL,
  `profile_id` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `subdomain` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'general',
  `is_read` tinyint(4) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `beautico_reviews`
--

CREATE TABLE `beautico_reviews` (
  `id` int(11) NOT NULL,
  `rid` varchar(16) COLLATE utf8mb4_unicode_ci NOT NULL,
  `profile_id` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `subdomain` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `domain` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `reviewer_name` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `reviewer_ph` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `rating` tinyint(4) NOT NULL DEFAULT '5',
  `review_text` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `service_name` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `status` tinyint(4) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `beautico_services`
--

CREATE TABLE `beautico_services` (
  `id` int(11) NOT NULL,
  `sid` varchar(255) NOT NULL DEFAULT '',
  `profile_id` varchar(255) NOT NULL DEFAULT '',
  `subdomain` varchar(255) NOT NULL DEFAULT '',
  `domain` varchar(255) NOT NULL DEFAULT '',
  `service_name` varchar(255) NOT NULL DEFAULT '',
  `category` varchar(255) NOT NULL DEFAULT '',
  `gender` varchar(50) NOT NULL DEFAULT 'Both',
  `description` text,
  `price` varchar(100) NOT NULL DEFAULT '',
  `duration` varchar(100) NOT NULL DEFAULT '',
  `service_img` varchar(255) NOT NULL DEFAULT '',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `beautico_service_categories`
--

CREATE TABLE `beautico_service_categories` (
  `id` int(11) NOT NULL,
  `cat_id` varchar(255) NOT NULL DEFAULT '',
  `profile_id` varchar(255) NOT NULL DEFAULT '',
  `subdomain` varchar(255) NOT NULL DEFAULT '',
  `domain` varchar(255) NOT NULL DEFAULT '',
  `cat_name` varchar(255) NOT NULL DEFAULT '',
  `gender` varchar(50) NOT NULL DEFAULT 'Both',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `beautico_terms`
--

CREATE TABLE `beautico_terms` (
  `id` int(11) NOT NULL,
  `profile_id` varchar(255) NOT NULL,
  `subdomain` varchar(255) NOT NULL,
  `domain` varchar(255) NOT NULL,
  `termtype` varchar(50) NOT NULL,
  `terms_title` varchar(255) NOT NULL DEFAULT '',
  `terms_desc` longtext NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `beautico_theme`
--

CREATE TABLE `beautico_theme` (
  `id` int(11) NOT NULL,
  `profile_id` varchar(50) NOT NULL,
  `subdomain` varchar(100) NOT NULL,
  `domain` varchar(100) DEFAULT '',
  `color` varchar(10) NOT NULL DEFAULT '#6C3CE1',
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `beautico_trending`
--

CREATE TABLE `beautico_trending` (
  `id` int(11) NOT NULL,
  `tid` varchar(16) COLLATE utf8mb4_unicode_ci NOT NULL,
  `profile_id` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `subdomain` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `domain` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `style_name` varchar(300) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `style_cat` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `style_tag` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `style_img` varchar(300) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `status` tinyint(4) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `beautico_youtube`
--

CREATE TABLE `beautico_youtube` (
  `id` int(11) NOT NULL,
  `vid` varchar(16) NOT NULL,
  `profile_id` varchar(50) NOT NULL,
  `subdomain` varchar(100) NOT NULL DEFAULT '',
  `domain` varchar(100) NOT NULL DEFAULT '',
  `youtube_url` varchar(500) NOT NULL,
  `title` varchar(255) NOT NULL DEFAULT '',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `company_info`
--

CREATE TABLE `company_info` (
  `mid` int(11) NOT NULL,
  `cid` varchar(255) NOT NULL,
  `profile_id` varchar(255) NOT NULL,
  `subdomain` varchar(255) NOT NULL,
  `domain` varchar(255) NOT NULL,
  `companyname` varchar(255) NOT NULL,
  `phone_one` varchar(255) NOT NULL,
  `phone_two` varchar(255) NOT NULL,
  `email_one` varchar(255) NOT NULL,
  `email_two` varchar(255) NOT NULL,
  `house_no` varchar(255) NOT NULL,
  `area` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `pincode` varchar(255) NOT NULL,
  `district` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `ws_id` int(11) NOT NULL,
  `cid` varchar(255) NOT NULL,
  `profile_id` varchar(255) NOT NULL,
  `subdomain` varchar(255) NOT NULL,
  `domain` varchar(255) NOT NULL,
  `company` varchar(255) NOT NULL,
  `cname` varchar(255) NOT NULL,
  `cmobile` varchar(255) NOT NULL,
  `cmobiletwo` varchar(255) NOT NULL,
  `cemail` varchar(255) NOT NULL,
  `cemailtwo` varchar(255) NOT NULL,
  `chouseno` varchar(255) NOT NULL,
  `caddress` mediumtext NOT NULL,
  `ccity` varchar(255) NOT NULL,
  `cdistrict` varchar(255) NOT NULL,
  `cstate` varchar(255) NOT NULL,
  `ccountry` varchar(255) NOT NULL,
  `cpincode` varchar(255) NOT NULL,
  `comments` longtext NOT NULL,
  `status` varchar(255) NOT NULL,
  `sday` varchar(255) NOT NULL,
  `smonth` varchar(255) NOT NULL,
  `syear` varchar(255) NOT NULL,
  `sdate` varchar(255) NOT NULL,
  `sdatestamp` varchar(255) NOT NULL,
  `datetime` varchar(255) NOT NULL,
  `subby` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `dummy`
--

CREATE TABLE `dummy` (
  `id` int(11) NOT NULL,
  `did` varchar(255) NOT NULL,
  `app_id` varchar(255) NOT NULL,
  `apptitle` varchar(255) NOT NULL,
  `logo_img` mediumtext NOT NULL,
  `fev_img` mediumtext NOT NULL,
  `theme_color` varchar(255) NOT NULL,
  `ser_title` mediumtext NOT NULL,
  `ser_meta_title` mediumtext NOT NULL,
  `ser_meta_desc` longtext NOT NULL,
  `ser_img` mediumtext NOT NULL,
  `ser_shortdesc` longtext NOT NULL,
  `ser_desc` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `enquries`
--

CREATE TABLE `enquries` (
  `ws_id` int(11) NOT NULL,
  `eid` varchar(255) NOT NULL,
  `subdomain` varchar(255) NOT NULL,
  `domain` varchar(255) NOT NULL,
  `cname` varchar(255) NOT NULL,
  `cmobile` varchar(255) NOT NULL,
  `subject` mediumtext NOT NULL,
  `comments` longtext NOT NULL,
  `status` varchar(255) NOT NULL,
  `sday` varchar(255) NOT NULL,
  `smonth` varchar(255) NOT NULL,
  `syear` varchar(255) NOT NULL,
  `sdate` varchar(255) NOT NULL,
  `sdatestamp` varchar(255) NOT NULL,
  `datetime` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `leads`
--

CREATE TABLE `leads` (
  `ws_id` int(11) NOT NULL,
  `lid` varchar(255) NOT NULL,
  `profile_id` varchar(255) NOT NULL,
  `subdomain` varchar(255) NOT NULL,
  `domain` varchar(255) NOT NULL,
  `company` varchar(255) NOT NULL,
  `cname` varchar(255) NOT NULL,
  `cmobile` varchar(255) NOT NULL,
  `cmobiletwo` varchar(255) NOT NULL,
  `cemail` varchar(255) NOT NULL,
  `cemailtwo` varchar(255) NOT NULL,
  `chouseno` varchar(255) NOT NULL,
  `caddress` mediumtext NOT NULL,
  `ccity` varchar(255) NOT NULL,
  `cdistrict` varchar(255) NOT NULL,
  `cstate` varchar(255) NOT NULL,
  `ccountry` varchar(255) NOT NULL,
  `cpincode` varchar(255) NOT NULL,
  `comments` longtext NOT NULL,
  `status` varchar(255) NOT NULL,
  `sday` varchar(255) NOT NULL,
  `smonth` varchar(255) NOT NULL,
  `syear` varchar(255) NOT NULL,
  `sdate` varchar(255) NOT NULL,
  `sdatestamp` varchar(255) NOT NULL,
  `datetime` varchar(255) NOT NULL,
  `subby` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `id` int(11) NOT NULL,
  `sid` varchar(255) NOT NULL,
  `profile_id` varchar(255) NOT NULL,
  `subdomain` varchar(255) NOT NULL,
  `domain` varchar(255) NOT NULL,
  `stitle` varchar(255) NOT NULL,
  `smeta_title` varchar(255) NOT NULL,
  `smeta_desc` longtext NOT NULL,
  `simg` varchar(255) NOT NULL,
  `sshortdesc` longtext NOT NULL,
  `sdesc` longtext NOT NULL,
  `status` varchar(255) NOT NULL,
  `total_views` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `social_links`
--

CREATE TABLE `social_links` (
  `mid` int(11) NOT NULL,
  `sid` varchar(255) NOT NULL,
  `profile_id` varchar(255) NOT NULL,
  `subdomain` varchar(255) NOT NULL,
  `domain` varchar(255) NOT NULL,
  `fb` mediumtext NOT NULL,
  `insta` mediumtext NOT NULL,
  `linked` mediumtext NOT NULL,
  `status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `theme`
--

CREATE TABLE `theme` (
  `id` int(11) NOT NULL,
  `tid` varchar(255) NOT NULL,
  `profile_id` varchar(255) NOT NULL,
  `subdomain` varchar(255) NOT NULL,
  `domain` varchar(255) NOT NULL,
  `themeid` varchar(255) NOT NULL,
  `color` varchar(255) NOT NULL,
  `template` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `web_banner`
--

CREATE TABLE `web_banner` (
  `id` int(11) NOT NULL,
  `bid` varchar(255) NOT NULL,
  `profile_id` varchar(255) NOT NULL,
  `subdomain` varchar(255) NOT NULL,
  `domain` varchar(255) NOT NULL,
  `banner_order` varchar(255) NOT NULL,
  `banner_title` varchar(255) NOT NULL,
  `banner_img` varchar(255) NOT NULL,
  `banner_img_ext` varchar(255) NOT NULL,
  `banner_img_size` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `about`
--
ALTER TABLE `about`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `app_logo`
--
ALTER TABLE `app_logo`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `app_title`
--
ALTER TABLE `app_title`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `beautico_blog`
--
ALTER TABLE `beautico_blog`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uk_bid` (`bid`),
  ADD KEY `idx_pid_sub` (`profile_id`,`subdomain`);

--
-- Indexes for table `beautico_bookings`
--
ALTER TABLE `beautico_bookings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uk_bid` (`bid`),
  ADD KEY `idx_pid_sub` (`profile_id`,`subdomain`);

--
-- Indexes for table `beautico_business_info`
--
ALTER TABLE `beautico_business_info`
  ADD PRIMARY KEY (`profile_id`,`subdomain`);

--
-- Indexes for table `beautico_customers`
--
ALTER TABLE `beautico_customers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_pid_sub` (`profile_id`,`subdomain`),
  ADD KEY `idx_ph` (`customer_ph`);

--
-- Indexes for table `beautico_employees`
--
ALTER TABLE `beautico_employees`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `eid` (`eid`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `beautico_emp_customers`
--
ALTER TABLE `beautico_emp_customers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `ecid` (`ecid`),
  ADD KEY `idx_eid` (`eid`);

--
-- Indexes for table `beautico_emp_ratings`
--
ALTER TABLE `beautico_emp_ratings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `rid` (`rid`),
  ADD KEY `idx_eid` (`eid`),
  ADD KEY `idx_ecid` (`ecid`);

--
-- Indexes for table `beautico_enquiries`
--
ALTER TABLE `beautico_enquiries`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uk_eid` (`eid`),
  ADD KEY `idx_pid_sub` (`profile_id`,`subdomain`);

--
-- Indexes for table `beautico_notifications`
--
ALTER TABLE `beautico_notifications`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uk_nid` (`nid`),
  ADD KEY `idx_pid_sub` (`profile_id`,`subdomain`);

--
-- Indexes for table `beautico_reviews`
--
ALTER TABLE `beautico_reviews`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uk_rid` (`rid`),
  ADD KEY `idx_pid_sub` (`profile_id`,`subdomain`);

--
-- Indexes for table `beautico_services`
--
ALTER TABLE `beautico_services`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `beautico_service_categories`
--
ALTER TABLE `beautico_service_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `beautico_terms`
--
ALTER TABLE `beautico_terms`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_terms` (`profile_id`,`subdomain`,`termtype`);

--
-- Indexes for table `beautico_theme`
--
ALTER TABLE `beautico_theme`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uniq_vendor` (`profile_id`,`subdomain`);

--
-- Indexes for table `beautico_trending`
--
ALTER TABLE `beautico_trending`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uk_tid` (`tid`),
  ADD KEY `idx_pid_sub` (`profile_id`,`subdomain`);

--
-- Indexes for table `beautico_youtube`
--
ALTER TABLE `beautico_youtube`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `vid` (`vid`);

--
-- Indexes for table `company_info`
--
ALTER TABLE `company_info`
  ADD PRIMARY KEY (`mid`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`ws_id`);

--
-- Indexes for table `dummy`
--
ALTER TABLE `dummy`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `enquries`
--
ALTER TABLE `enquries`
  ADD PRIMARY KEY (`ws_id`);

--
-- Indexes for table `leads`
--
ALTER TABLE `leads`
  ADD PRIMARY KEY (`ws_id`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `social_links`
--
ALTER TABLE `social_links`
  ADD PRIMARY KEY (`mid`);

--
-- Indexes for table `theme`
--
ALTER TABLE `theme`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `web_banner`
--
ALTER TABLE `web_banner`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `about`
--
ALTER TABLE `about`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `app_logo`
--
ALTER TABLE `app_logo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `app_title`
--
ALTER TABLE `app_title`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `beautico_blog`
--
ALTER TABLE `beautico_blog`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `beautico_bookings`
--
ALTER TABLE `beautico_bookings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `beautico_customers`
--
ALTER TABLE `beautico_customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `beautico_employees`
--
ALTER TABLE `beautico_employees`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `beautico_emp_customers`
--
ALTER TABLE `beautico_emp_customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `beautico_emp_ratings`
--
ALTER TABLE `beautico_emp_ratings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `beautico_enquiries`
--
ALTER TABLE `beautico_enquiries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `beautico_notifications`
--
ALTER TABLE `beautico_notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `beautico_reviews`
--
ALTER TABLE `beautico_reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `beautico_services`
--
ALTER TABLE `beautico_services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `beautico_service_categories`
--
ALTER TABLE `beautico_service_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `beautico_terms`
--
ALTER TABLE `beautico_terms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `beautico_theme`
--
ALTER TABLE `beautico_theme`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `beautico_trending`
--
ALTER TABLE `beautico_trending`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `beautico_youtube`
--
ALTER TABLE `beautico_youtube`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `company_info`
--
ALTER TABLE `company_info`
  MODIFY `mid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `ws_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `dummy`
--
ALTER TABLE `dummy`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `enquries`
--
ALTER TABLE `enquries`
  MODIFY `ws_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `leads`
--
ALTER TABLE `leads`
  MODIFY `ws_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `social_links`
--
ALTER TABLE `social_links`
  MODIFY `mid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `theme`
--
ALTER TABLE `theme`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `web_banner`
--
ALTER TABLE `web_banner`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
