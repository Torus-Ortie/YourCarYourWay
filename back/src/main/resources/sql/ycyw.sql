-- Création de la base de données
CREATE DATABASE ycyw;
USE ycyw;

-- Table des utilisateurs
CREATE TABLE `USERS` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `role` ENUM('CLIENT', 'SUPPORT', 'ADMIN') NOT NULL DEFAULT 'CLIENT',
    `firstname` VARCHAR(255) NOT NULL,
    `lastname` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL UNIQUE,
    `password` VARCHAR(255) NOT NULL
);

-- Table des messages de support
CREATE TABLE `SUPPORTMESSAGES` (
    `messageid` INT AUTO_INCREMENT PRIMARY KEY,
    `userid` INT NOT NULL,
    `reservationid` INT DEFAULT NULL,
    `content` TEXT NOT NULL,
    `createdat` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE `SUPPORTMESSAGES` ADD FOREIGN KEY (`userid`) REFERENCES `USERS` (`id`);

INSERT INTO ycyw.USERS (`role`, `firstname`, `lastname`, `email`, `password`) VALUES ('SUPPORT', 'Support', 'Test', 'support@email.com', 'Support1234*');
INSERT INTO ycyw.USERS (`role`, `firstname`, `lastname`, `email`, `password`) VALUES ('CLIENT', 'Client', 'Test', 'client@email.com', 'Client1234*');