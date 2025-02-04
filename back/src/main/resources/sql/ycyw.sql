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
    `user_id` INT NOT NULL,
    `reservation_id` INT DEFAULT NULL,
    `content` TEXT NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE `SUPPORTMESSAGES` ADD FOREIGN KEY (`user_id`) REFERENCES `USERS` (`id`);

INSERT INTO ycyw.USERS (`name`, `email`, `role`, `password`) VALUES ('Support', 'support@email.com', 'SUPPORT', 'Support1234*');
INSERT INTO ycyw.USERS (`name`, `email`, `role`, `password`) VALUES ('Client', 'client@email.com','CLIENT',  'Client1234*');