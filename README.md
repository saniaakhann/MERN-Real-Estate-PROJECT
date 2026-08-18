# 🏠 MERN Real Estate

A full-stack real estate web application built with the **MERN stack** that allows users to explore property listings, search for properties, create and manage their own listings, and manage their profiles.

## 🚀 Live Demo

[View the Live Application](https://mern-real-estate-08t2.onrender.com)

## 📌 Features

### 🔐 User Authentication

* User registration and sign-in
* Google authentication
* Protected routes for authenticated users
* Secure sign-out functionality

### 🏡 Property Listings

* Browse available properties
* View detailed property information
* Search and filter property listings
* Create new property listings
* Update existing listings
* Delete your own listings

### 👤 User Profile

* View user profile
* Update profile information
* View properties created by the user
* Manage account information

### 🎨 User Interface

* Responsive design
* Clean and intuitive interface
* Modern UI built with React and Tailwind CSS
* Client-side routing with React Router

### ⚡ Backend

* RESTful API built with Express.js
* MongoDB database with Mongoose
* Authentication and authorization
* Error handling middleware
* CRUD operations for users and property listings

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* React Router
* Redux Toolkit
* Tailwind CSS
* Firebase Authentication

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JSON Web Tokens
* Cookie-based authentication

## 📂 Project Structure

```text
MERN-Real-Estate/
│
├── api/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── index.js
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   ├── App.jsx
│   │   ├── firebase.js
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── package.json
├── package-lock.json
└── README.md
```

## ⚙️ Getting Started

### Prerequisites

Make sure you have the following installed:

* [Node.js](https://nodejs.org/)
* MongoDB
* npm

### 1. Clone the Repository

```bash
git clone https://github.com/saniaakhann/MERN-Real-Estate-PROJECT.git
cd MERN-Real-Estate-PROJECT
```

### 2. Install Backend Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory and add the required backend environment variables.

Example:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Add the required Firebase environment variables to the `client` configuration as used by the application.

> Never commit your actual API keys, database credentials, or secrets to GitHub.

### 4. Install Frontend Dependencies

```bash
cd client
npm install
```

### 5. Start the Application

Start the backend from the root directory:

```bash
npm run dev
```

Then start the frontend:

```bash
cd client
npm run dev
```

The application will be available at the local development URL provided by Vite.

## 🔗 API Functionality

The application provides API functionality for:

### User

* Sign up
* Sign in
* Google authentication
* Sign out
* Get user information
* Update user
* Delete user
* Get user's listings

### Listings

* Create listing
* Get listings
* Get a single listing
* Update listing
* Delete listing
* Search listings

## 📸 Application Pages

The application includes:

* Home
* About
* Sign In
* Sign Up
* Search
* Listings
* Listing Details
* Create Listing
* Update Listing
* Profile

## 🌐 Deployment

The application is deployed and available through the live demo link above.

The frontend and backend can also be deployed using platforms such as Render or other suitable hosting services.

## 👩‍💻 Author

**Sania khann**

Information Technology Student
Full-Stack Web Development Enthusiast

---

⭐ If you found this project useful, consider giving the repository a star.

## Screenshots📸

![App Screenshot](https://github.com/D-4-DIBAKAR/MERN-Real-Estate/assets/71878062/fed29361-1ba2-4eef-8437-00735746fab6)

![App Screenshot](https://github.com/D-4-DIBAKAR/MERN-Real-Estate/assets/71878062/df1124b5-2e20-4e7f-ab42-7c17710d5a36)

![App Screenshot](https://github.com/D-4-DIBAKAR/MERN-Real-Estate/assets/71878062/bb53a619-90bb-4353-9a08-d953197a7e8b)

![App Screenshot](https://github.com/D-4-DIBAKAR/MERN-Real-Estate/assets/71878062/048f7700-9881-4cd4-a2e3-3adfbf285245)

![App Screenshot](https://github.com/D-4-DIBAKAR/MERN-Real-Estate/assets/71878062/3f123369-b3b8-4411-a2b3-ddd8df7e7fc5)

![App Screenshot](https://github.com/D-4-DIBAKAR/MERN-Real-Estate/assets/71878062/f7c6a6ab-ccf3-4d5f-9903-26ae9bdf3b02)

![App Screenshot](https://github.com/D-4-DIBAKAR/MERN-Real-Estate/assets/71878062/20a909ff-8907-4ad0-be32-85c065d3c798)

## 🚀 About Me

### Hi 👋, I'M SANIA KHAN

I'm Passionate Full Stack Developer crafting seamless frontend experiences and powerful backend solutions. Expert in React.js and Node.js
