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

-- Table des messages de support
CREATE TABLE `SUPPORTMESSAGES` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `reservation_id` VARCHAR(255) NOT NULL,
    `content` TEXT,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO ycyw.USERS (`name`, `email`, `role`, `password`) VALUES ('Support', 'support@email.com', 'SUPPORT', 'Support1234*');
INSERT INTO ycyw.USERS (`name`, `email`, `role`, `password`) VALUES ('Client', 'client@email.com','CLIENT',  'Client1234*');