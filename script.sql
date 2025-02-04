-- Création de la base de données
CREATE DATABASE ycyw;
USE ycyw;

-- Table des utilisateurs
CREATE TABLE `USERS` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `role` ENUM('CLIENT', 'SUPPORT', 'ADMIN') NOT NULL DEFAULT 'CLIENT',
    `password` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table des agences
CREATE TABLE `AGENCIES` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(100) NOT NULL,
    `address` TEXT NOT NULL,
    `city` VARCHAR(50) NOT NULL,
    `country` VARCHAR(50) NOT NULL,
    `phone_number` VARCHAR(20)
);

-- Table des catégories de véhicules
CREATE TABLE `VEHICULECATEGORIES` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(50) NOT NULL UNIQUE,
    `description` TEXT
);

-- Table des véhicules
CREATE TABLE `VEHICULES` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `category_id` INT NOT NULL,
    `agency_id` INT NOT NULL,
    `brand` VARCHAR(50) NOT NULL,
    `model` VARCHAR(50) NOT NULL,
    `year` INT NOT NULL,
    `license_plate` VARCHAR(20) UNIQUE NOT NULL,
);

-- Table des réservations
CREATE TABLE `RESERVATIONS` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT NOT NULL,
    `vehicle_id` INT NOT NULL,
    `pickup_agency_id` INT NOT NULL,
    `dropoff_agency_id` INT NOT NULL,
    `pickup_date` DATETIME NOT NULL,
    `dropoff_date` DATETIME NOT NULL,
    `total_price` DECIMAL(10, 2) NOT NULL,
    `status` ENUM('Pending', 'Confirmed', 'Cancelled', 'Completed') DEFAULT 'Pending',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
);

-- Table des paiements
CREATE TABLE `PAYMENT` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `reservation_id` INT NOT NULL,
    `payment_date` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `amount` DECIMAL(10, 2) NOT NULL,
    `payment_method` ENUM('Credit Card', 'PayPal', 'Bank Transfer') NOT NULL,
    `status` ENUM('Success', 'Failed') DEFAULT 'Success',
);

-- Table des messages de support
CREATE TABLE `SUPPORTMESSAGES` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT NOT NULL,
    `reservation_id` INT DEFAULT NULL,
    `content` TEXT NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE `VEHICULES` ADD FOREIGN KEY (`category_id`) REFERENCES `VEHICULECATEGORIES` (`id`);
ALTER TABLE `VEHICULES` ADD FOREIGN KEY (`agency_id`) REFERENCES `AGENCIES` (`id`);

ALTER TABLE `RESERVATIONS` ADD FOREIGN KEY (`user_id`) REFERENCES `USERS` (`id`);
ALTER TABLE `RESERVATIONS` ADD FOREIGN KEY (`vehicle_id`) REFERENCES `VEHICULES` (`id`);
ALTER TABLE `RESERVATIONS` ADD FOREIGN KEY (`pickup_agency_id`) REFERENCES `AGENCIES` (`id`);
ALTER TABLE `RESERVATIONS` ADD FOREIGN KEY (`dropoff_agency_id`) REFERENCES `AGENCIES` (`id`);

ALTER TABLE `PAYMENT` ADD FOREIGN KEY (`reservation_id`) REFERENCES `RESERVATIONS` (`id`);

ALTER TABLE `SUPPORTMESSAGES` ADD FOREIGN KEY (`user_id`) REFERENCES `USERS` (`id`);
ALTER TABLE `SUPPORTMESSAGES` ADD FOREIGN KEY (`reservation_id`) REFERENCES `RESERVATIONS` (`id`);