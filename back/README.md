# Your Car Your Way - Backend

## Description
The project is the backend for a proof of concept, for the OpenClassrooms project "Définissez une solution fonctionnelle et concevez l’architecture d’une application."

## Prerequisites
Before you begin, ensure you have installed the latest version of Maven and java JdK 21.

## Test Users

For your convenience, two test users will be initialized once you complete the backend installation steps. 
You can then use these credentials to access the frontend of the application.
To try out the websocket chat feature using these two users, login as each test user on a different browser.

  User with "Support" role:
  - email : `support@email.com`
  - name : `Support`
  - password : `Support1234*`
  
  User with "Client" role:
  - email : `client@email.com`
  - name : `Client`
  - password : `Client1234*`

## Backend installation and launch

### 1. Clone the repository

  ```bash
  git clone https://github.com/Torus-Ortie/YourCarYourWay.git
  ```

### 2. Update the application.properties file

  You need to update the application properties file with the correct client url and jwt secret variables.

  You may use a .env file (recommended), or replace the variables in the resources/application.properties file directly.
  
  The following variables need to updated with your own values:
  
  ```properties
  jwt.key=${JWT_KEY} #a secure, random string (UUID recommended)
  spring.datasource.url=${DB_URL} #example: jdbc:mysql://localhost:3306/test
  spring.datasource.username=${DB_USERNAME} #Login of your MySQL database
  spring.datasource.password=${DB_PASSWORD} #Password of your MySQL database
  ```

  *Note* - You can optionally change the server.url via the application properties file. The default url is `http://localhost:3001`
  
  If you change the server url, be sure to change it [here in the frontend environments directory](https://github.com/Torus-Ortie/YourCarYourWay/tree/main/front/src/environments) as well.

### 3. Build the project and install its dependencies

  ```bash
  mvn clean install
  ```

### 4. Launch the backend of the application

  ```bash
  mvn spring-boot:run
  ```

Once the server is running locally, you can access the API endpoints at `http://localhost:3001/api/`.


## Frontend installation and launch

### 1. Follow the instructions [here in the ReadMe for the frontend](https://github.com/Torus-Ortie/YourCarYourWay/tree/main/front/README.md)
