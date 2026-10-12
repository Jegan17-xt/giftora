-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Oct 02, 2026 at 03:41 AM
-- Server version: 5.7.39
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `apps_mita_cinelux`
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

--
-- Dumping data for table `about`
--

INSERT INTO `about` (`id`, `aid`, `profile_id`, `subdomain`, `domain`, `aboutus_img`, `aboutus_img_ext`, `aboutus_img_size`, `aboutus_sdesc`, `aboutus_desc`, `whoweare_img`, `whoweare_img_ext`, `whoweare_img_size`, `whoweare_sdesc`, `whoweare_desc`, `ourmission_img`, `ourmission_img_ext`, `ourmission_img_size`, `ourmission_sdesc`, `ourmission_desc`, `ourvision_img`, `ourvision_img_ext`, `ourvision_img_size`, `ourvision_sdesc`, `ourvision_desc`, `ourvalues_img`, `ourvalues_img_ext`, `ourvalues_img_size`, `ourvalues_sdesc`, `ourvalues_desc`, `comp_img`, `comp_img_ext`, `comp_img_size`, `comp_sdesc`, `comp_desc`, `whatwedo_img`, `whatwedo_img_ext`, `whatwedo_img_size`, `whatwedo_sdesc`, `whatwedo_desc`, `whyus_img`, `whyus_sdesc`, `whyus_desc`, `whyus_img_ext`, `whyus_img_size`) VALUES
(1, '814ab5b2c10c48dd', '4ca00ec0a1d17301', 'cinelounge.mita.in', '', '1777826268_Fi-8wEYUAAAzIc-.jpg', 'jpg', '', '<p></p>', '<p>It&nbsp;is&nbsp;a&nbsp;long&nbsp;established&nbsp;fact&nbsp;that&nbsp;a&nbsp;reader&nbsp;will&nbsp;be&nbsp;distracted&nbsp;by&nbsp;the&nbsp;readable&nbsp;content&nbsp;of&nbsp;a&nbsp;page&nbsp;when&nbsp;looking&nbsp;at&nbsp;its&nbsp;layout.&nbsp;The&nbsp;point&nbsp;of&nbsp;using&nbsp;Lorem&nbsp;Ipsum&nbsp;is&nbsp;that&nbsp;it&nbsp;has&nbsp;a&nbsp;more-or-less&nbsp;normal&nbsp;distribution&nbsp;of&nbsp;letters,&nbsp;as&nbsp;opposed&nbsp;to&nbsp;using&nbsp;&#39;Content&nbsp;here,&nbsp;content&nbsp;here&#39;,&nbsp;making&nbsp;it&nbsp;look&nbsp;like&nbsp;readable&nbsp;English.&nbsp;Many&nbsp;desktop&nbsp;publishing&nbsp;packages&nbsp;and&nbsp;web&nbsp;page&nbsp;editors&nbsp;now&nbsp;use&nbsp;Lorem&nbsp;Ipsum&nbsp;as&nbsp;their&nbsp;default&nbsp;model&nbsp;text,&nbsp;and&nbsp;a&nbsp;search&nbsp;for&nbsp;&#39;lorem&nbsp;ipsum&#39;&nbsp;will&nbsp;uncover&nbsp;many&nbsp;web&nbsp;sites&nbsp;still&nbsp;in&nbsp;their&nbsp;infancy.&nbsp;Various&nbsp;versions&nbsp;have&nbsp;evolved&nbsp;over&nbsp;the&nbsp;years,&nbsp;sometimes&nbsp;by&nbsp;accident,&nbsp;sometimes&nbsp;on&nbsp;purpose&nbsp;(injected&nbsp;humour&nbsp;and&nbsp;the&nbsp;like).</p><p></p><p>It&nbsp;is&nbsp;a&nbsp;long&nbsp;established&nbsp;fact&nbsp;that&nbsp;a&nbsp;reader&nbsp;will&nbsp;be&nbsp;distracted&nbsp;by&nbsp;the&nbsp;readable&nbsp;content&nbsp;of&nbsp;a&nbsp;page&nbsp;when&nbsp;looking&nbsp;at&nbsp;its&nbsp;layout.&nbsp;The&nbsp;point&nbsp;of&nbsp;using&nbsp;Lorem&nbsp;Ipsum&nbsp;is&nbsp;that&nbsp;it&nbsp;has&nbsp;a&nbsp;more-or-less&nbsp;normal&nbsp;distribution&nbsp;of&nbsp;letters,&nbsp;as&nbsp;opposed&nbsp;to&nbsp;using&nbsp;&#39;Content&nbsp;here,&nbsp;content&nbsp;here&#39;,&nbsp;making&nbsp;it&nbsp;look&nbsp;like&nbsp;readable&nbsp;English.&nbsp;Many&nbsp;desktop&nbsp;publishing&nbsp;packages&nbsp;and&nbsp;web&nbsp;page&nbsp;editors&nbsp;now&nbsp;use&nbsp;Lorem&nbsp;Ipsum&nbsp;as&nbsp;their&nbsp;default&nbsp;model&nbsp;text,&nbsp;and&nbsp;a&nbsp;search&nbsp;for&nbsp;&#39;lorem&nbsp;ipsum&#39;&nbsp;will&nbsp;uncover&nbsp;many&nbsp;web&nbsp;sites&nbsp;still&nbsp;in&nbsp;their&nbsp;infancy.&nbsp;Various&nbsp;versions&nbsp;have&nbsp;evolved&nbsp;over&nbsp;the&nbsp;years,&nbsp;sometimes&nbsp;by&nbsp;accident,&nbsp;sometimes&nbsp;on&nbsp;purpose&nbsp;(injected&nbsp;humour&nbsp;and&nbsp;the&nbsp;like).</p>', '1777826294_Fi-8wEYUAAAzIc-.jpg', 'jpg', '', 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default mod', '<p>It&nbsp;is&nbsp;a&nbsp;long&nbsp;established&nbsp;fact&nbsp;that&nbsp;a&nbsp;reader&nbsp;will&nbsp;be&nbsp;distracted&nbsp;by&nbsp;the&nbsp;readable&nbsp;content&nbsp;of&nbsp;a&nbsp;page&nbsp;when&nbsp;looking&nbsp;at&nbsp;its&nbsp;layout.&nbsp;The&nbsp;point&nbsp;of&nbsp;using&nbsp;Lorem&nbsp;Ipsum&nbsp;is&nbsp;that&nbsp;it&nbsp;has&nbsp;a&nbsp;more-or-less&nbsp;normal&nbsp;distribution&nbsp;of&nbsp;letters,&nbsp;as&nbsp;opposed&nbsp;to&nbsp;using&nbsp;&#39;Content&nbsp;here,&nbsp;content&nbsp;here&#39;,&nbsp;making&nbsp;it&nbsp;look&nbsp;like&nbsp;readable&nbsp;English.&nbsp;Many&nbsp;desktop&nbsp;publishing&nbsp;packages&nbsp;and&nbsp;web&nbsp;page&nbsp;editors&nbsp;now&nbsp;use&nbsp;Lorem&nbsp;Ipsum&nbsp;as&nbsp;their&nbsp;default&nbsp;model&nbsp;text,&nbsp;and&nbsp;a&nbsp;search&nbsp;for&nbsp;&#39;lorem&nbsp;ipsum&#39;&nbsp;will&nbsp;uncover&nbsp;many&nbsp;web&nbsp;sites&nbsp;still&nbsp;in&nbsp;their&nbsp;infancy.&nbsp;Various&nbsp;versions&nbsp;have&nbsp;evolved&nbsp;over&nbsp;the&nbsp;years,&nbsp;sometimes&nbsp;by&nbsp;accident,&nbsp;sometimes&nbsp;on&nbsp;purpose&nbsp;(injected&nbsp;humour&nbsp;and&nbsp;the&nbsp;like).</p><p></p><p>It&nbsp;is&nbsp;a&nbsp;long&nbsp;established&nbsp;fact&nbsp;that&nbsp;a&nbsp;reader&nbsp;will&nbsp;be&nbsp;distracted&nbsp;by&nbsp;the&nbsp;readable&nbsp;content&nbsp;of&nbsp;a&nbsp;page&nbsp;when&nbsp;looking&nbsp;at&nbsp;its&nbsp;layout.&nbsp;The&nbsp;point&nbsp;of&nbsp;using&nbsp;Lorem&nbsp;Ipsum&nbsp;is&nbsp;that&nbsp;it&nbsp;has&nbsp;a&nbsp;more-or-less&nbsp;normal&nbsp;distribution&nbsp;of&nbsp;letters,&nbsp;as&nbsp;opposed&nbsp;to&nbsp;using&nbsp;&#39;Content&nbsp;here,&nbsp;content&nbsp;here&#39;,&nbsp;making&nbsp;it&nbsp;look&nbsp;like&nbsp;readable&nbsp;English.&nbsp;Many&nbsp;desktop&nbsp;publishing&nbsp;packages&nbsp;and&nbsp;web&nbsp;page&nbsp;editors&nbsp;now&nbsp;use&nbsp;Lorem&nbsp;Ipsum&nbsp;as&nbsp;their&nbsp;default&nbsp;model&nbsp;text,&nbsp;and&nbsp;a&nbsp;search&nbsp;for&nbsp;&#39;lorem&nbsp;ipsum&#39;&nbsp;will&nbsp;uncover&nbsp;many&nbsp;web&nbsp;sites&nbsp;still&nbsp;in&nbsp;their&nbsp;infancy.&nbsp;Various&nbsp;versions&nbsp;have&nbsp;evolved&nbsp;over&nbsp;the&nbsp;years,&nbsp;sometimes&nbsp;by&nbsp;accident,&nbsp;sometimes&nbsp;on&nbsp;purpose&nbsp;(injected&nbsp;humour&nbsp;and&nbsp;the&nbsp;like).</p>', '1777826307_Fi-8wEYUAAAzIc-.jpg', 'jpg', '', 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default mod', '<p></p><p>It&nbsp;is&nbsp;a&nbsp;long&nbsp;established&nbsp;fact&nbsp;that&nbsp;a&nbsp;reader&nbsp;will&nbsp;be&nbsp;distracted&nbsp;by&nbsp;the&nbsp;readable&nbsp;content&nbsp;of&nbsp;a&nbsp;page&nbsp;when&nbsp;looking&nbsp;at&nbsp;its&nbsp;layout.&nbsp;The&nbsp;point&nbsp;of&nbsp;using&nbsp;Lorem&nbsp;Ipsum&nbsp;is&nbsp;that&nbsp;it&nbsp;has&nbsp;a&nbsp;more-or-less&nbsp;normal&nbsp;distribution&nbsp;of&nbsp;letters,&nbsp;as&nbsp;opposed&nbsp;to&nbsp;using&nbsp;&#39;Content&nbsp;here,&nbsp;content&nbsp;here&#39;,&nbsp;making&nbsp;it&nbsp;look&nbsp;like&nbsp;readable&nbsp;English.&nbsp;Many&nbsp;desktop&nbsp;publishing&nbsp;packages&nbsp;and&nbsp;web&nbsp;page&nbsp;editors&nbsp;now&nbsp;use&nbsp;Lorem&nbsp;Ipsum&nbsp;as&nbsp;their&nbsp;default&nbsp;model&nbsp;text,&nbsp;and&nbsp;a&nbsp;search&nbsp;for&nbsp;&#39;lorem&nbsp;ipsum&#39;&nbsp;will&nbsp;uncover&nbsp;many&nbsp;web&nbsp;sites&nbsp;still&nbsp;in&nbsp;their&nbsp;infancy.&nbsp;Various&nbsp;versions&nbsp;have&nbsp;evolved&nbsp;over&nbsp;the&nbsp;years,&nbsp;sometimes&nbsp;by&nbsp;accident,&nbsp;sometimes&nbsp;on&nbsp;purpose&nbsp;(injected&nbsp;humour&nbsp;and&nbsp;the&nbsp;like).</p><p></p><p>It&nbsp;is&nbsp;a&nbsp;long&nbsp;established&nbsp;fact&nbsp;that&nbsp;a&nbsp;reader&nbsp;will&nbsp;be&nbsp;distracted&nbsp;by&nbsp;the&nbsp;readable&nbsp;content&nbsp;of&nbsp;a&nbsp;page&nbsp;when&nbsp;looking&nbsp;at&nbsp;its&nbsp;layout.&nbsp;The&nbsp;point&nbsp;of&nbsp;using&nbsp;Lorem&nbsp;Ipsum&nbsp;is&nbsp;that&nbsp;it&nbsp;has&nbsp;a&nbsp;more-or-less&nbsp;normal&nbsp;distribution&nbsp;of&nbsp;letters,&nbsp;as&nbsp;opposed&nbsp;to&nbsp;using&nbsp;&#39;Content&nbsp;here,&nbsp;content&nbsp;here&#39;,&nbsp;making&nbsp;it&nbsp;look&nbsp;like&nbsp;readable&nbsp;English.&nbsp;Many&nbsp;desktop&nbsp;publishing&nbsp;packages&nbsp;and&nbsp;web&nbsp;page&nbsp;editors&nbsp;now&nbsp;use&nbsp;Lorem&nbsp;Ipsum&nbsp;as&nbsp;their&nbsp;default&nbsp;model&nbsp;text,&nbsp;and&nbsp;a&nbsp;search&nbsp;for&nbsp;&#39;lorem&nbsp;ipsum&#39;&nbsp;will&nbsp;uncover&nbsp;many&nbsp;web&nbsp;sites&nbsp;still&nbsp;in&nbsp;their&nbsp;infancy.&nbsp;Various&nbsp;versions&nbsp;have&nbsp;evolved&nbsp;over&nbsp;the&nbsp;years,&nbsp;sometimes&nbsp;by&nbsp;accident,&nbsp;sometimes&nbsp;on&nbsp;purpose&nbsp;(injected&nbsp;humour&nbsp;and&nbsp;the&nbsp;like).</p>', '1777826317_Fi-8wEYUAAAzIc-.jpg', 'jpg', '', 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default mod', '<p>It&nbsp;is&nbsp;a&nbsp;long&nbsp;established&nbsp;fact&nbsp;that&nbsp;a&nbsp;reader&nbsp;will&nbsp;be&nbsp;distracted&nbsp;by&nbsp;the&nbsp;readable&nbsp;content&nbsp;of&nbsp;a&nbsp;page&nbsp;when&nbsp;looking&nbsp;at&nbsp;its&nbsp;layout.&nbsp;The&nbsp;point&nbsp;of&nbsp;using&nbsp;Lorem&nbsp;Ipsum&nbsp;is&nbsp;that&nbsp;it&nbsp;has&nbsp;a&nbsp;more-or-less&nbsp;normal&nbsp;distribution&nbsp;of&nbsp;letters,&nbsp;as&nbsp;opposed&nbsp;to&nbsp;using&nbsp;&#39;Content&nbsp;here,&nbsp;content&nbsp;here&#39;,&nbsp;making&nbsp;it&nbsp;look&nbsp;like&nbsp;readable&nbsp;English.&nbsp;Many&nbsp;desktop&nbsp;publishing&nbsp;packages&nbsp;and&nbsp;web&nbsp;page&nbsp;editors&nbsp;now&nbsp;use&nbsp;Lorem&nbsp;Ipsum&nbsp;as&nbsp;their&nbsp;default&nbsp;model&nbsp;text,&nbsp;and&nbsp;a&nbsp;search&nbsp;for&nbsp;&#39;lorem&nbsp;ipsum&#39;&nbsp;will&nbsp;uncover&nbsp;many&nbsp;web&nbsp;sites&nbsp;still&nbsp;in&nbsp;their&nbsp;infancy.&nbsp;Various&nbsp;versions&nbsp;have&nbsp;evolved&nbsp;over&nbsp;the&nbsp;years,&nbsp;sometimes&nbsp;by&nbsp;accident,&nbsp;sometimes&nbsp;on&nbsp;purpose&nbsp;(injected&nbsp;humour&nbsp;and&nbsp;the&nbsp;like).</p><p></p><p>It&nbsp;is&nbsp;a&nbsp;long&nbsp;established&nbsp;fact&nbsp;that&nbsp;a&nbsp;reader&nbsp;will&nbsp;be&nbsp;distracted&nbsp;by&nbsp;the&nbsp;readable&nbsp;content&nbsp;of&nbsp;a&nbsp;page&nbsp;when&nbsp;looking&nbsp;at&nbsp;its&nbsp;layout.&nbsp;The&nbsp;point&nbsp;of&nbsp;using&nbsp;Lorem&nbsp;Ipsum&nbsp;is&nbsp;that&nbsp;it&nbsp;has&nbsp;a&nbsp;more-or-less&nbsp;normal&nbsp;distribution&nbsp;of&nbsp;letters,&nbsp;as&nbsp;opposed&nbsp;to&nbsp;using&nbsp;&#39;Content&nbsp;here,&nbsp;content&nbsp;here&#39;,&nbsp;making&nbsp;it&nbsp;look&nbsp;like&nbsp;readable&nbsp;English.&nbsp;Many&nbsp;desktop&nbsp;publishing&nbsp;packages&nbsp;and&nbsp;web&nbsp;page&nbsp;editors&nbsp;now&nbsp;use&nbsp;Lorem&nbsp;Ipsum&nbsp;as&nbsp;their&nbsp;default&nbsp;model&nbsp;text,&nbsp;and&nbsp;a&nbsp;search&nbsp;for&nbsp;&#39;lorem&nbsp;ipsum&#39;&nbsp;will&nbsp;uncover&nbsp;many&nbsp;web&nbsp;sites&nbsp;still&nbsp;in&nbsp;their&nbsp;infancy.&nbsp;Various&nbsp;versions&nbsp;have&nbsp;evolved&nbsp;over&nbsp;the&nbsp;years,&nbsp;sometimes&nbsp;by&nbsp;accident,&nbsp;sometimes&nbsp;on&nbsp;purpose&nbsp;(injected&nbsp;humour&nbsp;and&nbsp;the&nbsp;like).</p>', '1777826329_Fi-8wEYUAAAzIc-.jpg', 'jpg', '', 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default mod', '<p>It&nbsp;is&nbsp;a&nbsp;long&nbsp;established&nbsp;fact&nbsp;that&nbsp;a&nbsp;reader&nbsp;will&nbsp;be&nbsp;distracted&nbsp;by&nbsp;the&nbsp;readable&nbsp;content&nbsp;of&nbsp;a&nbsp;page&nbsp;when&nbsp;looking&nbsp;at&nbsp;its&nbsp;layout.&nbsp;The&nbsp;point&nbsp;of&nbsp;using&nbsp;Lorem&nbsp;Ipsum&nbsp;is&nbsp;that&nbsp;it&nbsp;has&nbsp;a&nbsp;more-or-less&nbsp;normal&nbsp;distribution&nbsp;of&nbsp;letters,&nbsp;as&nbsp;opposed&nbsp;to&nbsp;using&nbsp;&#39;Content&nbsp;here,&nbsp;content&nbsp;here&#39;,&nbsp;making&nbsp;it&nbsp;look&nbsp;like&nbsp;readable&nbsp;English.&nbsp;Many&nbsp;desktop&nbsp;publishing&nbsp;packages&nbsp;and&nbsp;web&nbsp;page&nbsp;editors&nbsp;now&nbsp;use&nbsp;Lorem&nbsp;Ipsum&nbsp;as&nbsp;their&nbsp;default&nbsp;model&nbsp;text,&nbsp;and&nbsp;a&nbsp;search&nbsp;for&nbsp;&#39;lorem&nbsp;ipsum&#39;&nbsp;will&nbsp;uncover&nbsp;many&nbsp;web&nbsp;sites&nbsp;still&nbsp;in&nbsp;their&nbsp;infancy.&nbsp;Various&nbsp;versions&nbsp;have&nbsp;evolved&nbsp;over&nbsp;the&nbsp;years,&nbsp;sometimes&nbsp;by&nbsp;accident,&nbsp;sometimes&nbsp;on&nbsp;purpose&nbsp;(injected&nbsp;humour&nbsp;and&nbsp;the&nbsp;like).</p><p></p><p>It&nbsp;is&nbsp;a&nbsp;long&nbsp;established&nbsp;fact&nbsp;that&nbsp;a&nbsp;reader&nbsp;will&nbsp;be&nbsp;distracted&nbsp;by&nbsp;the&nbsp;readable&nbsp;content&nbsp;of&nbsp;a&nbsp;page&nbsp;when&nbsp;looking&nbsp;at&nbsp;its&nbsp;layout.&nbsp;The&nbsp;point&nbsp;of&nbsp;using&nbsp;Lorem&nbsp;Ipsum&nbsp;is&nbsp;that&nbsp;it&nbsp;has&nbsp;a&nbsp;more-or-less&nbsp;normal&nbsp;distribution&nbsp;of&nbsp;letters,&nbsp;as&nbsp;opposed&nbsp;to&nbsp;using&nbsp;&#39;Content&nbsp;here,&nbsp;content&nbsp;here&#39;,&nbsp;making&nbsp;it&nbsp;look&nbsp;like&nbsp;readable&nbsp;English.&nbsp;Many&nbsp;desktop&nbsp;publishing&nbsp;packages&nbsp;and&nbsp;web&nbsp;page&nbsp;editors&nbsp;now&nbsp;use&nbsp;Lorem&nbsp;Ipsum&nbsp;as&nbsp;their&nbsp;default&nbsp;model&nbsp;text,&nbsp;and&nbsp;a&nbsp;search&nbsp;for&nbsp;&#39;lorem&nbsp;ipsum&#39;&nbsp;will&nbsp;uncover&nbsp;many&nbsp;web&nbsp;sites&nbsp;still&nbsp;in&nbsp;their&nbsp;infancy.&nbsp;Various&nbsp;versions&nbsp;have&nbsp;evolved&nbsp;over&nbsp;the&nbsp;years,&nbsp;sometimes&nbsp;by&nbsp;accident,&nbsp;sometimes&nbsp;on&nbsp;purpose&nbsp;(injected&nbsp;humour&nbsp;and&nbsp;the&nbsp;like).</p>', '1777826339_Fi-8wEYUAAAzIc-.jpg', 'jpg', '', 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default mod', '<p>It&nbsp;is&nbsp;a&nbsp;long&nbsp;established&nbsp;fact&nbsp;that&nbsp;a&nbsp;reader&nbsp;will&nbsp;be&nbsp;distracted&nbsp;by&nbsp;the&nbsp;readable&nbsp;content&nbsp;of&nbsp;a&nbsp;page&nbsp;when&nbsp;looking&nbsp;at&nbsp;its&nbsp;layout.&nbsp;The&nbsp;point&nbsp;of&nbsp;using&nbsp;Lorem&nbsp;Ipsum&nbsp;is&nbsp;that&nbsp;it&nbsp;has&nbsp;a&nbsp;more-or-less&nbsp;normal&nbsp;distribution&nbsp;of&nbsp;letters,&nbsp;as&nbsp;opposed&nbsp;to&nbsp;using&nbsp;&#39;Content&nbsp;here,&nbsp;content&nbsp;here&#39;,&nbsp;making&nbsp;it&nbsp;look&nbsp;like&nbsp;readable&nbsp;English.&nbsp;Many&nbsp;desktop&nbsp;publishing&nbsp;packages&nbsp;and&nbsp;web&nbsp;page&nbsp;editors&nbsp;now&nbsp;use&nbsp;Lorem&nbsp;Ipsum&nbsp;as&nbsp;their&nbsp;default&nbsp;model&nbsp;text,&nbsp;and&nbsp;a&nbsp;search&nbsp;for&nbsp;&#39;lorem&nbsp;ipsum&#39;&nbsp;will&nbsp;uncover&nbsp;many&nbsp;web&nbsp;sites&nbsp;still&nbsp;in&nbsp;their&nbsp;infancy.&nbsp;Various&nbsp;versions&nbsp;have&nbsp;evolved&nbsp;over&nbsp;the&nbsp;years,&nbsp;sometimes&nbsp;by&nbsp;accident,&nbsp;sometimes&nbsp;on&nbsp;purpose&nbsp;(injected&nbsp;humour&nbsp;and&nbsp;the&nbsp;like).</p><p></p><p>It&nbsp;is&nbsp;a&nbsp;long&nbsp;established&nbsp;fact&nbsp;that&nbsp;a&nbsp;reader&nbsp;will&nbsp;be&nbsp;distracted&nbsp;by&nbsp;the&nbsp;readable&nbsp;content&nbsp;of&nbsp;a&nbsp;page&nbsp;when&nbsp;looking&nbsp;at&nbsp;its&nbsp;layout.&nbsp;The&nbsp;point&nbsp;of&nbsp;using&nbsp;Lorem&nbsp;Ipsum&nbsp;is&nbsp;that&nbsp;it&nbsp;has&nbsp;a&nbsp;more-or-less&nbsp;normal&nbsp;distribution&nbsp;of&nbsp;letters,&nbsp;as&nbsp;opposed&nbsp;to&nbsp;using&nbsp;&#39;Content&nbsp;here,&nbsp;content&nbsp;here&#39;,&nbsp;making&nbsp;it&nbsp;look&nbsp;like&nbsp;readable&nbsp;English.&nbsp;Many&nbsp;desktop&nbsp;publishing&nbsp;packages&nbsp;and&nbsp;web&nbsp;page&nbsp;editors&nbsp;now&nbsp;use&nbsp;Lorem&nbsp;Ipsum&nbsp;as&nbsp;their&nbsp;default&nbsp;model&nbsp;text,&nbsp;and&nbsp;a&nbsp;search&nbsp;for&nbsp;&#39;lorem&nbsp;ipsum&#39;&nbsp;will&nbsp;uncover&nbsp;many&nbsp;web&nbsp;sites&nbsp;still&nbsp;in&nbsp;their&nbsp;infancy.&nbsp;Various&nbsp;versions&nbsp;have&nbsp;evolved&nbsp;over&nbsp;the&nbsp;years,&nbsp;sometimes&nbsp;by&nbsp;accident,&nbsp;sometimes&nbsp;on&nbsp;purpose&nbsp;(injected&nbsp;humour&nbsp;and&nbsp;the&nbsp;like).</p>', '1777826359_Fi-8wEYUAAAzIc-.jpg', 'jpg', '', 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default mod', '<p>It&nbsp;is&nbsp;a&nbsp;long&nbsp;established&nbsp;fact&nbsp;that&nbsp;a&nbsp;reader&nbsp;will&nbsp;be&nbsp;distracted&nbsp;by&nbsp;the&nbsp;readable&nbsp;content&nbsp;of&nbsp;a&nbsp;page&nbsp;when&nbsp;looking&nbsp;at&nbsp;its&nbsp;layout.&nbsp;The&nbsp;point&nbsp;of&nbsp;using&nbsp;Lorem&nbsp;Ipsum&nbsp;is&nbsp;that&nbsp;it&nbsp;has&nbsp;a&nbsp;more-or-less&nbsp;normal&nbsp;distribution&nbsp;of&nbsp;letters,&nbsp;as&nbsp;opposed&nbsp;to&nbsp;using&nbsp;&#39;Content&nbsp;here,&nbsp;content&nbsp;here&#39;,&nbsp;making&nbsp;it&nbsp;look&nbsp;like&nbsp;readable&nbsp;English.&nbsp;Many&nbsp;desktop&nbsp;publishing&nbsp;packages&nbsp;and&nbsp;web&nbsp;page&nbsp;editors&nbsp;now&nbsp;use&nbsp;Lorem&nbsp;Ipsum&nbsp;as&nbsp;their&nbsp;default&nbsp;model&nbsp;text,&nbsp;and&nbsp;a&nbsp;search&nbsp;for&nbsp;&#39;lorem&nbsp;ipsum&#39;&nbsp;will&nbsp;uncover&nbsp;many&nbsp;web&nbsp;sites&nbsp;still&nbsp;in&nbsp;their&nbsp;infancy.&nbsp;Various&nbsp;versions&nbsp;have&nbsp;evolved&nbsp;over&nbsp;the&nbsp;years,&nbsp;sometimes&nbsp;by&nbsp;accident,&nbsp;sometimes&nbsp;on&nbsp;purpose&nbsp;(injected&nbsp;humour&nbsp;and&nbsp;the&nbsp;like).</p><p></p><p>It&nbsp;is&nbsp;a&nbsp;long&nbsp;established&nbsp;fact&nbsp;that&nbsp;a&nbsp;reader&nbsp;will&nbsp;be&nbsp;distracted&nbsp;by&nbsp;the&nbsp;readable&nbsp;content&nbsp;of&nbsp;a&nbsp;page&nbsp;when&nbsp;looking&nbsp;at&nbsp;its&nbsp;layout.&nbsp;The&nbsp;point&nbsp;of&nbsp;using&nbsp;Lorem&nbsp;Ipsum&nbsp;is&nbsp;that&nbsp;it&nbsp;has&nbsp;a&nbsp;more-or-less&nbsp;normal&nbsp;distribution&nbsp;of&nbsp;letters,&nbsp;as&nbsp;opposed&nbsp;to&nbsp;using&nbsp;&#39;Content&nbsp;here,&nbsp;content&nbsp;here&#39;,&nbsp;making&nbsp;it&nbsp;look&nbsp;like&nbsp;readable&nbsp;English.&nbsp;Many&nbsp;desktop&nbsp;publishing&nbsp;packages&nbsp;and&nbsp;web&nbsp;page&nbsp;editors&nbsp;now&nbsp;use&nbsp;Lorem&nbsp;Ipsum&nbsp;as&nbsp;their&nbsp;default&nbsp;model&nbsp;text,&nbsp;and&nbsp;a&nbsp;search&nbsp;for&nbsp;&#39;lorem&nbsp;ipsum&#39;&nbsp;will&nbsp;uncover&nbsp;many&nbsp;web&nbsp;sites&nbsp;still&nbsp;in&nbsp;their&nbsp;infancy.&nbsp;Various&nbsp;versions&nbsp;have&nbsp;evolved&nbsp;over&nbsp;the&nbsp;years,&nbsp;sometimes&nbsp;by&nbsp;accident,&nbsp;sometimes&nbsp;on&nbsp;purpose&nbsp;(injected&nbsp;humour&nbsp;and&nbsp;the&nbsp;like).</p>', '1777826369_Fi-8wEYUAAAzIc-.jpg', 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default mod', '<p>It&nbsp;is&nbsp;a&nbsp;long&nbsp;established&nbsp;fact&nbsp;that&nbsp;a&nbsp;reader&nbsp;will&nbsp;be&nbsp;distracted&nbsp;by&nbsp;the&nbsp;readable&nbsp;content&nbsp;of&nbsp;a&nbsp;page&nbsp;when&nbsp;looking&nbsp;at&nbsp;its&nbsp;layout.&nbsp;The&nbsp;point&nbsp;of&nbsp;using&nbsp;Lorem&nbsp;Ipsum&nbsp;is&nbsp;that&nbsp;it&nbsp;has&nbsp;a&nbsp;more-or-less&nbsp;normal&nbsp;distribution&nbsp;of&nbsp;letters,&nbsp;as&nbsp;opposed&nbsp;to&nbsp;using&nbsp;&#39;Content&nbsp;here,&nbsp;content&nbsp;here&#39;,&nbsp;making&nbsp;it&nbsp;look&nbsp;like&nbsp;readable&nbsp;English.&nbsp;Many&nbsp;desktop&nbsp;publishing&nbsp;packages&nbsp;and&nbsp;web&nbsp;page&nbsp;editors&nbsp;now&nbsp;use&nbsp;Lorem&nbsp;Ipsum&nbsp;as&nbsp;their&nbsp;default&nbsp;model&nbsp;text,&nbsp;and&nbsp;a&nbsp;search&nbsp;for&nbsp;&#39;lorem&nbsp;ipsum&#39;&nbsp;will&nbsp;uncover&nbsp;many&nbsp;web&nbsp;sites&nbsp;still&nbsp;in&nbsp;their&nbsp;infancy.&nbsp;Various&nbsp;versions&nbsp;have&nbsp;evolved&nbsp;over&nbsp;the&nbsp;years,&nbsp;sometimes&nbsp;by&nbsp;accident,&nbsp;sometimes&nbsp;on&nbsp;purpose&nbsp;(injected&nbsp;humour&nbsp;and&nbsp;the&nbsp;like).</p><p></p><p>It&nbsp;is&nbsp;a&nbsp;long&nbsp;established&nbsp;fact&nbsp;that&nbsp;a&nbsp;reader&nbsp;will&nbsp;be&nbsp;distracted&nbsp;by&nbsp;the&nbsp;readable&nbsp;content&nbsp;of&nbsp;a&nbsp;page&nbsp;when&nbsp;looking&nbsp;at&nbsp;its&nbsp;layout.&nbsp;The&nbsp;point&nbsp;of&nbsp;using&nbsp;Lorem&nbsp;Ipsum&nbsp;is&nbsp;that&nbsp;it&nbsp;has&nbsp;a&nbsp;more-or-less&nbsp;normal&nbsp;distribution&nbsp;of&nbsp;letters,&nbsp;as&nbsp;opposed&nbsp;to&nbsp;using&nbsp;&#39;Content&nbsp;here,&nbsp;content&nbsp;here&#39;,&nbsp;making&nbsp;it&nbsp;look&nbsp;like&nbsp;readable&nbsp;English.&nbsp;Many&nbsp;desktop&nbsp;publishing&nbsp;packages&nbsp;and&nbsp;web&nbsp;page&nbsp;editors&nbsp;now&nbsp;use&nbsp;Lorem&nbsp;Ipsum&nbsp;as&nbsp;their&nbsp;default&nbsp;model&nbsp;text,&nbsp;and&nbsp;a&nbsp;search&nbsp;for&nbsp;&#39;lorem&nbsp;ipsum&#39;&nbsp;will&nbsp;uncover&nbsp;many&nbsp;web&nbsp;sites&nbsp;still&nbsp;in&nbsp;their&nbsp;infancy.&nbsp;Various&nbsp;versions&nbsp;have&nbsp;evolved&nbsp;over&nbsp;the&nbsp;years,&nbsp;sometimes&nbsp;by&nbsp;accident,&nbsp;sometimes&nbsp;on&nbsp;purpose&nbsp;(injected&nbsp;humour&nbsp;and&nbsp;the&nbsp;like).</p>', 'jpg', '');

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
(56, 'ae063bbdaea65cdf', '4ca00ec0a1d17301', 'cinelounge.mita.in', '', '1777823039_studiojeilogo.png', '1777823046_studiojeilogo-fevicon.png', '1');

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
(1, '24f448dcf6d45a54', '4ca00ec0a1d17301', 'cinelounge.mita.in', '', 'CineLux'),
(2, 'db5cd4b4d9948da9', '4ca00ec0a1d17301', 'cinelounge.mita.in', '', 'CineLux');

-- --------------------------------------------------------

--
-- Table structure for table `cinelux_blog`
--

CREATE TABLE `cinelux_blog` (
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

--
-- Dumping data for table `cinelux_blog`
--

INSERT INTO `cinelux_blog` (`id`, `bid`, `profile_id`, `subdomain`, `domain`, `title`, `tag`, `description`, `content`, `blog_img`, `status`, `created_at`) VALUES
(1, 'BLG001', '4ca00ec0a1d17301', 'cinelounge.mita.in', '', '5 Reasons Why Private Theatre Experiences Are Trending in 2026', 'Private Theatre,Experience,Trending', 'Discover why more people are choosing private theatre bookings over traditional cinemas for birthdays, anniversaries, and corporate events.', '<p>Private theatre bookings have seen an explosive rise in popularity over the past two years. Here\'s why:</p><p><strong>1. Complete Privacy</strong> â€“ No strangers, no disturbances. Just you and your guests enjoying an exclusive experience.</p><p><strong>2. Customisation</strong> â€“ From decor themes to movie choices, everything is tailored to your preference.</p><p><strong>3. Celebration-Ready</strong> â€“ Private theatres are perfect for birthdays, anniversaries, proposals, and more.</p><p><strong>4. Corporate Use</strong> â€“ Businesses use private screens for high-impact presentations, team outings, and client meetings.</p><p><strong>5. Affordable Luxury</strong> â€“ With packages starting under â‚¹2000, private theatre experiences are surprisingly accessible.</p>', '', 1, '2026-04-01 10:00:00'),
(2, 'BLG002', '4ca00ec0a1d17301', 'cinelounge.mita.in', '', 'How to Plan the Perfect Birthday Surprise at a Private Theatre', 'Birthday,Private Theatre,Planning Tips', 'Planning a birthday surprise at a private theatre? Here is everything you need to know to make it unforgettable.', '<p>A birthday surprise at a private theatre is one of the most memorable gifts you can give. Here\'s a step-by-step guide:</p><p><strong>Step 1: Book Early</strong> â€“ Private theatres fill up fast, especially on weekends. Book at least a week in advance.</p><p><strong>Step 2: Choose a Movie</strong> â€“ Pick the birthday person\'s favourite movie or a new blockbuster they\'ve been wanting to see.</p><p><strong>Step 3: Add Decor</strong> â€“ Balloons, flowers, banners, and a personalised on-screen message make all the difference.</p><p><strong>Step 4: Arrange a Cake</strong> â€“ Coordinate with the theatre team to bring in a custom cake.</p><p><strong>Step 5: Invite the Right People</strong> â€“ Keep the guest list intimate for a truly personal experience.</p>', '', 1, '2026-04-10 14:00:00'),
(3, 'BLG003', '4ca00ec0a1d17301', 'cinelounge.mita.in', '', 'Proposal on the Big Screen: Make It a Moment to Remember Forever', 'Proposal,Romance,Private Theatre', 'Planning to propose? Make it magical with a big-screen surprise at CineLux Private Theatre.', '<p>A marriage proposal is one of the most significant moments in a person\'s life. Why not make it extraordinary?</p><p>At CineLux, we help you plan the perfect proposal setup:</p><ul><li>Customised on-screen message before the movie starts</li><li>Rose petal decoration and soft lighting</li><li>Champagne and chocolates ready on your arrival</li><li>Discreet staff who know exactly when to step away</li></ul><p>Our Proposal Night package is designed to give you the perfect setting to pop the question. Many couples have walked out of CineLux engaged â€” and smiling. Make your story one for the ages.</p>', '', 1, '2026-04-20 09:30:00'),
(4, 'BLG004', '4ca00ec0a1d17301', 'cinelounge.mita.in', '', 'Why IPL Screenings at Private Theatres Beat Watching at Home', 'IPL,Sports,Big Screen', 'Experience the thrill of IPL on a massive 4K screen with your cricket gang. Here\'s why private theatre screenings are better than watching at home.', '<p>Cricket fever is real, and watching IPL at home on a small screen just doesn\'t do justice to the excitement. Here\'s why booking a private theatre for IPL screenings is a game-changer:</p><p><strong>Massive 4K Screen</strong> â€“ Every boundary looks stunning on a 150-inch 4K display.</p><p><strong>Surround Sound</strong> â€“ Feel the roar of the crowd with cinema-grade audio.</p><p><strong>Your Rules</strong> â€“ Scream, cheer, and celebrate without any restrictions.</p><p><strong>Group Experience</strong> â€“ Bring your cricket gang for an electric atmosphere that rivals being at the stadium.</p>', '', 1, '2026-04-28 11:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `cinelux_bookings`
--

CREATE TABLE `cinelux_bookings` (
  `id` int(11) NOT NULL,
  `bid` varchar(16) COLLATE utf8mb4_unicode_ci NOT NULL,
  `profile_id` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `subdomain` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `domain` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `customer_name` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `customer_ph` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `customer_email` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `service_id` varchar(32) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `service_name` varchar(300) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `booking_date` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `booking_time` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `notes` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cinelux_bookings`
--

INSERT INTO `cinelux_bookings` (`id`, `bid`, `profile_id`, `subdomain`, `domain`, `customer_name`, `customer_ph`, `customer_email`, `service_id`, `service_name`, `booking_date`, `booking_time`, `notes`, `status`, `created_at`) VALUES
(1, 'BK0000000000001', '4ca00ec0a1d17301', 'cinelounge.mita.in', '', 'Arjun Sharma', '9876543210', 'arjun.sharma@gmail.com', 'SVC001', 'Birthday Surprise Package', '2026-04-10', '06:00 PM', 'Please arrange blue balloons and a chocolate cake', 'completed', '2026-04-08 10:00:00'),
(2, 'BK0000000000002', '4ca00ec0a1d17301', 'cinelounge.mita.in', '', 'Priya Nair', '9876541234', 'priya.nair@gmail.com', 'SVC003', 'Anniversary Celebration', '2026-04-15', '07:00 PM', 'Rose petals and candles please', 'completed', '2026-04-12 11:30:00'),
(3, 'BK0000000000003', '4ca00ec0a1d17301', 'cinelounge.mita.in', '', 'Karthik Rajan', '9865432109', 'karthik.rajan@gmail.com', 'SVC004', 'IPL & Live Sports Screening', '2026-04-20', '07:30 PM', 'MI vs CSK match - need snacks arranged', 'completed', '2026-04-18 14:00:00'),
(4, 'BK0000000000004', '4ca00ec0a1d17301', 'cinelounge.mita.in', '', 'Deepika Menon', '9845321098', 'deepika.menon@gmail.com', 'SVC007', 'Kids Birthday Party', '2026-05-02', '03:00 PM', 'My son loves Minions, please play Minions movie', 'confirmed', '2026-04-28 16:30:00'),
(5, 'BK0000000000005', '4ca00ec0a1d17301', 'cinelounge.mita.in', '', 'Vikram Patel', '9834210987', 'vikram.patel@gmail.com', 'SVC006', 'Office Meeting & Presentation', '2026-05-10', '10:00 AM', 'Q2 results presentation, need HDMI and whiteboard', 'confirmed', '2026-05-01 09:00:00'),
(6, 'BK0000000000006', '4ca00ec0a1d17301', 'cinelounge.mita.in', '', 'Sneha Krishnan', '9823109876', 'sneha.krishnan@gmail.com', 'SVC008', 'Proposal Night', '2026-05-14', '08:00 PM', 'Surprise proposal - please keep it a secret!', 'pending', '2026-05-05 12:00:00'),
(7, 'BK0000000000007', '4ca00ec0a1d17301', 'cinelounge.mita.in', '', 'Rohit Verma', '9812098765', 'rohit.verma@gmail.com', 'SVC002', 'Movie Night with Friends', '2026-05-18', '08:30 PM', 'Group of 12, we want to watch Avengers', 'pending', '2026-05-03 17:00:00'),
(8, 'BK0000000000008', '4ca00ec0a1d17301', 'cinelounge.mita.in', '', 'Ananya Bose', '9801987654', 'ananya.bose@gmail.com', 'SVC009', 'Farewell & Reunion Party', '2026-04-30', '06:30 PM', 'School reunion - 20 people, please arrange a slideshow setup', 'completed', '2026-04-25 13:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `cinelux_business_info`
--

CREATE TABLE `cinelux_business_info` (
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

--
-- Dumping data for table `cinelux_business_info`
--

INSERT INTO `cinelux_business_info` (`profile_id`, `subdomain`, `domain`, `business_name`, `address`, `phone`, `email`, `open_time`, `close_time`, `about`, `instagram`, `facebook`, `created_at`, `updated_at`) VALUES
('4ca00ec0a1d17301', 'cinelounge.mita.in', '', 'CineLux Private Theatre', '15, Nehru Street, Anna Nagar, Chennai - 600040, Tamil Nadu, India', '+91 98765 43000', 'hello@cinelounge.in', '10:00 AM', '11:00 PM', 'CineLux is Chennai\'s premier private mini theatre booking destination. We offer fully private, luxuriously designed screening rooms for birthday surprises, anniversary celebrations, proposals, corporate meetings, and more. Every experience at CineLux is crafted to be unforgettable.', 'https://www.instagram.com/cinelux', 'https://www.facebook.com/cinelux', '2026-05-07 01:01:01', '2026-05-07 01:01:01');

-- --------------------------------------------------------

--
-- Table structure for table `cinelux_customers`
--

CREATE TABLE `cinelux_customers` (
  `id` int(11) NOT NULL,
  `profile_id` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `subdomain` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `domain` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `customer_name` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `customer_ph` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `customer_email` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cinelux_customers`
--

INSERT INTO `cinelux_customers` (`id`, `profile_id`, `subdomain`, `domain`, `customer_name`, `customer_ph`, `customer_email`, `created_at`) VALUES
(1, '4ca00ec0a1d17301', 'cinelounge.mita.in', '', 'Arjun Sharma', '9876543210', 'arjun.sharma@gmail.com', '2026-04-01 10:00:00'),
(2, '4ca00ec0a1d17301', 'cinelounge.mita.in', '', 'Priya Nair', '9876541234', 'priya.nair@gmail.com', '2026-04-05 11:30:00'),
(3, '4ca00ec0a1d17301', 'cinelounge.mita.in', '', 'Karthik Rajan', '9865432109', 'karthik.rajan@gmail.com', '2026-04-10 14:00:00'),
(4, '4ca00ec0a1d17301', 'cinelounge.mita.in', '', 'Deepika Menon', '9845321098', 'deepika.menon@gmail.com', '2026-04-12 16:30:00'),
(5, '4ca00ec0a1d17301', 'cinelounge.mita.in', '', 'Vikram Patel', '9834210987', 'vikram.patel@gmail.com', '2026-04-15 09:00:00'),
(6, '4ca00ec0a1d17301', 'cinelounge.mita.in', '', 'Sneha Krishnan', '9823109876', 'sneha.krishnan@gmail.com', '2026-04-18 12:00:00'),
(7, '4ca00ec0a1d17301', 'cinelounge.mita.in', '', 'Rohit Verma', '9812098765', 'rohit.verma@gmail.com', '2026-04-22 17:00:00'),
(8, '4ca00ec0a1d17301', 'cinelounge.mita.in', '', 'Ananya Bose', '9801987654', 'ananya.bose@gmail.com', '2026-04-28 13:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `cinelux_employees`
--

CREATE TABLE `cinelux_employees` (
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

--
-- Dumping data for table `cinelux_employees`
--

INSERT INTO `cinelux_employees` (`id`, `eid`, `profile_id`, `subdomain`, `domain`, `name`, `email`, `phone`, `address`, `id_proof`, `profile_pic`, `father_name`, `mother_name`, `emergency_contact`, `blood_group`, `username`, `password`, `status`, `created_at`) VALUES
(1, '563fda76005970ad', '4ca00ec0a1d17301', 'cinelounge.mita.in', '', 'chandru', 'chandru@gmail.com', '8989878767', 'dindigul', '', '', 'marimuthu', 'deivani', '9898787787', 'A-', 'chandru', '$2y$12$vWkGeWsNPi3BjKEGr.MYdOfS0QAMaeNWZIonjWRJoBdHuMY.7SKNq', 'active', '2026-05-04 05:17:45');

-- --------------------------------------------------------

--
-- Table structure for table `cinelux_emp_customers`
--

CREATE TABLE `cinelux_emp_customers` (
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

--
-- Dumping data for table `cinelux_emp_customers`
--

INSERT INTO `cinelux_emp_customers` (`id`, `ecid`, `eid`, `profile_id`, `subdomain`, `customer_name`, `customer_phone`, `customer_email`, `notes`, `created_at`) VALUES
(1, '758e404eaf458060', '563fda76005970ad', '4ca00ec0a1d17301', 'studiosalon.mita.in', 'CHANDRASEKAR M', '+918098111311', 'chandrasekar8992@gmail.com', 'RM Colony', '2026-05-04 05:21:42');

-- --------------------------------------------------------

--
-- Table structure for table `cinelux_emp_ratings`
--

CREATE TABLE `cinelux_emp_ratings` (
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

--
-- Dumping data for table `cinelux_emp_ratings`
--

INSERT INTO `cinelux_emp_ratings` (`id`, `rid`, `eid`, `ecid`, `profile_id`, `subdomain`, `q1`, `q2`, `q3`, `q4`, `q5`, `overall`, `remarks`, `created_at`) VALUES
(1, '90657c2f46049e9b', '563fda76005970ad', '758e404eaf458060', '4ca00ec0a1d17301', 'studiosalon.mita.in', 1, 3, 3, 3, 3, '2.6', 'good', '2026-05-04 05:27:57');

-- --------------------------------------------------------

--
-- Table structure for table `cinelux_enquiries`
--

CREATE TABLE `cinelux_enquiries` (
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
-- Table structure for table `cinelux_events`
--

CREATE TABLE `cinelux_events` (
  `id` int(11) NOT NULL,
  `eid` varchar(255) NOT NULL,
  `profile_id` varchar(255) NOT NULL,
  `subdomain` varchar(255) NOT NULL,
  `domain` varchar(255) NOT NULL,
  `event_title` varchar(255) NOT NULL,
  `event_banner` varchar(255) DEFAULT NULL,
  `event_date` date DEFAULT NULL,
  `event_time` varchar(20) DEFAULT NULL,
  `guest_name` varchar(255) DEFAULT NULL,
  `guest_email` varchar(255) DEFAULT NULL,
  `guest_phone` varchar(255) DEFAULT NULL,
  `description` text,
  `status` tinyint(1) DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `cinelux_events`
--

INSERT INTO `cinelux_events` (`id`, `eid`, `profile_id`, `subdomain`, `domain`, `event_title`, `event_banner`, `event_date`, `event_time`, `guest_name`, `guest_email`, `guest_phone`, `description`, `status`, `created_at`) VALUES
(1, 'EVT001', '4ca00ec0a1d17301', 'cinelounge.mita.in', '', 'Indie Film Showcase 2026', '', '2026-05-25', '06:00 PM', 'Director Ramesh Kumar', 'ramesh@indiefilms.in', '9988776655', 'A curated evening of independent short films by emerging Tamil filmmakers. Enjoy powerful storytelling, post-screening Q&A with directors, and networking with the film community.', 1, '2026-05-06 19:31:01'),
(2, 'EVT002', '4ca00ec0a1d17301', 'cinelounge.mita.in', '', 'IPL Finals Mega Screening', '', '2026-05-07', '07:30 PM', 'CineLux Team', 'events@cinelounge.in', '9876543000', 'Watch the IPL Finals live on our massive 4K screen! Enjoy the most thrilling cricket match of the season with fellow fans. Snacks and beverages available. Limited seats â€” book fast!', 1, '2026-05-06 19:31:01'),
(3, 'EVT003', '4ca00ec0a1d17301', 'cinelounge.mita.in', '', 'Valentine Week Couples Night', '', '2026-02-14', '07:00 PM', 'CineLux Events', 'events@cinelounge.in', '9876543000', 'A magical evening for couples â€” romantic movie screening, rose decoration, candle light ambience, and a complimentary surprise for every couple. Re-live the magic of your love story.', 1, '2026-05-06 19:31:01'),
(4, 'EVT004', '4ca00ec0a1d17301', 'cinelounge.mita.in', '', 'Kids Animation Festival', '', '2026-03-22', '03:00 PM', 'CineLux Events', 'events@cinelounge.in', '9876543000', 'A full afternoon of back-to-back animated classics for your little ones! Face painting, balloon art, and fun activities before the screening. A day the kids will always remember.', 1, '2026-05-06 19:31:01'),
(5, 'EVT005', '4ca00ec0a1d17301', 'cinelounge.mita.in', '', 'Corporate Cinema Night', '', '2026-06-15', '06:30 PM', 'Business Development Team', 'biz@cinelounge.in', '9876500001', 'An exclusive networking evening for business professionals featuring an inspiring documentary followed by open discussions. Complimentary refreshments provided.', 1, '2026-05-06 19:31:01'),
(6, 'EVT006', '4ca00ec0a1d17301', 'cinelounge.mita.in', '', 'Tamil New Year Special Screening', '', '2026-04-14', '05:00 PM', 'CineLux Team', 'events@cinelounge.in', '9876543000', 'Celebrate Tamil New Year with a special classic Tamil film screening. Enjoy festive vibes, traditional sweets, and a memorable evening with your loved ones.', 1, '2026-05-06 19:31:01');

-- --------------------------------------------------------

--
-- Table structure for table `cinelux_event_gallery`
--

CREATE TABLE `cinelux_event_gallery` (
  `id` int(11) NOT NULL,
  `gid` varchar(255) NOT NULL,
  `eid` varchar(255) NOT NULL,
  `profile_id` varchar(255) NOT NULL,
  `file_name` varchar(255) NOT NULL,
  `file_type` varchar(20) NOT NULL DEFAULT 'image',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `cinelux_event_members`
--

CREATE TABLE `cinelux_event_members` (
  `id` int(11) NOT NULL,
  `mid` varchar(255) NOT NULL,
  `eid` varchar(255) NOT NULL,
  `profile_id` varchar(255) NOT NULL,
  `member_name` varchar(255) DEFAULT NULL,
  `member_email` varchar(255) DEFAULT NULL,
  `member_phone` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `cinelux_notifications`
--

CREATE TABLE `cinelux_notifications` (
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
-- Table structure for table `cinelux_reviews`
--

CREATE TABLE `cinelux_reviews` (
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

--
-- Dumping data for table `cinelux_reviews`
--

INSERT INTO `cinelux_reviews` (`id`, `rid`, `profile_id`, `subdomain`, `domain`, `reviewer_name`, `reviewer_ph`, `rating`, `review_text`, `service_name`, `status`, `created_at`) VALUES
(1, 'RVW001', '4ca00ec0a1d17301', 'cinelounge.mita.in', '', 'Arjun Sharma', '9876543210', 5, 'Absolutely fantastic experience! We booked the Birthday Surprise package for my girlfriend and the team at CineLux made everything perfect. The on-screen message, the decor, and the overall ambience were incredible. She was in tears of joy!', 'Birthday Surprise Package', 1, '2026-04-11 10:00:00'),
(2, 'RVW002', '4ca00ec0a1d17301', 'cinelounge.mita.in', '', 'Priya Nair', '9876541234', 5, 'We celebrated our 5th anniversary at CineLux and it was beyond our expectations. The rose petal decor, the romantic lighting, and the private screen made it feel like something out of a movie. Highly recommend the Anniversary Celebration package!', 'Anniversary Celebration', 1, '2026-04-16 09:30:00'),
(3, 'RVW003', '4ca00ec0a1d17301', 'cinelounge.mita.in', '', 'Karthik Rajan', '9865432109', 5, 'Watched the IPL match here with 15 friends and the experience was electric! The 4K screen and surround sound made it feel like we were at the stadium. Will definitely be back for the Finals!', 'IPL & Live Sports Screening', 1, '2026-04-21 08:00:00'),
(4, 'RVW004', '4ca00ec0a1d17301', 'cinelounge.mita.in', '', 'Ananya Bose', '9801987654', 4, 'Had our school reunion farewell party at CineLux. The slideshow setup was seamless and everyone loved the private space. The staff were courteous and helpful throughout. Would have given 5 stars but the parking could be better.', 'Farewell & Reunion Party', 1, '2026-05-01 11:00:00'),
(5, 'RVW005', '4ca00ec0a1d17301', 'cinelounge.mita.in', '', 'Meera Iyer', '9799887766', 5, 'Best place to host a kids birthday party! My son had the time of his life watching Minions on the big screen with his friends. The balloon decor was adorable. Thank you CineLux for making his day so special!', 'Kids Birthday Party', 1, '2026-04-03 13:00:00'),
(6, 'RVW006', '4ca00ec0a1d17301', 'cinelounge.mita.in', '', 'Suresh Babu', '9788776655', 5, 'Used CineLux for our Q1 review presentation. The 4K screen and professional setup made our presentation stand out. The team was very cooperative and accommodating. Excellent value for money!', 'Office Meeting & Presentation', 1, '2026-04-08 15:30:00');

-- --------------------------------------------------------

--
-- Table structure for table `cinelux_services`
--

CREATE TABLE `cinelux_services` (
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
  `total_seats` varchar(20) DEFAULT '',
  `service_img` varchar(255) NOT NULL DEFAULT '',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cinelux_services`
--

INSERT INTO `cinelux_services` (`id`, `sid`, `profile_id`, `subdomain`, `domain`, `service_name`, `category`, `gender`, `description`, `price`, `duration`, `total_seats`, `service_img`, `status`, `created_at`) VALUES
(84, 'a1b1c1d1e1f20001', 'b0e212bb6c992785', 'studiojeisalon369.mita.in', 'studiojeisalon369.com', 'Haircut & Styling', 'Hair Services', 'Women', 'Precision cut and blowout styling.', '₹300–₹500', '45 min', '', '', 1, '2026-05-05 16:59:45'),
(85, 'a1b1c1d1e1f20002', 'b0e212bb6c992785', 'studiojeisalon369.mita.in', 'studiojeisalon369.com', 'Hair Blow Dry', 'Hair Services', 'Women', 'Professional blow dry for a sleek finish.', '₹250', '30 min', '', '', 1, '2026-05-05 16:59:45'),
(86, 'a1b1c1d1e1f20003', 'b0e212bb6c992785', 'studiojeisalon369.mita.in', 'studiojeisalon369.com', 'Hair Straightening', 'Hair Services', 'Women', 'Thermal straightening for silky smooth hair.', '₹1000', '60 min', '', '', 1, '2026-05-05 16:59:45'),
(87, 'a1b1c1d1e1f20004', 'b0e212bb6c992785', 'studiojeisalon369.mita.in', 'studiojeisalon369.com', 'Hair Smoothening', 'Hair Services', 'Women', 'Keratin-based smoothening for frizz-free hair.', '₹2500', '90 min', '', '', 1, '2026-05-05 16:59:45'),
(88, 'a1b1c1d1e1f20005', 'b0e212bb6c992785', 'studiojeisalon369.mita.in', 'studiojeisalon369.com', 'Basic Cleanup', 'Skin & Facial', 'Women', 'Deep cleansing facial for glowing skin.', '₹350', '30 min', '', '', 1, '2026-05-05 16:59:45'),
(89, 'a1b1c1d1e1f20006', 'b0e212bb6c992785', 'studiojeisalon369.mita.in', 'studiojeisalon369.com', 'Fruit Facial', 'Skin & Facial', 'Women', 'Brightening fruit extracts facial treatment.', '₹600', '45 min', '', '', 1, '2026-05-05 16:59:45'),
(90, 'a1b1c1d1e1f20007', 'b0e212bb6c992785', 'studiojeisalon369.mita.in', 'studiojeisalon369.com', 'Gold Facial', 'Skin & Facial', 'Women', 'Luxurious gold-infused anti-ageing facial.', '₹900', '60 min', '', '', 1, '2026-05-05 16:59:45'),
(91, 'a1b1c1d1e1f20008', 'b0e212bb6c992785', 'studiojeisalon369.mita.in', 'studiojeisalon369.com', 'De-Tan Treatment', 'Skin & Facial', 'Women', 'Removes sun tan for even skin tone.', '₹500', '30 min', '', '', 1, '2026-05-05 16:59:45'),
(92, 'a1b1c1d1e1f20009', 'b0e212bb6c992785', 'studiojeisalon369.mita.in', 'studiojeisalon369.com', 'Anti-Acne Facial', 'Skin & Facial', 'Women', 'Targets acne and controls excess oil.', '₹700', '45 min', '', '', 1, '2026-05-05 16:59:45'),
(93, 'a1b1c1d1e1f20010', 'b0e212bb6c992785', 'studiojeisalon369.mita.in', 'studiojeisalon369.com', 'Manicure', 'Nail Care', 'Women', 'Complete nail care and hand treatment.', '₹300', '30 min', '', '', 1, '2026-05-05 16:59:45'),
(94, 'a1b1c1d1e1f20011', 'b0e212bb6c992785', 'studiojeisalon369.mita.in', 'studiojeisalon369.com', 'Pedicure', 'Nail Care', 'Women', 'Foot soak, scrub and nail care treatment.', '₹400', '45 min', '', '', 1, '2026-05-05 16:59:45'),
(95, 'a1b1c1d1e1f20012', 'b0e212bb6c992785', 'studiojeisalon369.mita.in', 'studiojeisalon369.com', 'Nail Extension', 'Nail Care', 'Women', 'Acrylic/gel nail extensions with design.', '₹1200', '60 min', '', '', 1, '2026-05-05 16:59:45'),
(96, 'a1b1c1d1e1f20013', 'b0e212bb6c992785', 'studiojeisalon369.mita.in', 'studiojeisalon369.com', 'Gel Nail Polish', 'Nail Care', 'Women', 'Long-lasting gel polish application.', '₹600', '30 min', '', '', 1, '2026-05-05 16:59:45'),
(97, 'a1b1c1d1e1f20014', 'b0e212bb6c992785', 'studiojeisalon369.mita.in', 'studiojeisalon369.com', 'Party Makeup', 'Makeup', 'Women', 'Full glam party-ready makeup look.', '₹1500', '60 min', '', '', 1, '2026-05-05 16:59:45'),
(98, 'a1b1c1d1e1f20015', 'b0e212bb6c992785', 'studiojeisalon369.mita.in', 'studiojeisalon369.com', 'Eye Makeup', 'Makeup', 'Women', 'Defined eye look with liner, shadow and lashes.', '₹500', '30 min', '', '', 1, '2026-05-05 16:59:45'),
(99, 'a1b1c1d1e1f20016', 'b0e212bb6c992785', 'studiojeisalon369.mita.in', 'studiojeisalon369.com', 'Airbrush Makeup', 'Makeup', 'Women', 'Flawless airbrushed finish for special events.', '₹2500', '90 min', '', '', 1, '2026-05-05 16:59:45'),
(100, 'a1b1c1d1e1f20017', 'b0e212bb6c992785', 'studiojeisalon369.mita.in', 'studiojeisalon369.com', 'Full Body Waxing', 'Body Treatments', 'Women', 'Complete body hair removal with wax.', '₹1200', '90 min', '', '', 1, '2026-05-05 16:59:45'),
(101, 'a1b1c1d1e1f20018', 'b0e212bb6c992785', 'studiojeisalon369.mita.in', 'studiojeisalon369.com', 'Back Polishing', 'Body Treatments', 'Women', 'Exfoliation and polish for smooth back skin.', '₹600', '45 min', '', '', 1, '2026-05-05 16:59:45'),
(102, 'a1b1c1d1e1f20019', 'b0e212bb6c992785', 'studiojeisalon369.mita.in', 'studiojeisalon369.com', 'Body Bleach', 'Body Treatments', 'Women', 'Brightens and evens out full body skin tone.', '₹800', '60 min', '', '', 1, '2026-05-05 16:59:45'),
(103, 'a1b1c1d1e1f20020', 'b0e212bb6c992785', 'studiojeisalon369.mita.in', 'studiojeisalon369.com', 'Bridal Makeup & Hair', 'Bridal Package', 'Women', 'Complete bridal makeover with hair styling.', '₹8000', '180 min', '', '', 1, '2026-05-05 16:59:45'),
(104, 'a1b1c1d1e1f20021', 'b0e212bb6c992785', 'studiojeisalon369.mita.in', 'studiojeisalon369.com', 'Pre-Bridal Package', 'Bridal Package', 'Women', 'Facial, cleanup and grooming before wedding.', '₹4000', '120 min', '', '', 1, '2026-05-05 16:59:45'),
(105, 'a1b1c1d1e1f20022', 'b0e212bb6c992785', 'studiojeisalon369.mita.in', 'studiojeisalon369.com', 'Engagement Makeup', 'Bridal Package', 'Women', 'Elegant makeup for engagement ceremonies.', '₹3000', '90 min', '', '', 1, '2026-05-05 16:59:45'),
(106, 'a1b1c1d1e1f20023', 'b0e212bb6c992785', 'studiojeisalon369.mita.in', 'studiojeisalon369.com', 'Eyebrow Threading', 'Threading & Waxing', 'Women', 'Precise eyebrow shaping by threading.', '₹30', '10 min', '', '', 1, '2026-05-05 16:59:45'),
(107, 'a1b1c1d1e1f20024', 'b0e212bb6c992785', 'studiojeisalon369.mita.in', 'studiojeisalon369.com', 'Upper Lip Threading', 'Threading & Waxing', 'Women', 'Clean upper lip hair removal.', '₹20', '5 min', '', '', 1, '2026-05-05 16:59:45'),
(108, 'a1b1c1d1e1f20025', 'b0e212bb6c992785', 'studiojeisalon369.mita.in', 'studiojeisalon369.com', 'Full Face Threading', 'Threading & Waxing', 'Women', 'Threading for full face including forehead.', '₹80', '20 min', '', '', 1, '2026-05-05 16:59:45'),
(109, 'a1b1c1d1e1f20026', 'b0e212bb6c992785', 'studiojeisalon369.mita.in', 'studiojeisalon369.com', 'Full Arms Waxing', 'Threading & Waxing', 'Women', 'Smooth wax hair removal for full arms.', '₹350', '30 min', '', '', 1, '2026-05-05 16:59:45'),
(110, 'a1b1c1d1e1f20027', 'b0e212bb6c992785', 'studiojeisalon369.mita.in', 'studiojeisalon369.com', 'Full Legs Waxing', 'Threading & Waxing', 'Women', 'Wax hair removal for full legs.', '₹500', '45 min', '', '', 1, '2026-05-05 16:59:45'),
(111, 'a1b1c1d1e1f20028', 'b0e212bb6c992785', 'studiojeisalon369.mita.in', 'studiojeisalon369.com', 'Underarm Waxing', 'Threading & Waxing', 'Women', 'Quick and clean underarm waxing.', '₹200', '15 min', '', '', 1, '2026-05-05 16:59:45'),
(112, 'a1b1c1d1e1f20029', 'b0e212bb6c992785', 'studiojeisalon369.mita.in', 'studiojeisalon369.com', 'Haircut', 'Hair Services', 'Men', 'Classic and modern haircuts.', '₹150', '30 min', '', '', 1, '2026-05-05 16:59:45'),
(113, 'a1b1c1d1e1f20030', 'b0e212bb6c992785', 'studiojeisalon369.mita.in', 'studiojeisalon369.com', 'Hair Wash & Blow Dry', 'Hair Services', 'Men', 'Refreshing hair wash with professional dry.', '₹200', '20 min', '', '', 1, '2026-05-05 16:59:45'),
(114, 'a1b1c1d1e1f20031', 'b0e212bb6c992785', 'studiojeisalon369.mita.in', 'studiojeisalon369.com', 'Kids Haircut', 'Hair Services', 'Men', 'Gentle and fun haircut for children.', '₹100', '20 min', '', '', 1, '2026-05-05 16:59:45'),
(115, 'a1b1c1d1e1f20032', 'b0e212bb6c992785', 'studiojeisalon369.mita.in', 'studiojeisalon369.com', 'Hair Setting', 'Hair Services', 'Men', 'Style setting with gel or wax finish.', '₹100', '15 min', '', '', 1, '2026-05-05 16:59:45'),
(116, 'a1b1c1d1e1f20033', 'b0e212bb6c992785', 'studiojeisalon369.mita.in', 'studiojeisalon369.com', 'Beard Trim & Shape', 'Beard & Shave', 'Men', 'Precise beard trimming and shaping.', '₹150', '20 min', '', '', 1, '2026-05-05 16:59:45'),
(117, 'a1b1c1d1e1f20034', 'b0e212bb6c992785', 'studiojeisalon369.mita.in', 'studiojeisalon369.com', 'Clean Shave', 'Beard & Shave', 'Men', 'Smooth clean shave with hot towel finish.', '₹120', '15 min', '', '', 1, '2026-05-05 16:59:45'),
(118, 'a1b1c1d1e1f20035', 'b0e212bb6c992785', 'studiojeisalon369.mita.in', 'studiojeisalon369.com', 'Beard Color', 'Beard & Shave', 'Men', 'Natural beard coloring for a youthful look.', '₹250', '20 min', '', '', 1, '2026-05-05 16:59:45'),
(119, 'a1b1c1d1e1f20036', 'b0e212bb6c992785', 'studiojeisalon369.mita.in', 'studiojeisalon369.com', 'Men\'s Cleanup', 'Skin & Facial', 'Men', 'Deep cleansing pore cleanup for men.', '₹400', '30 min', '', '', 1, '2026-05-05 16:59:45'),
(120, 'a1b1c1d1e1f20037', 'b0e212bb6c992785', 'studiojeisalon369.mita.in', 'studiojeisalon369.com', 'Men\'s Facial', 'Skin & Facial', 'Men', 'Refreshing facial for men\'s skin.', '₹600', '45 min', '', '', 1, '2026-05-05 16:59:45'),
(121, 'a1b1c1d1e1f20038', 'b0e212bb6c992785', 'studiojeisalon369.mita.in', 'studiojeisalon369.com', 'De-Tan Treatment', 'Skin & Facial', 'Men', 'Sun tan removal for brighter skin tone.', '₹500', '30 min', '', '', 1, '2026-05-05 16:59:45'),
(122, 'a1b1c1d1e1f20039', 'b0e212bb6c992785', 'studiojeisalon369.mita.in', 'studiojeisalon369.com', 'Ear & Nose Cleaning', 'Men\'s Grooming', 'Men', 'Hygienic ear and nose hair cleaning.', '₹80', '10 min', '', '', 1, '2026-05-05 16:59:45'),
(123, 'a1b1c1d1e1f20040', 'b0e212bb6c992785', 'studiojeisalon369.mita.in', 'studiojeisalon369.com', 'Full Grooming Package', 'Men\'s Grooming', 'Men', 'Haircut, beard trim and cleanup combo.', '₹600', '60 min', '', '', 1, '2026-05-05 16:59:45'),
(124, 'a1b1c1d1e1f20041', 'b0e212bb6c992785', 'studiojeisalon369.mita.in', 'studiojeisalon369.com', 'Hair Spa', 'Hair Treatments', 'Both', 'Deep conditioning hair spa treatment.', '₹700', '60 min', '', '', 1, '2026-05-05 16:59:45'),
(125, 'a1b1c1d1e1f20042', 'b0e212bb6c992785', 'studiojeisalon369.mita.in', 'studiojeisalon369.com', 'Dandruff Treatment', 'Hair Treatments', 'Both', 'Anti-dandruff scalp treatment.', '₹500', '45 min', '', '', 1, '2026-05-05 16:59:45'),
(126, 'a1b1c1d1e1f20043', 'b0e212bb6c992785', 'studiojeisalon369.mita.in', 'studiojeisalon369.com', 'Hair Color', 'Hair Treatments', 'Both', 'Full head hair color in your choice of shade.', '₹1000', '60 min', '', '', 1, '2026-05-05 16:59:45'),
(127, 'a1b1c1d1e1f20044', 'b0e212bb6c992785', 'studiojeisalon369.mita.in', 'studiojeisalon369.com', 'Highlights & Balayage', 'Hair Treatments', 'Both', 'Dimensional color with highlights or balayage.', '₹2500', '90 min', '', '', 1, '2026-05-05 16:59:45'),
(128, 'a1b1c1d1e1f20045', 'b0e212bb6c992785', 'studiojeisalon369.mita.in', 'studiojeisalon369.com', 'Protein Treatment', 'Hair Treatments', 'Both', 'Strengthening protein treatment for hair.', '₹1500', '75 min', '', '', 1, '2026-05-05 16:59:45'),
(129, 'a1b1c1d1e1f20046', 'b0e212bb6c992785', 'studiojeisalon369.mita.in', 'studiojeisalon369.com', 'Scalp Treatment', 'Hair Treatments', 'Both', 'Nourishing scalp massage and treatment.', '₹700', '45 min', '', '', 1, '2026-05-05 16:59:45'),
(130, 'a1b1c1d1e1f20047', 'b0e212bb6c992785', 'studiojeisalon369.mita.in', 'studiojeisalon369.com', 'Head Massage', 'Massage & Spa', 'Both', 'Relaxing scalp and head massage.', '₹300', '30 min', '', '', 1, '2026-05-05 16:59:45'),
(131, 'a1b1c1d1e1f20048', 'b0e212bb6c992785', 'studiojeisalon369.mita.in', 'studiojeisalon369.com', 'Full Body Massage', 'Massage & Spa', 'Both', 'Full body relaxation massage therapy.', '₹1200', '60 min', '', '', 1, '2026-05-05 16:59:45'),
(132, 'a1b1c1d1e1f20049', 'b0e212bb6c992785', 'studiojeisalon369.mita.in', 'studiojeisalon369.com', 'Back Massage', 'Massage & Spa', 'Both', 'Targeted back and shoulder massage.', '₹600', '45 min', '', '', 1, '2026-05-05 16:59:45'),
(133, 'a1b1c1d1e1f20050', 'b0e212bb6c992785', 'studiojeisalon369.mita.in', 'studiojeisalon369.com', 'Foot Massage', 'Massage & Spa', 'Both', 'Soothing foot and calf massage.', '₹350', '30 min', '', '', 1, '2026-05-05 16:59:45'),
(184, 'SVC001', '4ca00ec0a1d17301', 'cinelounge.mita.in', '', 'Birthday Surprise Package', 'CAT001', 'Both', 'Celebrate your birthday in style with a private big screen experience! Enjoy a movie of your choice with decor, balloons, and a personalised message on screen. Perfect for intimate gatherings.', '2499', '3', '20', '', 1, '2026-05-06 19:31:01'),
(185, 'SVC002', '4ca00ec0a1d17301', 'cinelounge.mita.in', '', 'Movie Night with Friends', 'CAT001', 'Both', 'Book the entire private theatre for a fun-filled movie night with your friends. Choose any movie, enjoy cosy seating, and order your favourite snacks for a truly immersive experience.', '1999', '3', '20', '', 1, '2026-05-06 19:31:01'),
(186, 'SVC003', '4ca00ec0a1d17301', 'cinelounge.mita.in', '', 'Anniversary Celebration', 'CAT006', 'Both', 'Make your anniversary unforgettable with a romantic private screening. Includes rose petal decor, couple seating, and a heartfelt on-screen message to your loved one.', '2999', '3', '10', '', 1, '2026-05-06 19:31:01'),
(187, 'SVC004', '4ca00ec0a1d17301', 'cinelounge.mita.in', '', 'IPL & Live Sports Screening', 'CAT003', 'Both', 'Watch every boundary and wicket on the big screen! Book for IPL matches, World Cup games, or any live sports event with friends and family for an electric atmosphere.', '1499', '4', '20', '', 1, '2026-05-06 19:31:01'),
(188, 'SVC005', '4ca00ec0a1d17301', 'cinelounge.mita.in', '', 'Short Film Premiere', 'CAT005', 'Both', 'Premiere your short film or indie project in a professional setting. Invite your cast and crew for an exclusive screening with red-carpet treatment.', '3499', '4', '20', '', 1, '2026-05-06 19:31:01'),
(189, 'SVC006', '4ca00ec0a1d17301', 'cinelounge.mita.in', '', 'Office Meeting & Presentation', 'CAT002', 'Both', 'Host impactful corporate presentations, product launches, or team meetings with a 4K big screen, HDMI connectivity, and professional ambience.', '2999', '4', '20', '', 1, '2026-05-06 19:31:01'),
(190, 'SVC007', '4ca00ec0a1d17301', 'cinelounge.mita.in', '', 'Kids Birthday Party', 'CAT004', 'Both', 'Give your little one the most magical birthday! Includes cartoon movie screening, colourful decor, and a kid-friendly environment that parents and children will love.', '2299', '3', '20', '', 1, '2026-05-06 19:31:01'),
(191, 'SVC008', '4ca00ec0a1d17301', 'cinelounge.mita.in', '', 'Proposal Night', 'CAT006', 'Both', 'Plan the perfect proposal with a surprise on-screen message, rose decor, and a romantic atmosphere. We help you script the most memorable moment of your love story.', '3999', '2', '10', '', 1, '2026-05-06 19:31:01'),
(192, 'SVC009', '4ca00ec0a1d17301', 'cinelounge.mita.in', '', 'Farewell & Reunion Party', 'CAT001', 'Both', 'Say goodbye or reconnect in style. A private screen, your favourite memories on a slideshow, and an emotional evening that no one will forget.', '1999', '3', '20', '', 1, '2026-05-06 19:31:01'),
(193, 'SVC010', '4ca00ec0a1d17301', 'cinelounge.mita.in', '', 'Bachelorette / Bachelor Party', 'CAT001', 'Both', 'Celebrate the last night of singlehood in a private, fun-packed theatre. Games, movies, music, and laughterâ€”customise the evening exactly as you want!', '2499', '3', '20', '', 1, '2026-05-06 19:31:01'),
(194, 'SVC011', '4ca00ec0a1d17301', 'cinelounge.mita.in', '', 'Corporate Team Outing', 'CAT002', 'Both', 'Strengthen team bonds with a fun movie session or strategy presentation. Ideal for team-building events, quarterly celebrations, and HR engagement activities.', '3499', '4', '20', '', 1, '2026-05-06 19:31:01'),
(195, 'SVC012', '4ca00ec0a1d17301', 'cinelounge.mita.in', '', 'Kids Movie Marathon', 'CAT004', 'Both', 'Keep the kids entertained with a back-to-back animated movie marathon. A safe, comfortable, and exciting experience for children of all ages.', '1799', '4', '20', '', 1, '2026-05-06 19:31:01');

-- --------------------------------------------------------

--
-- Table structure for table `cinelux_service_categories`
--

CREATE TABLE `cinelux_service_categories` (
  `id` int(11) NOT NULL,
  `cat_id` varchar(255) NOT NULL DEFAULT '',
  `profile_id` varchar(255) NOT NULL DEFAULT '',
  `subdomain` varchar(255) NOT NULL DEFAULT '',
  `domain` varchar(255) NOT NULL DEFAULT '',
  `cat_name` varchar(255) NOT NULL DEFAULT '',
  `cat_img` varchar(255) DEFAULT NULL,
  `gender` varchar(50) NOT NULL DEFAULT 'Both',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cinelux_service_categories`
--

INSERT INTO `cinelux_service_categories` (`id`, `cat_id`, `profile_id`, `subdomain`, `domain`, `cat_name`, `cat_img`, `gender`, `status`, `created_at`) VALUES
(3, 'a1b1c1d1e1f10001', 'b0e212bb6c992785', 'studiojeisalon369.mita.in', 'studiojeisalon369.com', 'Hair Services', NULL, 'Women', 1, '2026-05-05 16:59:44'),
(4, 'a1b1c1d1e1f10002', 'b0e212bb6c992785', 'studiojeisalon369.mita.in', 'studiojeisalon369.com', 'Skin & Facial', NULL, 'Women', 1, '2026-05-05 16:59:44'),
(5, 'a1b1c1d1e1f10003', 'b0e212bb6c992785', 'studiojeisalon369.mita.in', 'studiojeisalon369.com', 'Nail Care', NULL, 'Women', 1, '2026-05-05 16:59:44'),
(6, 'a1b1c1d1e1f10004', 'b0e212bb6c992785', 'studiojeisalon369.mita.in', 'studiojeisalon369.com', 'Makeup', NULL, 'Women', 1, '2026-05-05 16:59:44'),
(7, 'a1b1c1d1e1f10005', 'b0e212bb6c992785', 'studiojeisalon369.mita.in', 'studiojeisalon369.com', 'Body Treatments', NULL, 'Women', 1, '2026-05-05 16:59:44'),
(8, 'a1b1c1d1e1f10006', 'b0e212bb6c992785', 'studiojeisalon369.mita.in', 'studiojeisalon369.com', 'Bridal Package', NULL, 'Women', 1, '2026-05-05 16:59:44'),
(9, 'a1b1c1d1e1f10007', 'b0e212bb6c992785', 'studiojeisalon369.mita.in', 'studiojeisalon369.com', 'Threading & Waxing', NULL, 'Women', 1, '2026-05-05 16:59:44'),
(10, 'a1b1c1d1e1f10008', 'b0e212bb6c992785', 'studiojeisalon369.mita.in', 'studiojeisalon369.com', 'Hair Services', NULL, 'Men', 1, '2026-05-05 16:59:44'),
(11, 'a1b1c1d1e1f10009', 'b0e212bb6c992785', 'studiojeisalon369.mita.in', 'studiojeisalon369.com', 'Beard & Shave', NULL, 'Men', 1, '2026-05-05 16:59:44'),
(12, 'a1b1c1d1e1f10010', 'b0e212bb6c992785', 'studiojeisalon369.mita.in', 'studiojeisalon369.com', 'Skin & Facial', NULL, 'Men', 1, '2026-05-05 16:59:44'),
(13, 'a1b1c1d1e1f10011', 'b0e212bb6c992785', 'studiojeisalon369.mita.in', 'studiojeisalon369.com', 'Men\'s Grooming', NULL, 'Men', 1, '2026-05-05 16:59:44'),
(14, 'a1b1c1d1e1f10012', 'b0e212bb6c992785', 'studiojeisalon369.mita.in', 'studiojeisalon369.com', 'Hair Treatments', NULL, 'Both', 1, '2026-05-05 16:59:44'),
(15, 'a1b1c1d1e1f10013', 'b0e212bb6c992785', 'studiojeisalon369.mita.in', 'studiojeisalon369.com', 'Massage & Spa', NULL, 'Both', 1, '2026-05-05 16:59:44'),
(29, 'CAT001', '4ca00ec0a1d17301', 'cinelounge.mita.in', '', 'Celebration', '', 'Both', 1, '2026-05-06 19:31:01'),
(30, 'CAT002', '4ca00ec0a1d17301', 'cinelounge.mita.in', '', 'Corporate', '', 'Both', 1, '2026-05-06 19:31:01'),
(31, 'CAT003', '4ca00ec0a1d17301', 'cinelounge.mita.in', '', 'Sports Screening', '', 'Both', 1, '2026-05-06 19:31:01'),
(32, 'CAT004', '4ca00ec0a1d17301', 'cinelounge.mita.in', '', 'Kids & Family', '', 'Both', 1, '2026-05-06 19:31:01'),
(33, 'CAT005', '4ca00ec0a1d17301', 'cinelounge.mita.in', '', 'Film & Media', '', 'Both', 1, '2026-05-06 19:31:01'),
(34, 'CAT006', '4ca00ec0a1d17301', 'cinelounge.mita.in', '', 'Anniversary & Romance', '', 'Both', 1, '2026-05-06 19:31:01');

-- --------------------------------------------------------

--
-- Table structure for table `cinelux_terms`
--

CREATE TABLE `cinelux_terms` (
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

--
-- Dumping data for table `cinelux_terms`
--

INSERT INTO `cinelux_terms` (`id`, `profile_id`, `subdomain`, `domain`, `termtype`, `terms_title`, `terms_desc`, `created_at`, `updated_at`) VALUES
(1, '4ca00ec0a1d17301', 'studiosalon.mita.in', '', 'conditions', 'Terms and Conditions', 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).', '2026-04-28 02:12:37', '2026-05-03 17:11:05'),
(2, '4ca00ec0a1d17301', 'studiosalon.mita.in', '', 'privacy', 'Privacy PolicyPrivacy PolicyPrivacy Policy', 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).', '2026-04-28 02:12:43', '2026-05-03 17:11:09'),
(3, '4ca00ec0a1d17301', 'studiosalon.mita.in', '', 'disclaimer', 'DisclaimerDisclaimerDisclaimerDisclaimer', 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).', '2026-04-28 02:12:49', '2026-05-03 17:11:13'),
(4, '4ca00ec0a1d17301', 'studiosalon.mita.in', '', 'cookiepolicy', 'Cookie Policy / Cookie Consent Notice', 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).', '2026-04-28 02:12:54', '2026-05-03 17:11:17');

-- --------------------------------------------------------

--
-- Table structure for table `cinelux_theme`
--

CREATE TABLE `cinelux_theme` (
  `id` int(11) NOT NULL,
  `profile_id` varchar(50) NOT NULL,
  `subdomain` varchar(100) NOT NULL,
  `domain` varchar(100) DEFAULT '',
  `color` varchar(10) NOT NULL DEFAULT '#6C3CE1',
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cinelux_theme`
--

INSERT INTO `cinelux_theme` (`id`, `profile_id`, `subdomain`, `domain`, `color`, `updated_at`) VALUES
(1, '4ca00ec0a1d17301', 'studiosalon.mita.in', '', '#6C3CE1', '2026-05-03 15:45:55');

-- --------------------------------------------------------

--
-- Table structure for table `cinelux_trending`
--

CREATE TABLE `cinelux_trending` (
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

--
-- Dumping data for table `cinelux_trending`
--

INSERT INTO `cinelux_trending` (`id`, `tid`, `profile_id`, `subdomain`, `domain`, `style_name`, `style_cat`, `style_tag`, `style_img`, `status`, `created_at`) VALUES
(1, 'TRD001', '4ca00ec0a1d17301', 'cinelounge.mita.in', '', 'Birthday Surprise Setup', 'Celebration', 'birthday,decor,private', '', 1, '2026-04-01 10:00:00'),
(2, 'TRD002', '4ca00ec0a1d17301', 'cinelounge.mita.in', '', 'Romantic Anniversary Decor', 'Anniversary & Romance', 'anniversary,roses,romantic', '', 1, '2026-04-05 10:00:00'),
(3, 'TRD003', '4ca00ec0a1d17301', 'cinelounge.mita.in', '', 'Corporate Presentation Setup', 'Corporate', 'corporate,meeting,big screen', '', 1, '2026-04-10 10:00:00'),
(4, 'TRD004', '4ca00ec0a1d17301', 'cinelounge.mita.in', '', 'Kids Party Theme', 'Kids & Family', 'kids,birthday,fun', '', 1, '2026-04-15 10:00:00'),
(5, 'TRD005', '4ca00ec0a1d17301', 'cinelounge.mita.in', '', 'IPL Screening Night', 'Sports Screening', 'ipl,cricket,sports', '', 1, '2026-04-20 10:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `cinelux_youtube`
--

CREATE TABLE `cinelux_youtube` (
  `id` int(11) NOT NULL,
  `vid` varchar(16) NOT NULL,
  `profile_id` varchar(50) NOT NULL,
  `subdomain` varchar(100) NOT NULL DEFAULT '',
  `domain` varchar(100) NOT NULL DEFAULT '',
  `youtube_url` varchar(500) NOT NULL,
  `title` varchar(255) NOT NULL DEFAULT '',
  `video_date` date DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cinelux_youtube`
--

INSERT INTO `cinelux_youtube` (`id`, `vid`, `profile_id`, `subdomain`, `domain`, `youtube_url`, `title`, `video_date`, `status`, `created_at`) VALUES
(1, 'f707a6b6c10153dc', '4ca00ec0a1d17301', 'studiosalon.mita.in', '', 'https://www.youtube.com/watch?v=_CbkG7GJgJg', 'title', NULL, 1, '2026-05-03 20:22:30');

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

--
-- Dumping data for table `company_info`
--

INSERT INTO `company_info` (`mid`, `cid`, `profile_id`, `subdomain`, `domain`, `companyname`, `phone_one`, `phone_two`, `email_one`, `email_two`, `house_no`, `area`, `city`, `pincode`, `district`, `state`, `country`, `status`) VALUES
(1, '8f3911c03989ae13', '4ca00ec0a1d17301', 'cinelounge.mita.in', '', 'CineLux Private Theatre', '9876543000', '', 'hello@cinelounge.in', '', '15', 'Nehru Street, Anna Nagar', 'Chennai', '600040', 'Chennai', 'Tamil Nadu', 'India', '1');

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

--
-- Dumping data for table `dummy`
--

INSERT INTO `dummy` (`id`, `did`, `app_id`, `apptitle`, `logo_img`, `fev_img`, `theme_color`, `ser_title`, `ser_meta_title`, `ser_meta_desc`, `ser_img`, `ser_shortdesc`, `ser_desc`) VALUES
(1, 'WEBSITZ', 'WEBSITZ', 'Websitz', 'Websitz.png', '', '#2a2a2a', '', '', '', '', '', '');

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

--
-- Dumping data for table `social_links`
--

INSERT INTO `social_links` (`mid`, `sid`, `profile_id`, `subdomain`, `domain`, `fb`, `insta`, `linked`, `status`) VALUES
(1, 'fdcd4c8a1e81992a', '4ca00ec0a1d17301', 'studiosalon.mita.in', '', 'https://facebook.com/studiojeisalon', 'https://instragram.com/studiojeisalon', 'https://linkedin.com/studiojeisalon', '1');

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
-- Dumping data for table `web_banner`
--

INSERT INTO `web_banner` (`id`, `bid`, `profile_id`, `subdomain`, `domain`, `banner_order`, `banner_title`, `banner_img`, `banner_img_ext`, `banner_img_size`, `status`) VALUES
(1, '679bd665555ac5da', '4ca00ec0a1d17301', 'cinelounge.mita.in', '', '1', 'banner 1', '1777825296_cosmetic-makeup-sale-banner-vector-50040354.jpg', 'jpg', '441329', '1'),
(2, '14a367ec0ea66075', '4ca00ec0a1d17301', 'cinelounge.mita.in', '', '2', 'banner 2', '1777825304_ai-generated-makeup-brushes-and-cosmetic-powders-arranged-neatly-on-a-clean-white-background-copy-space-banner-photo.jpg', 'jpg', '319696', '1');

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
-- Indexes for table `cinelux_blog`
--
ALTER TABLE `cinelux_blog`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uk_bid` (`bid`),
  ADD KEY `idx_pid_sub` (`profile_id`,`subdomain`);

--
-- Indexes for table `cinelux_bookings`
--
ALTER TABLE `cinelux_bookings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uk_bid` (`bid`),
  ADD KEY `idx_pid_sub` (`profile_id`,`subdomain`);

--
-- Indexes for table `cinelux_business_info`
--
ALTER TABLE `cinelux_business_info`
  ADD PRIMARY KEY (`profile_id`,`subdomain`);

--
-- Indexes for table `cinelux_customers`
--
ALTER TABLE `cinelux_customers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_pid_sub` (`profile_id`,`subdomain`),
  ADD KEY `idx_ph` (`customer_ph`);

--
-- Indexes for table `cinelux_employees`
--
ALTER TABLE `cinelux_employees`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `eid` (`eid`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `cinelux_emp_customers`
--
ALTER TABLE `cinelux_emp_customers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `ecid` (`ecid`),
  ADD KEY `idx_eid` (`eid`);

--
-- Indexes for table `cinelux_emp_ratings`
--
ALTER TABLE `cinelux_emp_ratings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `rid` (`rid`),
  ADD KEY `idx_eid` (`eid`),
  ADD KEY `idx_ecid` (`ecid`);

--
-- Indexes for table `cinelux_enquiries`
--
ALTER TABLE `cinelux_enquiries`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uk_eid` (`eid`),
  ADD KEY `idx_pid_sub` (`profile_id`,`subdomain`);

--
-- Indexes for table `cinelux_events`
--
ALTER TABLE `cinelux_events`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cinelux_event_gallery`
--
ALTER TABLE `cinelux_event_gallery`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cinelux_event_members`
--
ALTER TABLE `cinelux_event_members`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cinelux_notifications`
--
ALTER TABLE `cinelux_notifications`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uk_nid` (`nid`),
  ADD KEY `idx_pid_sub` (`profile_id`,`subdomain`);

--
-- Indexes for table `cinelux_reviews`
--
ALTER TABLE `cinelux_reviews`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uk_rid` (`rid`),
  ADD KEY `idx_pid_sub` (`profile_id`,`subdomain`);

--
-- Indexes for table `cinelux_services`
--
ALTER TABLE `cinelux_services`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cinelux_service_categories`
--
ALTER TABLE `cinelux_service_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cinelux_terms`
--
ALTER TABLE `cinelux_terms`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_terms` (`profile_id`,`subdomain`,`termtype`);

--
-- Indexes for table `cinelux_theme`
--
ALTER TABLE `cinelux_theme`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uniq_vendor` (`profile_id`,`subdomain`);

--
-- Indexes for table `cinelux_trending`
--
ALTER TABLE `cinelux_trending`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uk_tid` (`tid`),
  ADD KEY `idx_pid_sub` (`profile_id`,`subdomain`);

--
-- Indexes for table `cinelux_youtube`
--
ALTER TABLE `cinelux_youtube`
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `app_logo`
--
ALTER TABLE `app_logo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT for table `app_title`
--
ALTER TABLE `app_title`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `cinelux_blog`
--
ALTER TABLE `cinelux_blog`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `cinelux_bookings`
--
ALTER TABLE `cinelux_bookings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `cinelux_customers`
--
ALTER TABLE `cinelux_customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `cinelux_employees`
--
ALTER TABLE `cinelux_employees`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `cinelux_emp_customers`
--
ALTER TABLE `cinelux_emp_customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `cinelux_emp_ratings`
--
ALTER TABLE `cinelux_emp_ratings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `cinelux_enquiries`
--
ALTER TABLE `cinelux_enquiries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cinelux_events`
--
ALTER TABLE `cinelux_events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `cinelux_event_gallery`
--
ALTER TABLE `cinelux_event_gallery`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cinelux_event_members`
--
ALTER TABLE `cinelux_event_members`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cinelux_notifications`
--
ALTER TABLE `cinelux_notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cinelux_reviews`
--
ALTER TABLE `cinelux_reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `cinelux_services`
--
ALTER TABLE `cinelux_services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=196;

--
-- AUTO_INCREMENT for table `cinelux_service_categories`
--
ALTER TABLE `cinelux_service_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `cinelux_terms`
--
ALTER TABLE `cinelux_terms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `cinelux_theme`
--
ALTER TABLE `cinelux_theme`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `cinelux_trending`
--
ALTER TABLE `cinelux_trending`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `cinelux_youtube`
--
ALTER TABLE `cinelux_youtube`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `company_info`
--
ALTER TABLE `company_info`
  MODIFY `mid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `ws_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `dummy`
--
ALTER TABLE `dummy`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

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
  MODIFY `mid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `theme`
--
ALTER TABLE `theme`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `web_banner`
--
ALTER TABLE `web_banner`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
