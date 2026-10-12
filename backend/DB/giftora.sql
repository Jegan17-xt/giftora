
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `Giftora` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */;

USE `Giftora`;
DROP TABLE IF EXISTS `about`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `about` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `aid` varchar(16) NOT NULL,
  `profile_id` varchar(32) NOT NULL,
  `subdomain` varchar(100) NOT NULL,
  `domain` varchar(150) NOT NULL DEFAULT '',
  `aboutus_img` varchar(255) NOT NULL DEFAULT '',
  `aboutus_img_ext` varchar(10) NOT NULL DEFAULT '',
  `aboutus_img_size` varchar(20) NOT NULL DEFAULT '',
  `aboutus_sdesc` text DEFAULT NULL,
  `aboutus_desc` longtext DEFAULT NULL,
  `whoweare_img` varchar(255) NOT NULL DEFAULT '',
  `whoweare_img_ext` varchar(10) NOT NULL DEFAULT '',
  `whoweare_img_size` varchar(20) NOT NULL DEFAULT '',
  `whoweare_sdesc` text DEFAULT NULL,
  `whoweare_desc` longtext DEFAULT NULL,
  `ourmission_img` varchar(255) NOT NULL DEFAULT '',
  `ourmission_img_ext` varchar(10) NOT NULL DEFAULT '',
  `ourmission_img_size` varchar(20) NOT NULL DEFAULT '',
  `ourmission_sdesc` text DEFAULT NULL,
  `ourmission_desc` longtext DEFAULT NULL,
  `ourvision_img` varchar(255) NOT NULL DEFAULT '',
  `ourvision_img_ext` varchar(10) NOT NULL DEFAULT '',
  `ourvision_img_size` varchar(20) NOT NULL DEFAULT '',
  `ourvision_sdesc` text DEFAULT NULL,
  `ourvision_desc` longtext DEFAULT NULL,
  `ourvalues_img` varchar(255) NOT NULL DEFAULT '',
  `ourvalues_img_ext` varchar(10) NOT NULL DEFAULT '',
  `ourvalues_img_size` varchar(20) NOT NULL DEFAULT '',
  `ourvalues_sdesc` text DEFAULT NULL,
  `ourvalues_desc` longtext DEFAULT NULL,
  `comp_img` varchar(255) NOT NULL DEFAULT '',
  `comp_img_ext` varchar(10) NOT NULL DEFAULT '',
  `comp_img_size` varchar(20) NOT NULL DEFAULT '',
  `comp_sdesc` text DEFAULT NULL,
  `comp_desc` longtext DEFAULT NULL,
  `whatwedo_img` varchar(255) NOT NULL DEFAULT '',
  `whatwedo_img_ext` varchar(10) NOT NULL DEFAULT '',
  `whatwedo_img_size` varchar(20) NOT NULL DEFAULT '',
  `whatwedo_sdesc` text DEFAULT NULL,
  `whatwedo_desc` longtext DEFAULT NULL,
  `whyus_img` varchar(255) NOT NULL DEFAULT '',
  `whyus_img_ext` varchar(10) NOT NULL DEFAULT '',
  `whyus_img_size` varchar(20) NOT NULL DEFAULT '',
  `whyus_sdesc` text DEFAULT NULL,
  `whyus_desc` longtext DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_about_store` (`profile_id`,`subdomain`),
  UNIQUE KEY `about_aid_unique` (`aid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `about` WRITE;
