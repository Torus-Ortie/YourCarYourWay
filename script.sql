-- Création de la base de données
CREATE DATABASE YourCarYourWayDB;
USE YourCarYourWayDB;

-- Table des utilisateurs
CREATE TABLE Users (
    UserID INT AUTO_INCREMENT PRIMARY KEY,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    Email VARCHAR(100) NOT NULL UNIQUE,
    PasswordHash VARCHAR(255) NOT NULL,
    DateOfBirth DATE NOT NULL,
    Address TEXT,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table des agences
CREATE TABLE Agencies (
    AgencyID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Address TEXT NOT NULL,
    City VARCHAR(50) NOT NULL,
    Country VARCHAR(50) NOT NULL,
    PhoneNumber VARCHAR(20)
);

-- Table des catégories de véhicules
CREATE TABLE VehicleCategories (
    CategoryID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(50) NOT NULL UNIQUE,
    Description TEXT
);

-- Table des véhicules
CREATE TABLE Vehicles (
    VehicleID INT AUTO_INCREMENT PRIMARY KEY,
    CategoryID INT NOT NULL,
    AgencyID INT NOT NULL,
    Brand VARCHAR(50) NOT NULL,
    Model VARCHAR(50) NOT NULL,
    Year INT NOT NULL,
    LicensePlate VARCHAR(20) UNIQUE NOT NULL,
    FOREIGN KEY (CategoryID) REFERENCES VehicleCategories(CategoryID),
    FOREIGN KEY (AgencyID) REFERENCES Agencies(AgencyID)
);

-- Table des réservations
CREATE TABLE Reservations (
    ReservationID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT NOT NULL,
    VehicleID INT NOT NULL,
    PickupAgencyID INT NOT NULL,
    DropoffAgencyID INT NOT NULL,
    PickupDate DATETIME NOT NULL,
    DropoffDate DATETIME NOT NULL,
    TotalPrice DECIMAL(10, 2) NOT NULL,
    Status ENUM('Pending', 'Confirmed', 'Cancelled', 'Completed') DEFAULT 'Pending',
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (VehicleID) REFERENCES Vehicles(VehicleID),
    FOREIGN KEY (PickupAgencyID) REFERENCES Agencies(AgencyID),
    FOREIGN KEY (DropoffAgencyID) REFERENCES Agencies(AgencyID)
);

-- Table des paiements
CREATE TABLE Payments (
    PaymentID INT AUTO_INCREMENT PRIMARY KEY,
    ReservationID INT NOT NULL,
    PaymentDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    Amount DECIMAL(10, 2) NOT NULL,
    PaymentMethod ENUM('Credit Card', 'PayPal', 'Bank Transfer') NOT NULL,
    Status ENUM('Success', 'Failed') DEFAULT 'Success',
    FOREIGN KEY (ReservationID) REFERENCES Reservations(ReservationID)
);

-- Table des messages de support
CREATE TABLE SupportMessages (
    MessageID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT NOT NULL,
    ReservationID INT DEFAULT NULL,
    MessageType ENUM('Chat', 'Email', 'Visio') NOT NULL,
    Content TEXT NOT NULL,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (ReservationID) REFERENCES Reservations(ReservationID)
);
