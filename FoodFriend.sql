
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


CREATE TABLE IF NOT EXISTS `Dishes` (
  `dish_id` int(11) NOT NULL AUTO_INCREMENT,
  `rest_id` int(11) NOT NULL,
  `name` text NOT NULL,
  `description` text NOT NULL,
  `score` int(1) NOT NULL,
  PRIMARY KEY (`dish_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Favorites`
--

CREATE TABLE IF NOT EXISTS `Favorites` (
  `user_id` int(11) NOT NULL,
  `dish_id` int(11) NOT NULL,
  PRIMARY KEY (`user_id`, `dish_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `RestAccount`
--

CREATE TABLE IF NOT EXISTS `RestAccount` (
  `rest_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `email` varchar(254) NOT NULL,
  `password` varchar(30) NOT NULL,
  `address` text NOT NULL,
  `category` varchar(30) NOT NULL,
  `city` varchar(30) NOT NULL,
  `state_post_code` varchar(2) NOT NULL,
  PRIMARY KEY (`rest_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Sessions`
--

CREATE TABLE IF NOT EXISTS `Sessions` (
  `account_id` int(11) NOT NULL,
  `is_restaurant` tinyint(4) NOT NULL,
  `session_id` varchar(50) NOT NULL,
  `time_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `time_expires` datetime NOT NULL,
  PRIMARY KEY (`session_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `UserAccount`
--

CREATE TABLE IF NOT EXISTS `UserAccount` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `email` varchar(254) NOT NULL,
  `password` varchar(30) NOT NULL,
  `city` varchar(30) NOT NULL,
  `state_post_code` varchar(2) NOT NULL,
   PRIMARY KEY (`user_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Vote`
--

CREATE TABLE IF NOT EXISTS `Vote` (
  `user_id` int(11) NOT NULL,
  `dish_id` int(11) NOT NULL,
  `vote` mediumint(1) NOT NULL,
  PRIMARY KEY (`user_id`, `dish_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
