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



INSERT INTO `Dishes` (`rest_id`, `name`, `description`, `score`) VALUES
(1, 'Bacon Love Burger #9', 'Applewood smoked bacon, American, pickles, lettuce, tomato & secret sauce #9', 23),
(1, 'Front Porch Burger', 'Lettuce, tomato, mayo, mustard', 3),
(1, 'Guacapotle Burger', 'Chipotle aioli, cheddar cheese & homemade guacamole', 5),
(1, 'Lockhart Legend Burger', 'Applewood smoked bacon, cheddar cheese, Dr Pepper BBQ sauce, two onion rings & sliced dill pickles', 39),
(1, 'Mac & Cheeseburger', 'Mac & cheese, cheese sauce & bacon', 20),
(1, 'Voo Doo Mushroom', 'Absinthe sautéed mushrooms, Swiss & Tabasco mayo', 23),
(1, 'Scorpion Burger', 'Pepper jack cheese, Trinidad Moruga scorpion sauce, grilled jalapeños, lettuce & tomato', 18),
(1, 'You are My Boy Blue Burger', 'Crumbled bleu cheese, balsamic caramelized onions, tomato & arugula', 15),
(1, 'Thai Peanut Burger', 'Creamy peanut butter, roasted peanuts, cilantro lime coconut flakes, and Sambal mayo', 50),
(1, 'Hippie Chickpea Burger', 'Meatless ground chickpea & eggplant burger with roasted red pepper mayo, roasted red bell peppers, arugula, red onions, goat cheese & tabbouleh served on a wheat bun', 38),
(2, 'Chile Con Queso', 'Homemade blend of melted cheese, Green Chile sauce and Ranchero sauce', 5),
(2, 'Queso Compuesto', 'Chile con queso with seasoned ground sirloin, guacamole and pico de gallo', 18),
(2, 'Guacamole', 'A creamy blend of fresh avocados and Salsa Fresca', 34),
(2, 'Nachos', 'Freshly made tostada chips layered with refried beans, cheese & jalapeños with lettuce & tomato', 56),
(2, 'Special Nachos', 'Same as Nachos with guacamole & pico de gallo',79 ),
(2, 'Panchos', 'Special nachos with your choice of fajita chicken, fajita beef or seasoned ground sirloin', 36),
(2, 'Quesadillas', 'Handmade flour tortillas stuffed with cheese, green chiles & onion. Served with guacamole, sour cream & pico de gallo', 25),
(2, 'Deluxe Quesadillas', 'Same as above with fajita chicken', 33),
(2, 'Appetizer Plate', 'Chile con queso, nachos, deluxe quesadillas, chicken flautas, guacamole & sour cream', 6),
(2, 'Taco Salad', 'Homemade tortilla bowl with fresh, mixed salad greens, tomatoes, cheese, guacamole & your choice of fajita chicken, fajita beef or seasoned ground sirloin', 39),
(3, 'Maggiano Salad', 'Crispy Prosciutto, Red Onions, Blue Cheese, House Dressing', 56),
(3, 'Chopped Salad', 'Crispy Prosciutto, Tomatoes, Blue Cheese, Avocado, House Dressing', 11),
(3, 'Caesar Salad', '', 44),
(3, 'Italian Tossed Salad', 'Iceberg, Arugula, Kalamata Olives, Red Onions, Pepperoncini, Garlic Croutons, Italian Vinaigrette', 33),
(3, 'Spinach Salad', 'Blue Cheese, Pine Nuts, Red Onions, Applewood-Smoked Bacon, White Balsamic Vinaigrette', 22),
(3, 'Grilled Salmon Salad', 'Mixed Greens, Grape Tomatoes, Green Beans, Red Onions, Linguine Crisps, Balsamic Honey Mustard Vinaigrette', 33),
(3, 'Grilled Chicken Caprese Salad', 'Fresh Mozzarella, Tomatoes, Cucumbers, Kalamata Olives, Red Onions, Garlic Croutons, White Balsamic Vinaigrette', 28),
(3, 'Our Famous Rigatoni D', 'Herb-Roasted Chicken, Mushrooms, Caramelized Onions, Marsala Cream Sauce', 0),
(3, 'Johnny Carbonara', 'Chitarra Pasta, Nueske Bacon, Peas, Poached Egg', 45),
(3, 'Pesto Perlini Mozzarella', 'Chicken Ricotta Meatballs, Sun-Dried Tomatoes, Parmesan with Hand-Cut Fettuccine', 0),
(4,'Alaskan', 'california roll, fresh salmon topped with avocado',47 ),
(4,'Asparagus', 'asparagus in maki style', 23),
(4,'Cajun', 'crawfish, avocado and cucumber', 39),
(4,'Calamari', 'calamari deep fried with avocado & cucumber', 28),
(4,'California', 'crab meat with cucumber and avocado', 20),
(4,'Caterpillar', 'fresh cooked eel & cucumber roll top with avocado & eel sauce', 0),
(5,'Papad (Papadum)', '', 10),
(5,'Vegetable Samosa (2)', 'Pastry filled with potatoes and green peas', 17),
(5,'Chicken Samosas (2)', 'Pastries filled with chicken', 5),
(5,'Samosa Combo', 'One vegetable, one chicken samosa', 14),
(5,'Aloo Tikki', 'Potatoes & lentil patties', 6),
(5,'Vegetable Pakoda', 'Vegetable fritters', 2),
(5,'Seekh Kebab Tandoori', 'Ground lamb kebabs grilled in tandoor', 20),
(5,'Chicken Tikka Tandoori', 'Chicken grilled in tandoor', 26);
