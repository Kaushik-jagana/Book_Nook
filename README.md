# Book_Nook
 
# Description
The Book Nook is a full-stack web application for managing a bookstore. It allows users to browse books by genre, add them to their cart, and make purchases. Admin users can log in to manage the inventory and perform other administrative tasks.

# Features
* User Registration and Login: Secure user registration and login using JWT authentication.
* Browse Books by Genre: Users can filter books by genre and view details about each book.
* Shopping Cart: Users can add books to their cart and proceed to checkout.
* Admin Dashboard: Admin users can manage the bookstore inventory and view reports.

# Setup Instructions

1. Clone the repo :

```(bash)
git clone https://github.com/your-username/the-book-nook.git
cd the-book-nook
```

2. Important: Delete the node_modules Folder. I accidentally pushed the node_modules folder to the repository, you should delete it before proceeding.

```(bash)
rm -rf node_modules
```

3. Install Dependencies
   
```(bash)
npm install
```

4. Set Up Environment Variables.
   Create a .env file in the root directory of your project and add the following environment variables:

```(JSON)
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=book_nook

JWT_SECRET=your_jwt_secret_key_here
```
5. Set Up the Database.
   Use MySQL Workbench or another MySQL client to create a database:
```(bash)
   CREATE TABLE staff (
       id INT AUTO_INCREMENT PRIMARY KEY,
       username VARCHAR(50) NOT NULL,
       password VARCHAR(255) NOT NULL,
       role ENUM('admin', 'employee') NOT NULL,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );

   CREATE TABLE books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    author VARCHAR(100) NOT NULL,
    genre VARCHAR(50) NOT NULL,
    isbn VARCHAR(13) NOT NULL UNIQUE,
    price DECIMAL(10, 2) NOT NULL,
    quantity INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

```

6.Run the Server
  Run the Server.The server should now be running at http://localhost:3000.
  ```(bash)
npm start
```
7.Running the Frontend
  If the frontend is in a separate directory, navigate to that directory and install dependencies:
  ```(bash)
cd the-book-nook-frontend
npm install

```
  Then, start the frontend development server.The frontend should now be running at http://localhost:3001..
  ```(bash)
npm start
```
8.Accessing the Application
*  Frontend: Visit http://localhost:3001 in your browser.
*  API: The backend API can be accessed at http://localhost:3000/api.

   
