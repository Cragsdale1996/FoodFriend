-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Apr 13, 2017 at 01:47 AM
-- Server version: 5.7.17-0ubuntu0.16.04.1-log
-- PHP Version: 5.6.30-7+deb.sury.org~xenial+1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `FoodFriend`
--

-- --------------------------------------------------------

--
-- Table structure for table `Dishes`

INSERT INTO `RestAccount` (`name`, `email`, `password`, `address`, `category`, `city`, `state_post_code`) VALUES
('Grub Burger', 'gburber@gmail.com', 'burgerburgerL0ve', '4925 Greenville Ave #150', 'Burger', 'Dallas', 'TX'),
('Chuys', 'chuys@gmail.com', 'iloveburritos', '4544 McKinney Ave', 'Mexican', 'Dallas', 'TX'),
('Maggiano Little Italy', 'mgianos@yahoo.com', 'ilovesushi ', '205 N Park Center', 'Italian', 'Dallas', 'TX'),
('Sushi Axiom', 'sushi@axiom.com', 'ilovepasta', '2323 N Henderson Ave', 'Sushi', 'Dallas', 'TX'),
('Roti Grill', 'roti@gmail.com', 'samosas', '4438 McKinney Avenue #100', 'Indian', 'Dallas', 'TX');
