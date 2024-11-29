# Role-Based Access Control (RBAC)
This project implements JWT-based authentication for an Express.js application. It includes various routes for signup, login, and role-based access (User, Admin and Moderator). The API is secured using JWT tokens, and role-based middleware ensures that only authorized users can access certain resources.

## Project Structure
**auth.config.js:** Contains JWT secret and configuration.

**models/:** Contains database models for User and Role.

**controllers/:** Handles the logic for authentication and user management.

**routes/:** Defines the API endpoints for authentication and user roles.

**middlewares/:** Contains middleware for JWT verification and role checking.


## Dependencies
**express:** Web framework for Node.js

**jsonwebtoken:** For generating and verifying JWT tokens

**mongoose:** MongoDB ODM for interacting with the database

**cors:** Middleware for enabling Cross-Origin Resource Sharing

## Authentication Flow
**1. Signup (/api/auth/signup)**

Users can register by providing a username, email, and password. The roles "user", "admin", and "moderator" are automatically added to the database if they do not exist.

**Request:**
```
{
    "username": "testuser",
    "email": "testuser@example.com",
    "password": "password123",
    "roles": ["user"]  
}
```

**Response:**

```
{
  "message": "User was registered successfully!"
}
```

**2. Signin (/api/auth/signin)**

Users can sign in using their username/email and password. A JWT token is returned upon successful authentication.

**Request:**

``` 
{
  "username": "testuser",
  "password": "password123"
}
```
**Response:**

```
{
  "accessToken": "your-jwt-token"
}
```
**3. Accessing Protected Routes**

Protected routes require a valid JWT token for access. The token must be passed in the x-access-token or Authorization header as a Bearer token.

**Example Header:**
```
    Authorization: Bearer <your-jwt-token>
```

**4. User Routes**

**Get all users (/api/users/all):** Public route, no authentication required.

**Get user data (/api/users/user):** Requires a valid JWT token. Accessible to users with user role.

**Get moderator data (/api/users/mod):** Requires a valid JWT token and moderator role.

**Get admin data (/api/users/admin):** Requires a valid JWT token and admin role.

## API Endpoints

**Authentication Routes**

**POST /api/auth/signup:** Register a new user.

**POST /api/auth/signin:** Sign in with username and password.

## User Routes (Protected)

**GET /api/users/all:** Fetch all users (no authentication needed).

**GET /api/users/user:** Fetch user-specific data (requires JWT token).

**GET /api/users/mod:** Fetch moderator-specific data (requires moderator role).

**GET /api/users/admin:** Fetch admin-specific data (requires admin role).

## Authentication Middleware
**1. verifyToken**

This middleware checks whether the request contains a valid JWT token in the x-access-token or Authorization headers. If the token is missing or invalid, the request is rejected.

**2. isAdmin**

This middleware ensures that the user has the admin role. Only users with the admin role can access the corresponding route.

**3. isModerator**

This middleware ensures that the user has the moderator role. Only users with the moderator role can access the corresponding route.

## Testing the APIs
**1. Signup and Signin**

You can test the signup and signin routes using a tool like Thunder Client or Postman.

**Test Signup**

Open Thunder Client or Postman.
Set the method to POST and the URL to http://localhost:8080/api/auth/signup.
Add a JSON body with the user details.
Send the request. You should receive a success message.

**Test Signin**

Set the method to POST and the URL to http://localhost:8080/api/auth/signin.
Add a JSON body with the user's credentials (username and password).
Send the request. You should receive a JWT token in the response.

**2. Access Protected Routes**

**Test User Route**

Set the method to GET and the URL to http://localhost:8080/api/users/user.
In the headers, add Authorization: Bearer <your-jwt-token>.
Send the request. You should get a response with user-specific data if the token is valid.

**Test Moderator Route**

Set the method to GET and the URL to http://localhost:8080/api/users/mod.
In the headers, add Authorization: Bearer <your-jwt-token>.
Send the request. You should get a response with moderator-specific data if the token is valid and the user has a moderator role.

**Test Admin Route**

Set the method to GET and the URL to http://localhost:8080/api/users/admin.
In the headers, add Authorization: Bearer <your-jwt-token>.
Send the request. You should get a response with admin-specific data if the token is valid and the user has an admin role.

## Setting up the Project
**1. Clone the repository**

```
git clone <repository-url>
cd <repository-directory>
```

**2. Install dependencies**
```
npm install
```
**3. Set up MongoDB**

Make sure you have MongoDB running locally or use a MongoDB service like MongoDB Atlas. Update the auth.config.js file with your MongoDB connection details.

**4. Run the server**
```
npm start
```
The server should now be running on http://localhost:8080.

## Error Handling
### Common Errors
**403 No token provided:** 

Ensure that the x-access-token or Authorization header contains a valid JWT token.

**401 Unauthorized:** 

The token is invalid or expired. Try signing in again to get a new token.

**403 Require Admin Role:** 

The user does not have the admin role. Only users with the admin role can access certain routes.

**404 User Not Found:** 

The user ID in the token does not exist in the database.
### Conclusion
This project provides a simple but flexible JWT authentication system with role-based access control. It allows users to register, log in, and access routes based on their roles (user, moderator, or admin). The system ensures that only authorized users can access protected resources.