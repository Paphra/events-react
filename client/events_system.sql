-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 26, 2020 at 08:13 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `events_system`
--

-- --------------------------------------------------------

--
-- Table structure for table `about`
--

CREATE TABLE `about` (
  `a_id` varchar(25) COLLATE utf8_bin NOT NULL,
  `a_name` varchar(100) COLLATE utf8_bin NOT NULL,
  `a_slogan` varchar(200) COLLATE utf8_bin NOT NULL,
  `a_description` text COLLATE utf8_bin NOT NULL,
  `a_phone` varchar(100) COLLATE utf8_bin NOT NULL,
  `a_email` varchar(100) COLLATE utf8_bin NOT NULL,
  `a_address` varchar(100) COLLATE utf8_bin NOT NULL,
  `a_coordinates` varchar(100) COLLATE utf8_bin NOT NULL,
  `a_owner_name` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `a_owner_phone` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `a_owner_email` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `a_entry_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `about`
--

INSERT INTO `about` (`a_id`, `a_name`, `a_slogan`, `a_description`, `a_phone`, `a_email`, `a_address`, `a_coordinates`, `a_owner_name`, `a_owner_phone`, `a_owner_email`, `a_entry_date`) VALUES
('4837495039585940394594325', 'Ultimate Sports Events', 'Everything sports', 'We Offer the best of every kind of sport that you know ', '+256700000000 / +256700000000', 'ultimate@sports.com', '5th Street, Industrial Area, Kampala', '', 'Name of the Owner', '+256700000000', 'owner@sports.com', '2020-03-24 15:03:07');

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `b_id` varchar(25) COLLATE utf8_bin NOT NULL,
  `b_first_name` varchar(25) COLLATE utf8_bin NOT NULL,
  `b_last_name` varchar(25) COLLATE utf8_bin NOT NULL,
  `b_email` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `b_phone` varchar(25) COLLATE utf8_bin DEFAULT NULL,
  `b_reference` varchar(25) COLLATE utf8_bin NOT NULL,
  `b_type` varchar(100) COLLATE utf8_bin NOT NULL DEFAULT 'MERCHANT',
  `b_description` text COLLATE utf8_bin DEFAULT NULL,
  `b_tickets_type` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `b_tickets` int(11) NOT NULL DEFAULT 1,
  `b_unit_price` int(11) NOT NULL,
  `b_amount` int(11) NOT NULL,
  `b_payment_code` varchar(25) COLLATE utf8_bin DEFAULT NULL,
  `b_payment_status` varchar(25) COLLATE utf8_bin NOT NULL DEFAULT 'Pending',
  `b_payment_tracking_id` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `b_entry_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `b_event_id` varchar(25) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `e_id` varchar(25) COLLATE utf8_bin NOT NULL,
  `e_title` varchar(100) COLLATE utf8_bin NOT NULL,
  `e_description` text COLLATE utf8_bin NOT NULL,
  `e_slogan` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `e_address` varchar(100) COLLATE utf8_bin NOT NULL,
  `e_coordinates` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `e_venue` text COLLATE utf8_bin NOT NULL,
  `e_start_date` date NOT NULL,
  `e_start_time` time NOT NULL,
  `e_end_date` date NOT NULL,
  `e_end_time` time NOT NULL,
  `e_price` int(11) DEFAULT NULL,
  `e_discount` int(11) NOT NULL DEFAULT 0,
  `e_tickets` int(11) DEFAULT NULL,
  `e_organizers` text COLLATE utf8_bin NOT NULL,
  `e_partners` text COLLATE utf8_bin DEFAULT NULL,
  `e_guests` text COLLATE utf8_bin DEFAULT NULL,
  `e_image` varchar(200) COLLATE utf8_bin NOT NULL,
  `e_created_by` varchar(25) COLLATE utf8_bin NOT NULL,
  `e_status` varchar(25) COLLATE utf8_bin DEFAULT NULL,
  `e_entry_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`e_id`, `e_title`, `e_description`, `e_slogan`, `e_address`, `e_coordinates`, `e_venue`, `e_start_date`, `e_start_time`, `e_end_date`, `e_end_time`, `e_price`, `e_discount`, `e_tickets`, `e_organizers`, `e_partners`, `e_guests`, `e_image`, `e_created_by`, `e_status`, `e_entry_date`) VALUES
('6385119912034923891005232', 'Work Hard, Play Hard', 'Come and face challenges including Bootcamping, free throw, free kick, spinning, Boxing and dances Such as, Salsa and Sukuma', 'Entertainment and so much more', '5th Street Sports Hub, Kampala Road', NULL, 'Sports Hub', '2020-03-25', '09:30:00', '2020-03-31', '20:20:00', 23000, 0, 344, 'Ultimate Sports Events, Kampala', 'Ultimate Fitness Kampala', 'Katamba', '1584893379898-IMG-20200317-WA0001.jpg', 'Epaphradito Lugayavu', 'Active', '2020-03-22 16:09:39'),
('8015338325005294350482913', 'Ultimate Jinja Ride', 'Come ride with all of us and heal our bodies', 'A Breathe taking ride', '5th Street Sports Hub, Kampala Road', NULL, 'Kampala-Jinja', '2020-03-28', '09:30:00', '2020-03-30', '20:30:00', 30000, 9, 23, 'Ultimate Sports Events, Kampala', 'Ultimate Fitness Kampala', 'Lutamaguzi', '1584894057733-IMG-20200315-WA0004.jpg', 'Epaphradito Lugayavu', 'Active', '2020-03-22 16:20:57');

-- --------------------------------------------------------

--
-- Table structure for table `maillist`
--

CREATE TABLE `maillist` (
  `ml_id` varchar(25) COLLATE utf8_bin NOT NULL,
  `ml_email` varchar(100) COLLATE utf8_bin NOT NULL,
  `ml_status` varchar(25) COLLATE utf8_bin NOT NULL,
  `ml_entry_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `maillist`
--

INSERT INTO `maillist` (`ml_id`, `ml_email`, `ml_status`, `ml_entry_date`) VALUES
('2050236979705616273882567', 'paphra.me@gmail.com', 'Active', '2020-03-24 21:13:53');

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `m_id` varchar(25) COLLATE utf8_bin NOT NULL,
  `m_sender_name` varchar(100) COLLATE utf8_bin NOT NULL,
  `m_sender_email` varchar(100) COLLATE utf8_bin NOT NULL,
  `m_message` text COLLATE utf8_bin NOT NULL,
  `m_entry_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `news`
--

CREATE TABLE `news` (
  `n_id` varchar(25) COLLATE utf8_bin NOT NULL,
  `n_title` varchar(200) COLLATE utf8_bin NOT NULL,
  `n_slag` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `n_description` text COLLATE utf8_bin NOT NULL,
  `n_image_paths` text COLLATE utf8_bin NOT NULL,
  `n_entered_by` varchar(25) COLLATE utf8_bin NOT NULL,
  `n_entry_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `organizers`
--

CREATE TABLE `organizers` (
  `og_id` varchar(25) COLLATE utf8_bin NOT NULL,
  `og_naame` varchar(100) COLLATE utf8_bin NOT NULL,
  `og_details` text COLLATE utf8_bin NOT NULL,
  `og_entry_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `partners`
--

CREATE TABLE `partners` (
  `p_id` varchar(25) COLLATE utf8_bin NOT NULL,
  `p_name` varchar(200) COLLATE utf8_bin NOT NULL,
  `p_description` text COLLATE utf8_bin DEFAULT NULL,
  `p_address` varchar(200) COLLATE utf8_bin NOT NULL,
  `p_logo_path` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `p_entry_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `pm_id` varchar(25) COLLATE utf8_bin NOT NULL,
  `pm_name` varchar(100) COLLATE utf8_bin NOT NULL,
  `pm_token` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `pm_params` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `pm_customer_key` varchar(200) COLLATE utf8_bin NOT NULL,
  `pm_customer_secret` varchar(200) COLLATE utf8_bin NOT NULL,
  `pm_iframe_link` varchar(200) COLLATE utf8_bin NOT NULL,
  `pm_entry_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `u_id` varchar(25) COLLATE utf8_bin NOT NULL,
  `u_full_name` varchar(100) COLLATE utf8_bin NOT NULL,
  `u_email` varchar(100) COLLATE utf8_bin NOT NULL,
  `u_phone` varchar(25) COLLATE utf8_bin NOT NULL,
  `u_username` varchar(15) COLLATE utf8_bin NOT NULL,
  `u_password` varchar(100) COLLATE utf8_bin NOT NULL,
  `u_role` varchar(25) COLLATE utf8_bin NOT NULL,
  `u_entry_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`u_id`, `u_full_name`, `u_email`, `u_phone`, `u_username`, `u_password`, `u_role`, `u_entry_date`) VALUES
('2348596039485948593049283', 'Epaphradito Lugayavu', 'paphra.me@gmail.com', '070182382', 'admin', 'd033e22ae348aeb5660fc2140aec35850c4da997', 'Admin', '2020-03-13 12:08:47');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `about`
--
ALTER TABLE `about`
  ADD PRIMARY KEY (`a_id`);

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`b_id`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`e_id`);

--
-- Indexes for table `maillist`
--
ALTER TABLE `maillist`
  ADD PRIMARY KEY (`ml_id`),
  ADD UNIQUE KEY `ml_email` (`ml_email`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`m_id`);

--
-- Indexes for table `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`n_id`);

--
-- Indexes for table `organizers`
--
ALTER TABLE `organizers`
  ADD PRIMARY KEY (`og_id`);

--
-- Indexes for table `partners`
--
ALTER TABLE `partners`
  ADD PRIMARY KEY (`p_id`);

--
-- Indexes for table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`pm_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`u_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
