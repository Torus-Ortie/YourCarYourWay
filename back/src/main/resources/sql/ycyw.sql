-- Création de la base de données
CREATE DATABASE YourCarYourWayDB;
USE YourCarYourWayDB;

-- Table des utilisateurs
CREATE TABLE `USERS` (
    UserID INT AUTO_INCREMENT PRIMARY KEY,
    Role ENUM('CLIENT', 'SUPPORT', 'ADMIN') NOT NULL DEFAULT 'CLIENT',
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    Email VARCHAR(100) NOT NULL UNIQUE,
    Password VARCHAR(255) NOT NULL
);

-- Table des messages de support
CREATE TABLE SupportMessages (
    MessageID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT NOT NULL,
    ReservationID INT DEFAULT NULL,
    Content TEXT NOT NULL,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
);

INSERT INTO YourCarYourWayDB.users (Role, FirstName, LastName, Email, Password) VALUES ('SUPPORT', 'Support', 'Test', 'support@email.com', 'Support1234*');
INSERT INTO YourCarYourWayDB.users (Role, FirstName, LastName, Email, Password) VALUES ('CLIENT', 'Client', 'Test', 'client@email.com', 'Client1234*');