/*!40000 ALTER TABLE `about` DISABLE KEYS */;
INSERT INTO `about` VALUES (1,'b063768262764aca','gft1a2b3c4d5e6f7','store','','about-us.jpg','jpg','','Gifting made simple, personal and joyful.','<p>We started as a small gift studio with one belief: a thoughtful gift can make someone\'s day. Today we deliver gift hampers, greeting cards, surprise boxes, flowers and personalised keepsakes for every occasion.</p>','about-who.jpg','jpg','','A team of gift curators, florists and packers.','<p>Every order is checked, packed and sealed by hand by people who care about how it looks when it is opened.</p>','','','','To help people celebrate each other, wherever they are.','<p>We make it easy to send something meaningful, on time, at a fair price.</p>','','','','To be the most loved gifting store for every celebration.','<p>We want every customer to feel confident that their gift will arrive beautifully and on time.</p>','','','','Care, honesty and attention to detail.','<p>We pack with care, describe our products honestly and fix problems quickly when they happen.</p>','','','','An online gifting store serving customers across India.','<p>We work with local makers, florists and chocolatiers to bring you a carefully chosen range of gifts.</p>','','','','Gifts, cards, flowers and surprises, delivered.','<p>Browse by category, add a gift message, pick a delivery date and we take care of the rest.</p>','','','','Hand-packed gifts, careful delivery and friendly support.','<p>Quality-checked products, gift-ready packaging, order tracking and a support team that replies.</p>');
/*!40000 ALTER TABLE `about` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `app_logo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `app_logo` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `lid` varchar(16) NOT NULL,
  `profile_id` varchar(32) NOT NULL,
  `subdomain` varchar(100) NOT NULL,
  `domain` varchar(150) NOT NULL DEFAULT '',
  `logo_img` varchar(255) NOT NULL DEFAULT '',
  `fev_img` varchar(255) NOT NULL DEFAULT '',
  `status` varchar(10) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_app_logo_store` (`profile_id`,`subdomain`),
  UNIQUE KEY `app_logo_lid_unique` (`lid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `app_logo` WRITE;
/*!40000 ALTER TABLE `app_logo` DISABLE KEYS */;
INSERT INTO `app_logo` VALUES (1,'1d0c27e1600ca671','gft1a2b3c4d5e6f7','store','','giftora-logo.png','giftora-favicon.png','1');
/*!40000 ALTER TABLE `app_logo` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `app_title`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `app_title` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `aid` varchar(16) NOT NULL,
  `profile_id` varchar(32) NOT NULL,
  `subdomain` varchar(100) NOT NULL,
  `domain` varchar(150) NOT NULL DEFAULT '',
  `apptitle` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_app_title_store` (`profile_id`,`subdomain`),
  UNIQUE KEY `app_title_aid_unique` (`aid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `app_title` WRITE;
/*!40000 ALTER TABLE `app_title` DISABLE KEYS */;
INSERT INTO `app_title` VALUES (1,'7f0aca6f6db3ff16','gft1a2b3c4d5e6f7','store','','Giftora');
/*!40000 ALTER TABLE `app_title` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `cache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `cache` WRITE;
/*!40000 ALTER TABLE `cache` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `cache_locks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `cache_locks` WRITE;
/*!40000 ALTER TABLE `cache_locks` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache_locks` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `company_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `company_info` (
  `mid` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `cid` varchar(16) NOT NULL,
  `profile_id` varchar(32) NOT NULL,
  `subdomain` varchar(100) NOT NULL,
  `domain` varchar(150) NOT NULL DEFAULT '',
  `companyname` varchar(255) NOT NULL DEFAULT '',
  `phone_one` varchar(255) NOT NULL DEFAULT '',
  `phone_two` varchar(255) NOT NULL DEFAULT '',
  `email_one` varchar(255) NOT NULL DEFAULT '',
  `email_two` varchar(255) NOT NULL DEFAULT '',
  `house_no` varchar(255) NOT NULL DEFAULT '',
  `area` varchar(255) NOT NULL DEFAULT '',
  `city` varchar(255) NOT NULL DEFAULT '',
  `pincode` varchar(255) NOT NULL DEFAULT '',
  `district` varchar(255) NOT NULL DEFAULT '',
  `state` varchar(255) NOT NULL DEFAULT '',
  `country` varchar(255) NOT NULL DEFAULT '',
  `status` varchar(10) NOT NULL DEFAULT '1',
  PRIMARY KEY (`mid`),
  UNIQUE KEY `uq_company_store` (`profile_id`,`subdomain`),
  UNIQUE KEY `company_info_cid_unique` (`cid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `company_info` WRITE;
/*!40000 ALTER TABLE `company_info` DISABLE KEYS */;
INSERT INTO `company_info` VALUES (1,'779beb2db2dbd584','gft1a2b3c4d5e6f7','store','','Giftora','+91 98765 43210','','hello@giftora.in','support@giftora.in','24','Gift Street, T. Nagar','Chennai','600017','Chennai','Tamil Nadu','India','1');
/*!40000 ALTER TABLE `company_info` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `failed_jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `giftora_admin_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `giftora_admin_tokens` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `aid` varchar(16) NOT NULL,
  `token_hash` varchar(64) NOT NULL,
  `expires_at` datetime NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `giftora_admin_tokens_token_hash_unique` (`token_hash`),
  KEY `giftora_admin_tokens_aid_foreign` (`aid`),
  CONSTRAINT `giftora_admin_tokens_aid_foreign` FOREIGN KEY (`aid`) REFERENCES `giftora_admins` (`aid`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `giftora_admin_tokens` WRITE;
/*!40000 ALTER TABLE `giftora_admin_tokens` DISABLE KEYS */;
INSERT INTO `giftora_admin_tokens` VALUES (1,'b60b51c4f14280b2','2080c6072e9358eb94bac6cf99e1066c0ae9bdfe5a9151f407953a6662e32186','2026-10-13 16:31:54','2026-10-06 16:31:54'),(2,'b60b51c4f14280b2','c8e1f42d563277aa06915b47cae87107e13ec3e0636f54d6a693a4c0d14283c7','2026-10-13 16:36:08','2026-10-06 16:36:08'),(3,'b60b51c4f14280b2','a025631e79a756b1ba21d48b15d61f3b9166884e96610594a7e507ece6c76314','2026-10-13 16:37:10','2026-10-06 16:37:10'),(4,'b60b51c4f14280b2','cbc44bbdded8cf14329022287e07b14bcadcd717ee098c2b62fd5d418db42364','2026-10-13 16:41:17','2026-10-06 16:41:17'),(5,'b60b51c4f14280b2','465c149f7e28af7bfb518c657d118369024097e292af97d8414f71ffd82c1486','2026-10-13 16:43:00','2026-10-06 16:43:00'),(6,'b60b51c4f14280b2','e8fc1165dc521b803d427bb5b3cf9723b0baad90387536e0690c6e7937adc94f','2026-10-13 16:43:16','2026-10-06 16:43:16'),(7,'b60b51c4f14280b2','602a7007e2a82751e342465f1780379d42da51704806c71daf82f5089a332558','2026-10-13 16:44:20','2026-10-06 16:44:20'),(8,'b60b51c4f14280b2','eb1e258dca1ac7ae061e3050bdbb2f6f4068e690685c60ec598716a39cb3c084','2026-10-13 16:48:42','2026-10-06 16:48:42'),(9,'b60b51c4f14280b2','a4a07b18050fccc7e173656728fc56e73f9d4228a92cec0cdcc36830844ef800','2026-10-13 16:50:26','2026-10-06 16:50:26'),(10,'b60b51c4f14280b2','9d2ad9434654301928bd09f6786ac58048738ec7a35d448958a3f39089cd3575','2026-10-13 16:50:41','2026-10-06 16:50:41'),(11,'b60b51c4f14280b2','f57f2619411fe99c9ddaf338392d0e1ff564b81e618b2b2775bd9a0b57959359','2026-10-14 09:50:06','2026-10-07 09:50:06'),(12,'b60b51c4f14280b2','d1852825eeec1b1969cb1f38edb7ee59d6a49ad41f10d66be32f56a2efb84e79','2026-10-14 09:53:44','2026-10-07 09:53:44'),(13,'b60b51c4f14280b2','99b6fde65c6914d0d447c2e4996430eaee63d50a5b9fa1bd1b01cb3f59899615','2026-10-14 09:56:44','2026-10-07 09:56:44'),(14,'b60b51c4f14280b2','b86d7ba6964c2e7120c36796dd4fafdde53c84a480c4688d4839fe3d36a13879','2026-10-14 09:58:03','2026-10-07 09:58:03'),(15,'b60b51c4f14280b2','1a60507929f2871358be520efbf73f682e6f3f9e8a94d1b989f7cdaf9fda4497','2026-10-14 09:58:30','2026-10-07 09:58:30'),(16,'b60b51c4f14280b2','d3cfa90cda4a7b7082f7ae5deeb0c491b1abbbbaff6895f1136a633a2da01176','2026-10-14 09:58:39','2026-10-07 09:58:39'),(17,'b60b51c4f14280b2','8b3290c28df3adb6ef2767b01c753a3b29ff88545da1cb0d6eac9e65352fadb8','2026-10-14 10:03:35','2026-10-07 10:03:35'),(18,'b60b51c4f14280b2','653072edc65cb30eeb7924fc31e32dcf9088989f64e6df67b31aee0399eae53e','2026-10-14 10:05:20','2026-10-07 10:05:20'),(19,'b60b51c4f14280b2','17e3b1fb81314e694f1a71c73a111884d06d80c84657d56926e796b1413c499d','2026-10-14 10:05:31','2026-10-07 10:05:31'),(20,'b60b51c4f14280b2','b8e82f6e4e54a8def6cdfa7228706ad86409f5a654a54f190e707c40c25b3438','2026-10-14 10:05:32','2026-10-07 10:05:32');
/*!40000 ALTER TABLE `giftora_admin_tokens` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `giftora_admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `giftora_admins` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `aid` varchar(16) NOT NULL,
  `profile_id` varchar(32) NOT NULL,
  `subdomain` varchar(100) NOT NULL,
  `domain` varchar(150) NOT NULL DEFAULT '',
  `name` varchar(150) NOT NULL DEFAULT '',
  `email` varchar(150) NOT NULL,
  `password` varchar(255) NOT NULL,
  `status` varchar(20) NOT NULL DEFAULT 'active',
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `giftora_admins_aid_unique` (`aid`),
  UNIQUE KEY `giftora_admins_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `giftora_admins` WRITE;
/*!40000 ALTER TABLE `giftora_admins` DISABLE KEYS */;
INSERT INTO `giftora_admins` VALUES (1,'b60b51c4f14280b2','gft1a2b3c4d5e6f7','store','','Store Admin','admin@giftora.in','$2y$12$gF.Akd/2kMHAZoD5Z9FksOr7V5jkvb7wVTbcNqMuvROT.wr1Dw7RO','active','2026-10-06 16:26:37');
/*!40000 ALTER TABLE `giftora_admins` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `giftora_blog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `giftora_blog` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `bid` varchar(16) NOT NULL,
  `profile_id` varchar(32) NOT NULL,
  `subdomain` varchar(100) NOT NULL,
  `domain` varchar(150) NOT NULL DEFAULT '',
  `title` varchar(500) NOT NULL DEFAULT '',
  `tag` varchar(200) NOT NULL DEFAULT '',
  `description` text DEFAULT NULL,
  `content` longtext DEFAULT NULL,
  `blog_img` varchar(300) NOT NULL DEFAULT '',
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `giftora_blog_bid_unique` (`bid`),
  KEY `idx_blog_store` (`profile_id`,`subdomain`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `giftora_blog` WRITE;
/*!40000 ALTER TABLE `giftora_blog` DISABLE KEYS */;
INSERT INTO `giftora_blog` VALUES (1,'48a122e74c13da95','gft1a2b3c4d5e6f7','store','','How to Choose the Perfect Gift for Any Occasion','Gift Guide','A simple way to pick a gift they will remember, whatever the occasion.','<p>Start with the person, not the product. Think about what they enjoy day to day, then match the gift to the occasion and your budget.</p><p>Hampers work well when you are unsure, personalised gifts suit close friends and family, and flowers or chocolates are always welcome as an add-on.</p>','blog-1.jpg',1,'2026-10-05 16:26:37'),(2,'c8840aa65ec17a54','gft1a2b3c4d5e6f7','store','','5 Surprise Gift Ideas That Never Fail','Surprise Gifts','Midnight deliveries, balloon boxes and other surprises worth planning.','<p>A surprise is about timing as much as the gift. Try a midnight delivery, a balloon box at the door, a mystery box, a photo keepsake, or a party kit sent ahead of the celebration.</p>','blog-2.jpg',1,'2026-10-02 16:26:37'),(3,'000fee7cdb2987eb','gft1a2b3c4d5e6f7','store','','Why a Handwritten Card Still Matters','Greeting Cards','A few honest lines in a card can mean more than the gift itself.','<p>Cards are kept long after the wrapping is gone. Write something specific: a shared memory, what you admire about them, or what you are looking forward to together.</p>','blog-3.jpg',1,'2026-09-29 16:26:37');
/*!40000 ALTER TABLE `giftora_blog` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `giftora_business_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `giftora_business_info` (
  `profile_id` varchar(32) NOT NULL,
  `subdomain` varchar(100) NOT NULL,
  `domain` varchar(150) NOT NULL DEFAULT '',
  `business_name` varchar(200) NOT NULL DEFAULT '',
  `tagline` varchar(300) NOT NULL DEFAULT '',
  `address` varchar(500) NOT NULL DEFAULT '',
  `phone` varchar(50) NOT NULL DEFAULT '',
  `email` varchar(150) NOT NULL DEFAULT '',
  `open_time` varchar(50) NOT NULL DEFAULT '',
  `close_time` varchar(50) NOT NULL DEFAULT '',
  `about` text DEFAULT NULL,
  `instagram` varchar(300) NOT NULL DEFAULT '',
  `facebook` varchar(300) NOT NULL DEFAULT '',
  `shipping_charge` decimal(10,2) NOT NULL DEFAULT 0.00,
  `free_shipping_min` decimal(10,2) NOT NULL DEFAULT 0.00,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`profile_id`,`subdomain`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `giftora_business_info` WRITE;
/*!40000 ALTER TABLE `giftora_business_info` DISABLE KEYS */;
INSERT INTO `giftora_business_info` VALUES ('gft1a2b3c4d5e6f7','store','','Giftora','Thoughtful gifts, greeting cards and surprises delivered with love.','24, Gift Street, T. Nagar, Chennai - 600017, Tamil Nadu, India','+91 98765 43210','hello@giftora.in','9:00 AM','9:00 PM','We are an online gifting store that helps you celebrate every occasion. Choose from curated gift hampers, handmade greeting cards, surprise boxes, fresh flowers, personalised keepsakes and chocolates, and we will pack and deliver them with care.','https://instagram.com/','https://facebook.com/',60.00,999.00,'2026-10-06 16:26:36','2026-10-07 10:05:09');
/*!40000 ALTER TABLE `giftora_business_info` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `giftora_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `giftora_categories` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `cat_id` varchar(16) NOT NULL,
  `profile_id` varchar(32) NOT NULL,
  `subdomain` varchar(100) NOT NULL,
  `domain` varchar(150) NOT NULL DEFAULT '',
  `cat_name` varchar(150) NOT NULL DEFAULT '',
  `cat_desc` varchar(500) NOT NULL DEFAULT '',
  `cat_img` varchar(255) NOT NULL DEFAULT '',
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `giftora_categories_cat_id_unique` (`cat_id`),
  KEY `idx_cat_store` (`profile_id`,`subdomain`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `giftora_categories` WRITE;
/*!40000 ALTER TABLE `giftora_categories` DISABLE KEYS */;
INSERT INTO `giftora_categories` VALUES (1,'d0cac028509fa092','gft1a2b3c4d5e6f7','store','','Online Gifts','Curated gift hampers and boxes for every celebration.','cat-online-gifts.jpg',1,1,'2026-10-06 16:26:37'),(2,'be810216c335b2b4','gft1a2b3c4d5e6f7','store','','Greeting Cards','Handmade and printed cards for every occasion.','cat-greeting-cards.jpg',2,1,'2026-10-06 16:26:37'),(3,'c13b9eb8b3fb2847','gft1a2b3c4d5e6f7','store','','Surprise Gifts','Surprise boxes and midnight deliveries.','cat-surprise-gifts.jpg',3,1,'2026-10-06 16:26:37'),(4,'5b67693f9336e60e','gft1a2b3c4d5e6f7','store','','Flowers & Bouquets','Fresh hand-tied bouquets and flower baskets.','cat-flowers.jpg',4,1,'2026-10-06 16:26:37'),(5,'4a3ae5df129939bd','gft1a2b3c4d5e6f7','store','','Personalised Gifts','Mugs, frames and keepsakes made just for them.','cat-personalised.jpg',5,1,'2026-10-06 16:26:37'),(6,'a36ae1f211e4721f','gft1a2b3c4d5e6f7','store','','Chocolates & Sweets','Chocolate boxes, truffles and sweet treats.','cat-chocolates.jpg',6,1,'2026-10-06 16:26:37');
/*!40000 ALTER TABLE `giftora_categories` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `giftora_coupons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `giftora_coupons` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `cid` varchar(16) NOT NULL,
  `profile_id` varchar(32) NOT NULL,
  `subdomain` varchar(100) NOT NULL,
  `domain` varchar(150) NOT NULL DEFAULT '',
  `code` varchar(40) NOT NULL,
  `description` varchar(255) NOT NULL DEFAULT '',
  `discount_type` varchar(10) NOT NULL DEFAULT 'percent',
  `discount_value` decimal(10,2) NOT NULL DEFAULT 0.00,
  `min_order` decimal(10,2) NOT NULL DEFAULT 0.00,
  `max_discount` decimal(10,2) NOT NULL DEFAULT 0.00,
  `valid_to` date DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_coupon_code` (`profile_id`,`subdomain`,`code`),
  UNIQUE KEY `giftora_coupons_cid_unique` (`cid`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `giftora_coupons` WRITE;
/*!40000 ALTER TABLE `giftora_coupons` DISABLE KEYS */;
INSERT INTO `giftora_coupons` VALUES (1,'fb4ceb17506a047f','gft1a2b3c4d5e6f7','store','','WELCOME10','10% off your first order','percent',10.00,499.00,200.00,'2027-10-06',1,'2026-10-06 16:26:37'),(2,'fe9b3cd35bc08321','gft1a2b3c4d5e6f7','store','','GIFT100','Flat ₹100 off on orders above ₹999','flat',100.00,999.00,0.00,'2027-10-06',1,'2026-10-06 16:26:37'),(3,'8eb2b7c48b61694d','gft1a2b3c4d5e6f7','store','','FESTIVE15','15% off festive gifting','percent',15.00,1499.00,400.00,'2027-10-06',1,'2026-10-06 16:26:37');
/*!40000 ALTER TABLE `giftora_coupons` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `giftora_courier_costs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `giftora_courier_costs` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `ccid` varchar(16) NOT NULL,
  `profile_id` varchar(32) NOT NULL,
  `subdomain` varchar(100) NOT NULL,
  `domain` varchar(150) NOT NULL DEFAULT '',
  `courier_id` varchar(16) NOT NULL,
  `avg_weight_grams` int(10) unsigned NOT NULL,
  `home_rate` decimal(10,2) NOT NULL DEFAULT 0.00,
  `other_rate` decimal(10,2) NOT NULL DEFAULT 0.00,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `giftora_courier_costs_ccid_unique` (`ccid`),
  KEY `giftora_courier_costs_courier_id_foreign` (`courier_id`),
  CONSTRAINT `giftora_courier_costs_courier_id_foreign` FOREIGN KEY (`courier_id`) REFERENCES `giftora_couriers` (`cid`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `giftora_courier_costs` WRITE;
/*!40000 ALTER TABLE `giftora_courier_costs` DISABLE KEYS */;
/*!40000 ALTER TABLE `giftora_courier_costs` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `giftora_couriers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `giftora_couriers` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `cid` varchar(16) NOT NULL,
  `profile_id` varchar(32) NOT NULL,
  `subdomain` varchar(100) NOT NULL,
  `domain` varchar(150) NOT NULL DEFAULT '',
  `name` varchar(150) NOT NULL,
  `contact_person` varchar(150) NOT NULL DEFAULT '',
  `contact_number` varchar(50) NOT NULL DEFAULT '',
  `logo_img` varchar(255) NOT NULL DEFAULT '',
  `tracking_url` varchar(500) NOT NULL DEFAULT '',
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `giftora_couriers_cid_unique` (`cid`),
  KEY `idx_courier_store` (`profile_id`,`subdomain`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `giftora_couriers` WRITE;
/*!40000 ALTER TABLE `giftora_couriers` DISABLE KEYS */;
/*!40000 ALTER TABLE `giftora_couriers` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `giftora_customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `giftora_customers` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `profile_id` varchar(32) NOT NULL,
  `subdomain` varchar(100) NOT NULL,
  `domain` varchar(150) NOT NULL DEFAULT '',
  `customer_name` varchar(200) NOT NULL DEFAULT '',
  `customer_ph` varchar(30) NOT NULL DEFAULT '',
  `customer_email` varchar(150) NOT NULL DEFAULT '',
  `address` varchar(500) NOT NULL DEFAULT '',
  `city` varchar(100) NOT NULL DEFAULT '',
  `state` varchar(100) NOT NULL DEFAULT '',
  `pincode` varchar(20) NOT NULL DEFAULT '',
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_customer_phone` (`profile_id`,`subdomain`,`customer_ph`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `giftora_customers` WRITE;
/*!40000 ALTER TABLE `giftora_customers` DISABLE KEYS */;
/*!40000 ALTER TABLE `giftora_customers` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `giftora_enquiries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `giftora_enquiries` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `eid` varchar(16) NOT NULL,
  `profile_id` varchar(32) NOT NULL,
  `subdomain` varchar(100) NOT NULL,
  `domain` varchar(150) NOT NULL DEFAULT '',
  `cname` varchar(200) NOT NULL DEFAULT '',
  `cmobile` varchar(30) NOT NULL DEFAULT '',
  `cemail` varchar(150) NOT NULL DEFAULT '',
  `subject` varchar(300) NOT NULL DEFAULT '',
  `message` text DEFAULT NULL,
  `status` varchar(20) NOT NULL DEFAULT 'unread',
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `giftora_enquiries_eid_unique` (`eid`),
  KEY `idx_enquiry_store` (`profile_id`,`subdomain`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `giftora_enquiries` WRITE;
/*!40000 ALTER TABLE `giftora_enquiries` DISABLE KEYS */;
/*!40000 ALTER TABLE `giftora_enquiries` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `giftora_notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `giftora_notifications` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nid` varchar(16) NOT NULL,
  `profile_id` varchar(32) NOT NULL,
  `subdomain` varchar(100) NOT NULL,
  `message` text DEFAULT NULL,
  `type` varchar(50) NOT NULL DEFAULT 'general',
  `is_read` tinyint(4) NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `giftora_notifications_nid_unique` (`nid`),
  KEY `idx_notif_store` (`profile_id`,`subdomain`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `giftora_notifications` WRITE;
/*!40000 ALTER TABLE `giftora_notifications` DISABLE KEYS */;
INSERT INTO `giftora_notifications` VALUES (1,'aeccf092f94cb013','gft1a2b3c4d5e6f7','store','Your store is ready. Update your logo, banners and products from the admin panel.','general',0,'2026-10-06 16:26:37');
/*!40000 ALTER TABLE `giftora_notifications` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `giftora_order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `giftora_order_items` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `oid` varchar(16) NOT NULL,
  `pid` varchar(16) DEFAULT NULL,
  `product_name` varchar(255) NOT NULL DEFAULT '',
  `product_img` varchar(255) NOT NULL DEFAULT '',
  `price` decimal(10,2) NOT NULL DEFAULT 0.00,
  `qty` int(11) NOT NULL DEFAULT 1,
  `line_total` decimal(10,2) NOT NULL DEFAULT 0.00,
  PRIMARY KEY (`id`),
  KEY `giftora_order_items_oid_foreign` (`oid`),
  KEY `giftora_order_items_pid_foreign` (`pid`),
  CONSTRAINT `giftora_order_items_oid_foreign` FOREIGN KEY (`oid`) REFERENCES `giftora_orders` (`oid`) ON DELETE CASCADE,
  CONSTRAINT `giftora_order_items_pid_foreign` FOREIGN KEY (`pid`) REFERENCES `giftora_products` (`pid`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `giftora_order_items` WRITE;
/*!40000 ALTER TABLE `giftora_order_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `giftora_order_items` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `giftora_order_updates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `giftora_order_updates` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `oid` varchar(16) NOT NULL,
  `admin_id` varchar(16) DEFAULT NULL,
  `admin_name` varchar(150) NOT NULL DEFAULT '',
  `status` varchar(30) NOT NULL DEFAULT '',
  `delivery_status` varchar(255) NOT NULL DEFAULT '',
  `courier_name` varchar(150) NOT NULL DEFAULT '',
  `tracking_code` varchar(100) NOT NULL DEFAULT '',
  `note` text DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `giftora_order_updates_oid_foreign` (`oid`),
  CONSTRAINT `giftora_order_updates_oid_foreign` FOREIGN KEY (`oid`) REFERENCES `giftora_orders` (`oid`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `giftora_order_updates` WRITE;
/*!40000 ALTER TABLE `giftora_order_updates` DISABLE KEYS */;
/*!40000 ALTER TABLE `giftora_order_updates` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `giftora_orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `giftora_orders` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `oid` varchar(16) NOT NULL,
  `order_no` varchar(30) NOT NULL,
  `profile_id` varchar(32) NOT NULL,
  `subdomain` varchar(100) NOT NULL,
  `domain` varchar(150) NOT NULL DEFAULT '',
  `customer_name` varchar(200) NOT NULL DEFAULT '',
  `customer_ph` varchar(30) NOT NULL DEFAULT '',
  `customer_email` varchar(150) NOT NULL DEFAULT '',
  `address` varchar(500) NOT NULL DEFAULT '',
  `city` varchar(100) NOT NULL DEFAULT '',
  `state` varchar(100) NOT NULL DEFAULT '',
  `pincode` varchar(20) NOT NULL DEFAULT '',
  `recipient_name` varchar(200) NOT NULL DEFAULT '',
  `gift_message` text DEFAULT NULL,
  `delivery_date` date DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `subtotal` decimal(10,2) NOT NULL DEFAULT 0.00,
  `discount` decimal(10,2) NOT NULL DEFAULT 0.00,
  `coupon_code` varchar(40) NOT NULL DEFAULT '',
  `shipping` decimal(10,2) NOT NULL DEFAULT 0.00,
  `total` decimal(10,2) NOT NULL DEFAULT 0.00,
  `payment_method` varchar(30) NOT NULL DEFAULT 'cod',
  `payment_status` varchar(30) NOT NULL DEFAULT 'pending',
  `status` varchar(30) NOT NULL DEFAULT 'pending',
  `courier_id` varchar(16) DEFAULT NULL,
  `courier_name` varchar(150) NOT NULL DEFAULT '',
  `tracking_code` varchar(100) NOT NULL DEFAULT '',
  `delivery_status` varchar(255) NOT NULL DEFAULT '',
  `shipped_at` datetime DEFAULT NULL,
  `delivered_at` datetime DEFAULT NULL,
  `cancelled_at` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `giftora_orders_oid_unique` (`oid`),
  UNIQUE KEY `giftora_orders_order_no_unique` (`order_no`),
  KEY `idx_order_store` (`profile_id`,`subdomain`),
  KEY `idx_order_ph` (`customer_ph`),
  KEY `giftora_orders_courier_id_foreign` (`courier_id`),
  CONSTRAINT `giftora_orders_courier_id_foreign` FOREIGN KEY (`courier_id`) REFERENCES `giftora_couriers` (`cid`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `giftora_orders` WRITE;
/*!40000 ALTER TABLE `giftora_orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `giftora_orders` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `giftora_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `giftora_products` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `pid` varchar(16) NOT NULL,
  `profile_id` varchar(32) NOT NULL,
  `subdomain` varchar(100) NOT NULL,
  `domain` varchar(150) NOT NULL DEFAULT '',
  `cat_id` varchar(16) DEFAULT NULL,
  `product_name` varchar(255) NOT NULL DEFAULT '',
  `sku` varchar(60) NOT NULL DEFAULT '',
  `description` text DEFAULT NULL,
  `mrp` decimal(10,2) NOT NULL DEFAULT 0.00,
  `price` decimal(10,2) NOT NULL DEFAULT 0.00,
  `stock` int(11) NOT NULL DEFAULT 0,
  `weight_grams` int(10) unsigned NOT NULL DEFAULT 0,
  `product_img` varchar(255) NOT NULL DEFAULT '',
  `is_featured` tinyint(4) NOT NULL DEFAULT 0,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `giftora_products_pid_unique` (`pid`),
  KEY `idx_prod_store` (`profile_id`,`subdomain`),
  KEY `giftora_products_cat_id_foreign` (`cat_id`),
  CONSTRAINT `giftora_products_cat_id_foreign` FOREIGN KEY (`cat_id`) REFERENCES `giftora_categories` (`cat_id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `giftora_products` WRITE;
/*!40000 ALTER TABLE `giftora_products` DISABLE KEYS */;
INSERT INTO `giftora_products` VALUES (1,'edfd8cd9402bd6d5','gft1a2b3c4d5e6f7','store','','d0cac028509fa092','Luxury Celebration Gift Hamper','GH-001','A premium hamper packed with gourmet treats, a scented candle and a keepsake box. Beautifully wrapped and ready to gift.',2499.00,1999.00,25,0,'p-celebration-hamper.jpg',1,1,'2026-10-06 16:08:37'),(2,'0be2b1e24a4a7e4e','gft1a2b3c4d5e6f7','store','','d0cac028509fa092','Spa & Self-Care Gift Box','GH-002','Bath salts, handmade soap, a soft towel and aroma oil in a ribboned box. A relaxing treat for someone special.',1799.00,1499.00,30,0,'p-spa-gift-box.jpg',0,1,'2026-10-06 16:09:37'),(3,'4f88e6b4e5e98bfd','gft1a2b3c4d5e6f7','store','','d0cac028509fa092','Gourmet Tea & Cookies Hamper','GH-003','Assorted fine teas with butter cookies in a reusable gift basket. Perfect for housewarmings and thank-you gifts.',1299.00,999.00,40,0,'p-tea-hamper.jpg',1,1,'2026-10-06 16:10:37'),(4,'bbe7d3b5c13e3737','gft1a2b3c4d5e6f7','store','','be810216c335b2b4','Handmade Birthday Greeting Card','GC-001','A handcrafted birthday card on textured paper with space for your personal message. Envelope included.',199.00,149.00,120,0,'p-birthday-card.jpg',1,1,'2026-10-06 16:11:37'),(5,'ba8f8f5384abae41','gft1a2b3c4d5e6f7','store','','be810216c335b2b4','Anniversary Greeting Card','GC-002','An elegant anniversary card with a heartfelt verse inside. Comes with a matching envelope.',349.00,279.00,80,0,'p-anniversary-card.jpg',0,1,'2026-10-06 16:12:37'),(6,'700c3c59c438b339','gft1a2b3c4d5e6f7','store','','be810216c335b2b4','Thank You Cards (Pack of 5)','GC-003','Five thank-you cards with envelopes. Blank inside so you can write your own note.',299.00,249.00,100,0,'p-thankyou-cards.jpg',0,1,'2026-10-06 16:13:37'),(7,'9ab7564d82a83b2a','gft1a2b3c4d5e6f7','store','','c13b9eb8b3fb2847','Surprise Balloon Box','SG-001','A box that opens to a burst of balloons with a small gift and message card inside. Great for birthdays.',1499.00,1199.00,20,0,'p-balloon-box.jpg',1,1,'2026-10-06 16:14:37'),(8,'097822c508d856de','gft1a2b3c4d5e6f7','store','','c13b9eb8b3fb2847','Mystery Surprise Gift Box','SG-002','A hand-picked mix of gifts chosen by our team. Tell us the occasion and we will do the rest.',999.00,799.00,35,0,'p-mystery-box.jpg',1,1,'2026-10-06 16:15:37'),(9,'bbc6a3ebc6cb20f6','gft1a2b3c4d5e6f7','store','','c13b9eb8b3fb2847','Party Surprise Kit','SG-003','Confetti, party poppers, candles and a celebration banner in one kit for an instant surprise party.',899.00,699.00,30,0,'p-party-kit.jpg',0,1,'2026-10-06 16:16:37'),(10,'610e445d4e28298d','gft1a2b3c4d5e6f7','store','','5b67693f9336e60e','Red Roses Bouquet','FL-001','Twelve fresh red roses hand-tied with seasonal greens and wrapped in premium paper.',799.00,649.00,50,0,'p-red-roses.jpg',1,1,'2026-10-06 16:17:37'),(11,'30067fecf58ae3b1','gft1a2b3c4d5e6f7','store','','5b67693f9336e60e','Mixed Flower Bouquet','FL-002','A cheerful bouquet of daisies and mixed seasonal flowers arranged by our florists.',1199.00,949.00,25,0,'p-flower-basket.jpg',0,1,'2026-10-06 16:18:37'),(12,'a7ffb247f7b26098','gft1a2b3c4d5e6f7','store','','5b67693f9336e60e','Pink Tulip Bunch','FL-003','A soft bunch of pink tulips tied with a satin ribbon.',999.00,849.00,20,0,'p-pink-tulips.jpg',0,1,'2026-10-06 16:19:37'),(13,'f5971173e564db26','gft1a2b3c4d5e6f7','store','','4a3ae5df129939bd','Personalised Printed Mug','PG-001','An enamel mug printed with a design, name or message of your choice. Tell us what to print in the order notes.',399.00,299.00,200,0,'p-photo-mug.jpg',1,1,'2026-10-06 16:20:37'),(14,'c2d3d7b16ee75922','gft1a2b3c4d5e6f7','store','','4a3ae5df129939bd','Classic Photo Frame','PG-002','A clean white frame for a favourite memory. Holds a 5x7 inch photo and stands or hangs.',799.00,599.00,60,0,'p-photo-frame.jpg',0,1,'2026-10-06 16:21:37'),(15,'c5ab583235798d06','gft1a2b3c4d5e6f7','store','','4a3ae5df129939bd','Custom Printed Cushion','PG-003','A soft cushion printed with artwork, a name or a short message of your choice. Filler included.',699.00,549.00,45,0,'p-cushion.jpg',0,1,'2026-10-06 16:22:37'),(16,'ddfc6b40cec23e6f','gft1a2b3c4d5e6f7','store','','a36ae1f211e4721f','Assorted Chocolate Gift Box','CH-001','A box of assorted milk, dark and white chocolates in a gift-ready pack.',899.00,749.00,70,0,'p-chocolate-box.jpg',1,1,'2026-10-06 16:23:37'),(17,'05203509332b8fc9','gft1a2b3c4d5e6f7','store','','a36ae1f211e4721f','Dry Fruits Gift Tray','CH-002','Premium almonds, cashews, pistachios and raisins in a decorative tray.',1599.00,1299.00,30,0,'p-dry-fruits.jpg',0,1,'2026-10-06 16:24:37'),(18,'c46ff2faba7fecdf','gft1a2b3c4d5e6f7','store','','a36ae1f211e4721f','Chocolate Truffle Box','CH-003','Hand-rolled chocolate truffles dusted with cocoa. Sixteen pieces per box.',649.00,499.00,55,0,'p-truffles.jpg',1,1,'2026-10-06 16:25:37');
/*!40000 ALTER TABLE `giftora_products` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `giftora_reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `giftora_reviews` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `rid` varchar(16) NOT NULL,
  `profile_id` varchar(32) NOT NULL,
  `subdomain` varchar(100) NOT NULL,
  `domain` varchar(150) NOT NULL DEFAULT '',
  `reviewer_name` varchar(200) NOT NULL DEFAULT '',
  `reviewer_ph` varchar(30) NOT NULL DEFAULT '',
  `rating` tinyint(4) NOT NULL DEFAULT 5,
  `review_text` text DEFAULT NULL,
  `product_name` varchar(255) NOT NULL DEFAULT '',
  `status` tinyint(4) NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `giftora_reviews_rid_unique` (`rid`),
  KEY `idx_review_store` (`profile_id`,`subdomain`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `giftora_reviews` WRITE;
/*!40000 ALTER TABLE `giftora_reviews` DISABLE KEYS */;
INSERT INTO `giftora_reviews` VALUES (1,'5dfe9a93890a4334','gft1a2b3c4d5e6f7','store','','Ananya R.','',5,'The hamper was beautifully packed and arrived right on time. My sister loved it!','Luxury Celebration Gift Hamper',1,'2026-10-05 16:26:37'),(2,'1cbe822c07f60ca2','gft1a2b3c4d5e6f7','store','','Karthik S.','',5,'Ordered roses for our anniversary. Fresh flowers and a lovely handwritten note.','Red Roses Bouquet',1,'2026-10-04 16:26:37'),(3,'756be847ecd4b148','gft1a2b3c4d5e6f7','store','','Meera V.','',4,'The photo mug print quality is great. Delivery took a day longer than expected.','Personalised Printed Mug',1,'2026-10-03 16:26:37'),(4,'71a574c0f24fc702','gft1a2b3c4d5e6f7','store','','Rahul D.','',5,'The surprise balloon box made my friend\'s birthday. Will order again.','Surprise Balloon Box',1,'2026-10-02 16:26:37');
/*!40000 ALTER TABLE `giftora_reviews` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `giftora_terms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `giftora_terms` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `profile_id` varchar(32) NOT NULL,
  `subdomain` varchar(100) NOT NULL,
  `domain` varchar(150) NOT NULL DEFAULT '',
  `termtype` varchar(50) NOT NULL,
  `terms_title` varchar(255) NOT NULL DEFAULT '',
  `terms_desc` longtext DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_terms` (`profile_id`,`subdomain`,`termtype`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `giftora_terms` WRITE;
/*!40000 ALTER TABLE `giftora_terms` DISABLE KEYS */;
INSERT INTO `giftora_terms` VALUES (1,'gft1a2b3c4d5e6f7','store','','conditions','Terms and Conditions','By placing an order you agree to provide accurate delivery details and to pay the order total shown at checkout. Product images are for reference; flowers and handmade items may vary slightly. Orders can be cancelled before they are packed.','2026-10-06 16:26:37','2026-10-06 16:26:37'),(2,'gft1a2b3c4d5e6f7','store','','privacy','Privacy Policy','We collect your name, phone number, email and delivery address only to process and deliver your orders and to contact you about them. We do not sell your personal information.','2026-10-06 16:26:37','2026-10-06 16:26:37'),(3,'gft1a2b3c4d5e6f7','store','','disclaimer','Disclaimer','Delivery dates are estimates and may be affected by weather, holidays or courier delays. Perishable items should be consumed as indicated on the pack.','2026-10-06 16:26:37','2026-10-06 16:26:37'),(4,'gft1a2b3c4d5e6f7','store','','cookiepolicy','Cookie Policy','This site stores your cart and preferences in your browser so they are available on your next visit. No advertising cookies are used.','2026-10-06 16:26:37','2026-10-06 16:26:37');
/*!40000 ALTER TABLE `giftora_terms` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `giftora_theme`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `giftora_theme` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `profile_id` varchar(32) NOT NULL,
  `subdomain` varchar(100) NOT NULL,
  `domain` varchar(150) NOT NULL DEFAULT '',
  `color` varchar(10) NOT NULL DEFAULT '#E11D74',
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_vendor` (`profile_id`,`subdomain`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `giftora_theme` WRITE;
/*!40000 ALTER TABLE `giftora_theme` DISABLE KEYS */;
INSERT INTO `giftora_theme` VALUES (1,'gft1a2b3c4d5e6f7','store','','#E11D74','2026-10-06 10:56:36');
/*!40000 ALTER TABLE `giftora_theme` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `giftora_tracking_codes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `giftora_tracking_codes` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `profile_id` varchar(32) NOT NULL,
  `subdomain` varchar(100) NOT NULL,
  `domain` varchar(150) NOT NULL DEFAULT '',
  `upload_id` varchar(16) NOT NULL,
  `courier_id` varchar(16) NOT NULL,
  `tracking_code` varchar(100) NOT NULL,
  `oid` varchar(16) DEFAULT NULL,
  `order_no` varchar(30) NOT NULL DEFAULT '',
  `customer` varchar(200) NOT NULL DEFAULT '',
  `order_date` date DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_tracking_code` (`profile_id`,`subdomain`,`tracking_code`),
  KEY `giftora_tracking_codes_upload_id_foreign` (`upload_id`),
  KEY `giftora_tracking_codes_courier_id_foreign` (`courier_id`),
  KEY `giftora_tracking_codes_oid_foreign` (`oid`),
  CONSTRAINT `giftora_tracking_codes_courier_id_foreign` FOREIGN KEY (`courier_id`) REFERENCES `giftora_couriers` (`cid`) ON DELETE CASCADE,
  CONSTRAINT `giftora_tracking_codes_oid_foreign` FOREIGN KEY (`oid`) REFERENCES `giftora_orders` (`oid`) ON DELETE SET NULL,
  CONSTRAINT `giftora_tracking_codes_upload_id_foreign` FOREIGN KEY (`upload_id`) REFERENCES `giftora_tracking_uploads` (`uid`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `giftora_tracking_codes` WRITE;
/*!40000 ALTER TABLE `giftora_tracking_codes` DISABLE KEYS */;
/*!40000 ALTER TABLE `giftora_tracking_codes` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `giftora_tracking_uploads`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `giftora_tracking_uploads` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `uid` varchar(16) NOT NULL,
  `profile_id` varchar(32) NOT NULL,
  `subdomain` varchar(100) NOT NULL,
  `domain` varchar(150) NOT NULL DEFAULT '',
  `courier_id` varchar(16) NOT NULL,
  `title` varchar(255) NOT NULL,
  `file_name` varchar(255) NOT NULL DEFAULT '',
  `file_path` varchar(255) NOT NULL DEFAULT '',
  `total_codes` int(10) unsigned NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `giftora_tracking_uploads_uid_unique` (`uid`),
  KEY `giftora_tracking_uploads_courier_id_foreign` (`courier_id`),
  CONSTRAINT `giftora_tracking_uploads_courier_id_foreign` FOREIGN KEY (`courier_id`) REFERENCES `giftora_couriers` (`cid`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `giftora_tracking_uploads` WRITE;
/*!40000 ALTER TABLE `giftora_tracking_uploads` DISABLE KEYS */;
/*!40000 ALTER TABLE `giftora_tracking_uploads` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `job_batches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `job_batches` WRITE;
/*!40000 ALTER TABLE `job_batches` DISABLE KEYS */;
/*!40000 ALTER TABLE `job_batches` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) unsigned NOT NULL,
  `reserved_at` int(10) unsigned DEFAULT NULL,
  `available_at` int(10) unsigned NOT NULL,
  `created_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'0001_01_01_000000_create_users_table',1),(2,'0001_01_01_000001_create_cache_table',1),(3,'0001_01_01_000002_create_jobs_table',1),(4,'2026_10_06_000000_create_giftora_schema',1),(5,'2026_10_07_000000_add_courier_management',2);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `password_reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `password_reset_tokens` WRITE;
/*!40000 ALTER TABLE `password_reset_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_reset_tokens` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) unsigned DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `social_links`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `social_links` (
  `mid` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `sid` varchar(16) NOT NULL,
  `profile_id` varchar(32) NOT NULL,
  `subdomain` varchar(100) NOT NULL,
  `domain` varchar(150) NOT NULL DEFAULT '',
  `fb` varchar(500) NOT NULL DEFAULT '',
  `insta` varchar(500) NOT NULL DEFAULT '',
  `linked` varchar(500) NOT NULL DEFAULT '',
  `status` varchar(10) NOT NULL DEFAULT '1',
  PRIMARY KEY (`mid`),
  UNIQUE KEY `uq_social_store` (`profile_id`,`subdomain`),
  UNIQUE KEY `social_links_sid_unique` (`sid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `social_links` WRITE;
/*!40000 ALTER TABLE `social_links` DISABLE KEYS */;
INSERT INTO `social_links` VALUES (1,'3f728ac4a9c75879','gft1a2b3c4d5e6f7','store','','https://facebook.com/','https://instagram.com/','https://linkedin.com/','1');
/*!40000 ALTER TABLE `social_links` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `web_banner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `web_banner` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `bid` varchar(16) NOT NULL,
  `profile_id` varchar(32) NOT NULL,
  `subdomain` varchar(100) NOT NULL,
  `domain` varchar(150) NOT NULL DEFAULT '',
  `banner_order` int(11) NOT NULL DEFAULT 1,
  `banner_title` varchar(255) NOT NULL DEFAULT '',
  `banner_img` varchar(255) NOT NULL DEFAULT '',
  `banner_img_ext` varchar(10) NOT NULL DEFAULT '',
  `banner_img_size` varchar(20) NOT NULL DEFAULT '',
  `status` varchar(10) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `web_banner_bid_unique` (`bid`),
  KEY `idx_banner_store` (`profile_id`,`subdomain`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `web_banner` WRITE;
/*!40000 ALTER TABLE `web_banner` DISABLE KEYS */;
INSERT INTO `web_banner` VALUES (1,'0c1dab1fe1acc1e4','gft1a2b3c4d5e6f7','store','',1,'Gifts for every occasion','banner-1.jpg','jpg','','1'),(2,'60096fec559fdaca','gft1a2b3c4d5e6f7','store','',2,'Surprise gifts delivered to their door','banner-2.jpg','jpg','','1'),(3,'4ec5f3c7e266ff9f','gft1a2b3c4d5e6f7','store','',3,'Greeting cards made with love','banner-3.jpg','jpg','','1');
/*!40000 ALTER TABLE `web_banner` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

