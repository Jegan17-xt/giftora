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
-- Database: `mitaik1v_apps_mita_in`
--

-- --------------------------------------------------------

--
-- Table structure for table `app_store`
--

CREATE TABLE `app_store` (
  `mid` int(11) NOT NULL,
  `aid` varchar(255) NOT NULL,
  `appid` varchar(255) NOT NULL,
  `apptitle` varchar(255) NOT NULL,
  `renew_amount` varchar(255) NOT NULL,
  `renew_gst` varchar(255) NOT NULL,
  `renew_total` varchar(255) NOT NULL,
  `package_days` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `app_store`
--

INSERT INTO `app_store` (`mid`, `aid`, `appid`, `apptitle`, `renew_amount`, `renew_gst`, `renew_total`, `package_days`, `status`) VALUES
(1, '3073211a-b9e2-40f8-8c26-dc8948400f36', 'WEBSITZ', 'WEBSITZ', '7000', '1260', '8260', '365', '1'),
(2, 'e810403a-e8a6-4664-b9bb-024ecfd6791c', 'REALTOR', 'REALTOR', '15000', '2700', '17700', '365', '1'),
(3, '9bc737ca-7326-44c7-86b5-958beb5cf8a8', 'PETSHOPZ', 'PETSHOPZ', '15000', '2700', '17700', '365', '1'),
(4, '0e65d2f6-8756-4609-9a17-a7a162b4a309', 'AVIO', 'AVIO', '15000', '2700', '17700', '365', '1'),
(5, '1badee31-dc48-45af-82ef-2f066fb698e8', 'CARISTO', 'CARISTO', '15000', '2700', '17700', '365', '1'),
(6, '820bfb6a-88b5-4d60-aa6f-d7bcbe031e8b', 'HOSTELLA', 'HOSTELLA', '15000', '2700', '17700', '365', '1'),
(7, '12354b6a-88b5-4d60-aa6f-d7bcbe99Ds2', 'MINIPOS', 'MINIPOS', '3000', '540', '3540', '365', '1'),
(8, '54312b6a-88b5-4d60-aa6f-565hfgf67', 'LITEPOS', 'LITEPOS', '3000', '540', '3540', '365', '1'),
(9, '54312tico-88b5-4d60-beau-565hftico', 'BEAUTICO', 'BEAUTICO', '3000', '540', '3540', '365', '1');

-- --------------------------------------------------------

--
-- Table structure for table `client_billing`
--

CREATE TABLE `client_billing` (
  `mid` int(11) NOT NULL,
  `bid` varchar(255) NOT NULL,
  `aid` varchar(255) NOT NULL,
  `appid` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `created_on` varchar(255) NOT NULL,
  `expire_on` varchar(255) NOT NULL,
  `renew_amount` varchar(255) NOT NULL,
  `renew_gst` varchar(255) NOT NULL,
  `renew_total` varchar(255) NOT NULL,
  `profile_id` varchar(255) NOT NULL,
  `subdomain` varchar(255) NOT NULL,
  `domain` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `client_invoice`
--

CREATE TABLE `client_invoice` (
  `mid` int(11) NOT NULL,
  `iid` varchar(255) NOT NULL,
  `invoice_no` varchar(255) NOT NULL,
  `invoice_id` varchar(255) NOT NULL,
  `aid` varchar(255) NOT NULL,
  `appid` varchar(255) NOT NULL,
  `renew_amount` varchar(255) NOT NULL,
  `renew_gst` varchar(255) NOT NULL,
  `renew_trans` varchar(255) NOT NULL,
  `renew_total` varchar(255) NOT NULL,
  `profile_id` varchar(255) NOT NULL,
  `subdomain` varchar(255) NOT NULL,
  `domain` varchar(255) NOT NULL,
  `sday` varchar(255) NOT NULL,
  `smonth` varchar(255) NOT NULL,
  `syear` varchar(255) NOT NULL,
  `sdate` varchar(255) NOT NULL,
  `sdatestamp` varchar(255) NOT NULL,
  `sdatetimestamp` varchar(255) NOT NULL,
  `subdatetime` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `tranx_info` longtext NOT NULL,
  `paid_on` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `client_mang`
--

CREATE TABLE `client_mang` (
  `id` int(11) NOT NULL,
  `profile_id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `company_name` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `email_uniqid` varchar(255) NOT NULL,
  `email_status` varchar(255) NOT NULL,
  `mobile` varchar(255) NOT NULL,
  `mobile_status` varchar(255) NOT NULL,
  `user_type` varchar(255) NOT NULL,
  `sday` varchar(255) NOT NULL,
  `smonth` varchar(255) NOT NULL,
  `syear` varchar(255) NOT NULL,
  `sub_time` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `client_mang`
--

INSERT INTO `client_mang` (`id`, `profile_id`, `name`, `email`, `password`, `company_name`, `status`, `email_uniqid`, `email_status`, `mobile`, `mobile_status`, `user_type`, `sday`, `smonth`, `syear`, `sub_time`) VALUES
(61, '4ca00ec0a1d17301', 'Chandra Sekar M', 'chandrasekar8992@gmail.com', '202cb962ac59075b964b07152d234b70', '', '0', '4ca00ec0a1d17301', '0', '08098111311', '0', 'MITA_CLIENT', '15', '02', '2025', 'February 15, 2025, 4:43 am'),
(62, '4b60c80bb9ec3edd', 'Chandra Sekar M', 'chandru@mita.in', '202cb962ac59075b964b07152d234b70', '', '0', '4b60c80bb9ec3edd', '0', '08098111311', '0', 'MITA_CLIENT', '17', '02', '2025', 'February 17, 2025, 5:14 am'),
(63, 'facce9d93e9628f7', 'Sathishkumar', 'sathish@mita.in', 'e10adc3949ba59abbe56e057f20f883e', '', '0', 'facce9d93e9628f7', '0', '9488559789', '0', 'MITA_CLIENT', '03', '06', '2025', 'June 3, 2025, 8:33 am'),
(64, '481930eeb3bd2379', 'Divya Sweka', 'divyasweka2906@gmail.com', '202cb962ac59075b964b07152d234b70', '', '0', '481930eeb3bd2379', '0', '9363524108', '0', 'MITA_CLIENT', '14', '07', '2025', 'July 14, 2025, 5:30 am'),
(65, 'a4be9d59affbacbd', 'Ashoke roy', 'ashokee@gamil.com', '2a188413c8ef14dbfddd6f57206c2ab2', '', '0', 'a4be9d59affbacbd', '0', '7365024817', '0', 'MITA_CLIENT', '26', '07', '2025', 'July 26, 2025, 3:17 pm'),
(66, '62345c01b551600b', 'Ragul Balaji B', 'ragulbalajib2005@gamil.com', '202cb962ac59075b964b07152d234b70', '', '0', '62345c01b551600b', '0', '6374831818', '0', 'MITA_CLIENT', '03', '09', '2025', 'September 3, 2025, 12:01 pm'),
(67, '64b4b99b53ef1d35', 'robert william', 'robertwilliamsavariyar@gmail.com', '202cb962ac59075b964b07152d234b70', '', '0', '64b4b99b53ef1d35', '0', '9092658972', '0', 'MITA_CLIENT', '03', '09', '2025', 'September 3, 2025, 12:02 pm'),
(68, '442313cecaa34706', 'kavya', 'kavyabalakri@gmail.com', 'e103e1611dae73098b87196c2f577eac', '', '0', '442313cecaa34706', '0', '6381790443', '0', 'MITA_CLIENT', '06', '09', '2025', 'September 6, 2025, 7:54 am'),
(69, 'b8d54a023f386f46', 'Rakesh Nandha', 'rakeshna@gmail.com', '5c4adb8c4b444a54ff465780e347aabb', '', '0', 'b8d54a023f386f46', '0', '6374280039', '0', 'MITA_CLIENT', '06', '09', '2025', 'September 6, 2025, 7:54 am'),
(70, '01f7181d5d0246b4', 'Priyanka', 'priyankaveluchamy1@gmail.com', 'ceb6c970658f31504a901b89dcd3e461', '', '0', '01f7181d5d0246b4', '0', '9566598320', '0', 'MITA_CLIENT', '08', '09', '2025', 'September 8, 2025, 12:37 pm'),
(71, '5af1cb7787bfba13', 'Vaira', 'nithiyarajan55@gmail.com', '202cb962ac59075b964b07152d234b70', '', '0', '5af1cb7787bfba13', '0', '8098111211', '0', 'MITA_CLIENT', '12', '09', '2025', 'September 12, 2025, 6:03 am'),
(72, '0b2372c6e2c50026', 'Vairapandian', 'vairapandian@eegaigroup.com', '202cb962ac59075b964b07152d234b70', '', '0', '0b2372c6e2c50026', '0', '9843705055', '0', 'MITA_CLIENT', '18', '09', '2025', 'September 18, 2025, 10:46 am'),
(73, 'f44d746e27d10535', 'Chandra Mohan', 'chandramohanand@gmail.com', '202cb962ac59075b964b07152d234b70', '', '0', 'f44d746e27d10535', '0', '9952293606', '0', 'MITA_CLIENT', '18', '09', '2025', 'September 18, 2025, 10:50 am'),
(74, '61faa64811ca94e7', 'krishna Moorthy', 'gkrishgkm@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', '', '0', '61faa64811ca94e7', '0', '+919790514471', '0', 'MITA_CLIENT', '19', '09', '2025', 'September 19, 2025, 5:51 am'),
(75, 'c97c22dbec5a9ebe', 'Gopi', 'tremmeandous@gmail.com', '202cb962ac59075b964b07152d234b70', '', '0', 'c97c22dbec5a9ebe', '0', '7397070786', '0', 'MITA_CLIENT', '25', '09', '2025', 'September 25, 2025, 10:51 am'),
(76, '0db1b8ee32bdf967', 'Vasanthi', 'vasanthidurai3397@gmail.com', '202cb962ac59075b964b07152d234b70', '', '0', '0db1b8ee32bdf967', '0', '9790253068', '0', 'MITA_CLIENT', '25', '09', '2025', 'September 25, 2025, 5:23 pm'),
(77, 'c7953720c3b3e732', 'Kasthuri', 'kasthu.cloud@gmail.com', '202cb962ac59075b964b07152d234b70', '', '0', 'c7953720c3b3e732', '0', '7871793780', '0', 'MITA_CLIENT', '27', '10', '2025', 'October 27, 2025, 7:15 am'),
(78, '10dd7449c4f8724a', 'Divyasubramaniyan', 'divyasubramaniyan27@gmail.com', '202cb962ac59075b964b07152d234b70', '', '0', '10dd7449c4f8724a', '0', '8680900375', '0', 'MITA_CLIENT', '12', '01', '2026', 'January 12, 2026, 6:25 am'),
(79, 'd6b4679a7dfdcc3f', 'kas', 'kasthuri@mita.in', '202cb962ac59075b964b07152d234b70', '', '0', 'd6b4679a7dfdcc3f', '0', '7871793780', '0', 'MITA_CLIENT', '12', '01', '2026', 'January 12, 2026, 6:25 am'),
(80, '18189457c3a83284', 'Divya', 'divya@mita.in', '81dc9bdb52d04dc20036dbd8313ed055', '', '0', '18189457c3a83284', '0', '9578850100', '0', 'MITA_CLIENT', '12', '01', '2026', 'January 12, 2026, 6:27 am'),
(81, 'db1397e2c3379e1b', 'AJAY A', 'ajayuiux.dev@gmail.com', '4d8fe6b04e88c50599b5a41e3e9f89be', '', '0', 'db1397e2c3379e1b', '0', '8925183672', '0', 'MITA_CLIENT', '12', '01', '2026', 'January 12, 2026, 6:31 am'),
(82, 'dfd61fb081bcf779', 'Arun Kumar', 'arunkumaraj0414@gmail.com', '202cb962ac59075b964b07152d234b70', '', '0', 'dfd61fb081bcf779', '0', '8056551023', '0', 'MITA_CLIENT', '24', '02', '2026', 'February 24, 2026, 6:22 am'),
(83, 'b0e212bb6c992785', 'Rajaraman A S', 'studiojeisalon0369@gmail.com', '202cb962ac59075b964b07152d234b70', '', '0', 'b0e212bb6c992785', '0', '8220102676', '0', 'MITA_CLIENT', '24', '02', '2026', 'February 24, 2026, 6:23 am'),
(84, '7b32f7328dc4cebb', 'santhosh', 'sandeey13@gmail.com', 'b5692d190d74b7d208777df77f60e762', '', '0', '7b32f7328dc4cebb', '0', '8123906769', '0', 'MITA_CLIENT', '26', '03', '2026', 'March 26, 2026, 5:08 pm'),
(85, '84469b0b35efd848', 'Praisey E', 'epraisey7@gmail.com', '25f9e794323b453885f5181f1b624d0b', '', '0', '84469b0b35efd848', '0', '8220477702', '0', 'MITA_CLIENT', '07', '04', '2026', 'April 7, 2026, 9:41 am');

-- --------------------------------------------------------

--
-- Table structure for table `client_my_apps`
--

CREATE TABLE `client_my_apps` (
  `id` int(11) NOT NULL,
  `aid` varchar(255) NOT NULL,
  `profile_id` varchar(255) NOT NULL,
  `app_id` varchar(255) NOT NULL,
  `pricing` varchar(255) NOT NULL,
  `iday` varchar(255) NOT NULL,
  `imonth` varchar(255) NOT NULL,
  `iyear` varchar(255) NOT NULL,
  `idatestamp` varchar(255) NOT NULL,
  `created_on` varchar(255) NOT NULL,
  `expires_on` varchar(255) NOT NULL,
  `expires_on_datestamp` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `ipaddress` varchar(255) NOT NULL,
  `add_info` varchar(255) NOT NULL,
  `biz_name` varchar(255) NOT NULL,
  `mita_subdomain` varchar(255) NOT NULL,
  `client_domain` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `client_my_apps`
--

INSERT INTO `client_my_apps` (`id`, `aid`, `profile_id`, `app_id`, `pricing`, `iday`, `imonth`, `iyear`, `idatestamp`, `created_on`, `expires_on`, `expires_on_datestamp`, `status`, `ipaddress`, `add_info`, `biz_name`, `mita_subdomain`, `client_domain`) VALUES
(48, 'aae511d291643e6e', 'facce9d93e9628f7', 'WEBSITZ', '', '03', '06', '2025', '1748908800', '', '', '', '1', '1', '', 'Satz', 'satz.mita.in', ''),
(49, 'a23ea3db90c8dcd6', 'facce9d93e9628f7', 'PETSHOPZ', '', '03', '06', '2025', '1748908800', '', '', '', '1', '1', '', 'Satzptz', 'satzptz.mita.in', ''),
(59, 'a61ecd7814eefde2', '481930eeb3bd2379', 'AVIO', '', '16', '07', '2025', '1752624000', '', '', '', '1', '1', '', 'welkinjetways', 'welkinjetways.mita.in', 'welkinjetways.com'),
(63, '10aab5381548df53', '64b4b99b53ef1d35', 'REALTOR', '', '04', '09', '2025', '1756944000', '', '', '', '1', '1', '', 'dindigulcitydevelopers', 'dindigulcitydevelopers.mita.in', ''),
(65, '99ee1ac66b70b990', '442313cecaa34706', 'HOSTELLA', '', '06', '09', '2025', '1757116800', '', '', '', '1', '1', '', 'Nakshathra', 'nakshathra.mita.in', ''),
(66, '4a8301b6dd8d43b0', 'b8d54a023f386f46', 'CARISTO', '', '06', '09', '2025', '1757116800', '', '', '', '1', '1', '', 'Caristo', 'caristo.mita.in', ''),
(74, '400649c446473d71', 'f44d746e27d10535', 'WEBSITZ', '', '18', '09', '2025', '1758153600', '', '', '', '1', '1', '', 'kvphotography', 'kvphotography.mita.in', ''),
(75, '139bc440894fe66f', '0b2372c6e2c50026', 'WEBSITZ', '', '18', '09', '2025', '1758153600', '', '', '', '1', '1', '', 'eegai', 'eegai.mita.in', ''),
(82, 'dc3bf4810449cc24', '62345c01b551600b', 'SILKEN', '', '25', '09', '2025', '1758758400', '', '', '', '1', '1', '', 'ragul_silken', 'ragulsilken.mita.in', ''),
(83, '751e0d4f54fa9f1f', 'c97c22dbec5a9ebe', 'WEBSITZ', '', '25', '09', '2025', '1758758400', '', '', '', '1', '1', '', 'tremmeandous', 'tremmeandous.mita.in', ''),
(85, '50f5eee3a0163062', '0db1b8ee32bdf967', 'CARISTO', '', '26', '09', '2025', '1758844800', '', '', '', '1', '1', '', '', '', ''),
(103, '505858021242b3d2', '61faa64811ca94e7', 'WEBSITZ', '', '27', '10', '2025', '1761523200', '', '', '', '1', '1', '', 'pythoncourses', 'pythoncourses.mita.in', ''),
(105, '59dff2b1aa342537', '4ca00ec0a1d17301', 'HOSTELLA', '', '29', '10', '2025', '1761696000', '', '', '', '1', '1', '', 'nakshatra', 'nakshatra.mita.in', ''),
(106, '336e689abb543135', '64b4b99b53ef1d35', 'HOSTELLA', '', '03', '11', '2025', '1762128000', '03-11-2025', '03-11-2026', '1793664000', '1', '106.200.13.169', '', '', '', ''),
(107, 'ae36b701624c01cd', '62345c01b551600b', 'LITEPOS', '', '03', '11', '2025', '1762128000', '03-11-2025', '03-11-2026', '1793664000', '1', '106.200.13.169', '', 'ragulpos', 'ragulpos.mita.in', ''),
(113, '7e33781a29888843', '4ca00ec0a1d17301', 'SILKEN', '', '05', '11', '2025', '1762300800', '05-11-2025', '05-11-2026', '1793836800', '1', '106.200.13.169', '', 'jjchandru123', 'jjchandru123.mita.in', ''),
(115, 'bf3717ab681c5bcb', '4ca00ec0a1d17301', 'LITEPOS', '', '11', '11', '2025', '1762819200', '11-11-2025', '11-11-2026', '1794355200', '1', '223.187.117.4', '', 'krishna', 'krishna.mita.in', ''),
(116, '1071e963c7200a12', '4ca00ec0a1d17301', 'REALTOR', '', '11', '11', '2025', '1762819200', '11-11-2025', '11-11-2026', '1794355200', '1', '223.187.117.4', '', 'jjchandru', 'jjchandru.mita.in', ''),
(118, 'e29ec7c3bf6cac97', '64b4b99b53ef1d35', 'POS', '', '01', '12', '2025', '1764547200', '01-12-2025', '01-12-2026', '1796083200', '1', '106.219.182.108', '', 'pos', 'pos.mita.in', ''),
(119, '9bfad0d4e7bf59d8', '64b4b99b53ef1d35', 'LITEPOS', '', '01', '12', '2025', '1764547200', '01-12-2025', '01-12-2026', '1796083200', '1', '106.219.182.108', '', '', '', ''),
(120, '5289ca3cf24cb680', '4ca00ec0a1d17301', 'MINIPOS', '', '28', '12', '2025', '1766880000', '28-12-2025', '28-12-2026', '1798416000', '1', '223.185.26.255', '', 'mvkmasala', 'mvkmasala.mita.in', 'mvkmasala.com'),
(121, '645bb3c8e68bee27', 'db1397e2c3379e1b', 'REALTOR', '', '12', '01', '2026', '1768176000', '12-01-2026', '12-01-2027', '1799712000', '1', '106.219.182.82', '', 'travels', 'travels.mita.in', ''),
(126, 'ceac9c8170c92cf5', '62345c01b551600b', 'REALTOR', '', '19', '01', '2026', '1768780800', '19-01-2026', '19-01-2027', '1800316800', '1', '106.219.182.82', '', 'demoragul', 'demoragul.mita.in', ''),
(127, '11be50fa0f489b99', 'b0e212bb6c992785', 'BEAUTICO', '', '24', '02', '2026', '1771891200', '24-02-2026', '24-02-2027', '1803427200', '1', '106.219.176.221', '', 'studiojeisalon369', 'studiojeisalon369.mita.in', 'studiojeisalon369.com'),
(129, 'ec25379d5bdc5d6b', '4ca00ec0a1d17301', 'WEBSITZ', '3000', '04', '03', '2026', '1772582400', '04-03-2026', '10-03-2026', '1773100800', '1', '223.185.22.229', '', 'chandru8992websitz', 'chandru8992websitz.mita.in', ''),
(130, 'ec2835c30840c754', '62345c01b551600b', 'WEBSITZ', '3000', '05', '03', '2026', '1772668800', '05-03-2026', '05-03-2027', '1804204800', '1', '106.200.10.158', '', 'ragul', 'ragul.mita.in', ''),
(131, '91b0ebc4bd058b2a', '64b4b99b53ef1d35', 'WEBSITZ', '3000', '06', '03', '2026', '1772755200', '06-03-2026', '06-03-2027', '1804291200', '1', '106.200.10.158', '', 'robert', 'robert.mita.in', ''),
(132, 'cb6ef9e998f1a634', 'dfd61fb081bcf779', 'CINELUX', '18500', '11', '03', '2026', '1773187200', '11-03-2026', '11-03-2027', '1804723200', '1', '223.185.23.118', '', 'cinelounge', 'cinelounge.mita.in', ''),
(133, '7cdc1821fde1737f', '7b32f7328dc4cebb', 'WEBSITZ', '3000', '26', '03', '2026', '1774483200', '26-03-2026', '26-03-2027', '1806019200', '1', '49.37.161.149', '', 'theglobalacademy', 'theglobalacademy.mita.in', ''),
(134, '0819fbcabab0fa42', '84469b0b35efd848', 'WEBSITZ', '3000', '07', '04', '2026', '1775520000', '07-04-2026', '07-04-2027', '1807056000', '1', '106.219.176.114', '', 'Praise', 'praise.mita.in', ''),
(135, 'cad76b4f7e8c8a43', '84469b0b35efd848', 'HOSTELLA', '18500', '07', '04', '2026', '1775520000', '07-04-2026', '07-04-2027', '1807056000', '1', '106.219.176.114', '', 'Praisey', 'praisey.mita.in', ''),
(136, 'a85b0efc4613fc04', '4ca00ec0a1d17301', 'BEAUTICO', '14500', '10', '04', '2026', '1775779200', '10-04-2026', '10-04-2027', '1807315200', '1', '122.183.50.20', '', 'chandrubeautico', 'chandrubeautico.mita.in', '');

-- --------------------------------------------------------

--
-- Table structure for table `payment_history`
--

CREATE TABLE `payment_history` (
  `mid` int(11) NOT NULL,
  `pid` varchar(255) NOT NULL,
  `aid` varchar(255) NOT NULL,
  `appid` varchar(255) NOT NULL,
  `profile_id` varchar(255) NOT NULL,
  `subdomain` varchar(255) NOT NULL,
  `domain` varchar(255) NOT NULL,
  `renew_amount` varchar(255) NOT NULL,
  `renew_gst` varchar(255) NOT NULL,
  `renew_total` varchar(255) NOT NULL,
  `sday` varchar(255) NOT NULL,
  `smonth` varchar(255) NOT NULL,
  `syear` varchar(255) NOT NULL,
  `sdate` varchar(255) NOT NULL,
  `sdatestamp` varchar(255) NOT NULL,
  `sdatetimestamp` varchar(255) NOT NULL,
  `subdatetime` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `tranx_info` longtext NOT NULL,
  `other_info` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `payment_history`
--

INSERT INTO `payment_history` (`mid`, `pid`, `aid`, `appid`, `profile_id`, `subdomain`, `domain`, `renew_amount`, `renew_gst`, `renew_total`, `sday`, `smonth`, `syear`, `sdate`, `sdatestamp`, `sdatetimestamp`, `subdatetime`, `status`, `tranx_info`, `other_info`) VALUES
(1, '', '', '', '4ca00ec0a1d17301', '', '', '', '', '', '16', '09', '2025', '16-09-2025', '', '', '', 'success', '{\"invoiceId\":\"INV-1001\",\"paymentId\":\"pay_RI9YNItCAp3jmb\"}', '{\"id\":\"pay_RI9YNItCAp3jmb\",\"entity\":\"payment\",\"amount\":1000,\"currency\":\"INR\",\"status\":\"authorized\",\"order_id\":null,\"invoice_id\":null,\"international\":false,\"method\":\"card\",\"amount_refunded\":0,\"refund_status\":null,\"captured\":false,\"description\":\"Payment for WEBSITZ\",\"card_id\":\"card_RI9YNcRYrm7u7b\",\"card\":{\"id\":\"card_RI9YNcRYrm7u7b\",\"entity\":\"card\",\"name\":\"\",\"last4\":\"8228\",\"network\":\"MasterCard\",\"type\":\"credit\",\"issuer\":\"HDFC\",\"international\":false,\"emi\":true,\"sub_type\":\"business\",\"token_iin\":null},\"bank\":null,\"wallet\":null,\"vpa\":null,\"email\":\"test@example.com\",\"contact\":\"+918494922226\",\"notes\":[],\"fee\":null,\"tax\":null,\"error_code\":null,\"error_description\":null,\"error_source\":null,\"error_step\":null,\"error_reason\":null,\"acquirer_data\":{\"auth_code\":\"110260\"},\"created_at\":1757999507}'),
(2, '', '', '', '4ca00ec0a1d17301', '', '', '', '', '', '16', '09', '2025', '16-09-2025', '', '', '', 'success', '{\"invoiceId\":\"INV-1001\",\"paymentId\":\"pay_RI9k8jqWEVIJDW\"}', '{\"id\":\"pay_RI9k8jqWEVIJDW\",\"entity\":\"payment\",\"amount\":1000,\"currency\":\"INR\",\"status\":\"authorized\",\"order_id\":null,\"invoice_id\":null,\"international\":false,\"method\":\"card\",\"amount_refunded\":0,\"refund_status\":null,\"captured\":false,\"description\":\"Payment for WEBSITZ\",\"card_id\":\"card_RI9k8xydMccxIO\",\"card\":{\"id\":\"card_RI9k8xydMccxIO\",\"entity\":\"card\",\"name\":\"\",\"last4\":\"8228\",\"network\":\"MasterCard\",\"type\":\"credit\",\"issuer\":\"HDFC\",\"international\":false,\"emi\":true,\"sub_type\":\"business\",\"token_iin\":null},\"bank\":null,\"wallet\":null,\"vpa\":null,\"email\":\"test@example.com\",\"contact\":\"+918494922226\",\"notes\":[],\"fee\":null,\"tax\":null,\"error_code\":null,\"error_description\":null,\"error_source\":null,\"error_step\":null,\"error_reason\":null,\"acquirer_data\":{\"auth_code\":\"470876\"},\"created_at\":1758000175}');

-- --------------------------------------------------------

--
-- Table structure for table `user_mang`
--

CREATE TABLE `user_mang` (
  `id` int(11) NOT NULL,
  `profile_id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `company_name` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `email_uniqid` varchar(255) NOT NULL,
  `email_status` varchar(255) NOT NULL,
  `mobile` varchar(255) NOT NULL,
  `mobile_status` varchar(255) NOT NULL,
  `user_type` varchar(255) NOT NULL,
  `sday` varchar(255) NOT NULL,
  `smonth` varchar(255) NOT NULL,
  `syear` varchar(255) NOT NULL,
  `sub_time` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user_mang`
--

INSERT INTO `user_mang` (`id`, `profile_id`, `name`, `email`, `password`, `company_name`, `status`, `email_uniqid`, `email_status`, `mobile`, `mobile_status`, `user_type`, `sday`, `smonth`, `syear`, `sub_time`) VALUES
(62, '4b60c80bb9ec3edd', 'Chandra Sekar M', 'chandru@mita.in', '202cb962ac59075b964b07152d234b70', '', '1', '4b60c80bb9ec3edd', '0', '08098111311', '0', 'MITA_SUPERADMIN', '17', '02', '2025', 'February 17, 2025, 5:14 am'),
(63, '4b60c80bb9ec3edd', 'ragulbalaji', 'ragulbalaji@mita.in', '202cb962ac59075b964b07152d234b70', '', '1', '4b60c80bb9ec3edd', '0', '08098111311', '0', 'MITA_SUPERADMIN', '17', '02', '2025', 'February 17, 2025, 5:14 am'),
(64, '4b60c80bb9ec3edd', 'robertwilliam', 'robertwilliam@mita.in', '202cb962ac59075b964b07152d234b70', '', '1', '4b60c80bb9ec3edd', '0', '08098111311', '0', 'MITA_SUPERADMIN', '17', '02', '2025', 'February 17, 2025, 5:14 am'),
(65, '4b60c80bb9123455', 'Krish', 'krish@mita.in', '0d57dca2d8e0e017e963be8d42022ab3', '', '1', '4b60c80bb9ec3edd', '0', '08098111311', '0', 'MITA_SUPERADMIN', '17', '02', '2025', 'February 17, 2025, 5:14 am'),
(66, '4b60c80bb9123455', 'Kasthuri', 'kasthuri@mita.in', 'a452a9a6132fdf8137e4c9f6ab5e4fcf', '', '1', '4b60c80bb9ec3edd', '0', '08098111311', '0', 'MITA_SUPERADMIN', '17', '02', '2025', 'February 17, 2025, 5:14 am'),
(67, '4b60c80bb9ec3333', 'Sathish Kumar', 'sathish@mita.in', '202cb962ac59075b964b07152d234b70', '', '1', '4b60c80bb9ec3edd', '0', '08098111311', '0', 'MITA_SUPERADMIN', '17', '02', '2025', 'February 17, 2025, 5:14 am'),
(68, '1b60c83434343987', 'Divya', 'divya@mita.in', '202cb962ac59075b964b07152d234b70', '', '1', '4b60c80bb9ec3edd', '0', '08098111311', '0', 'MITA_SUPERADMIN', '17', '02', '2025', 'February 17, 2025, 5:14 am');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `app_store`
--
ALTER TABLE `app_store`
  ADD PRIMARY KEY (`mid`);

--
-- Indexes for table `client_billing`
--
ALTER TABLE `client_billing`
  ADD PRIMARY KEY (`mid`);

--
-- Indexes for table `client_invoice`
--
ALTER TABLE `client_invoice`
  ADD PRIMARY KEY (`mid`);

--
-- Indexes for table `client_mang`
--
ALTER TABLE `client_mang`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `client_my_apps`
--
ALTER TABLE `client_my_apps`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `payment_history`
--
ALTER TABLE `payment_history`
  ADD PRIMARY KEY (`mid`);

--
-- Indexes for table `user_mang`
--
ALTER TABLE `user_mang`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `app_store`
--
ALTER TABLE `app_store`
  MODIFY `mid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `client_billing`
--
ALTER TABLE `client_billing`
  MODIFY `mid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `client_invoice`
--
ALTER TABLE `client_invoice`
  MODIFY `mid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `client_mang`
--
ALTER TABLE `client_mang`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=86;

--
-- AUTO_INCREMENT for table `client_my_apps`
--
ALTER TABLE `client_my_apps`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=137;

--
-- AUTO_INCREMENT for table `payment_history`
--
ALTER TABLE `payment_history`
  MODIFY `mid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user_mang`
--
ALTER TABLE `user_mang`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
