# MERN-TODO Application

A full-stack TODO list application built with the MERN stack (MongoDB, Express.js, React, Node.js). This application allows users to register, log in, and manage their personal to-do lists.

## Features

- **User Authentication**: Secure user registration and login system.
- **CRUD Operations**: Create, Read, Update, and Delete TODO items.
- **Responsive UI**: A clean and intuitive user interface built with React.
- **RESTful API**: A well-structured backend API to handle application logic and data.

## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Development**: Nodemon for backend auto-reloading.

## Project Structure

The project uses a monorepo structure, with the frontend and backend code separated into their own directories.

```
MERN-TODO/
├── backend/         # Express.js REST API
└── frontend/
    └── client/      # React Application
```

---

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/en/) (v14 or newer)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/try/download/community). Make sure your MongoDB server is running.

### Installation

1.  **Clone the repository**

    ```sh
    git clone <your-repository-url>
    cd MERN-TODO
    ```

2.  **Install Backend Dependencies**

    ```sh
    cd backend
    npm install
    ```

3.  **Install Frontend Dependencies**
    ```sh
    cd ../frontend/client
    npm install
    ```

### Environment Variables

This project uses environment variables to handle sensitive information like database connection strings and secret keys.

1.  **Backend (`/backend/.env`)**

    Create a `.env` file in the `backend` directory and add the following variables.

    ```env
    # MongoDB Connection
    MONGO_URI=mongodb://localhost:27017/your_db_name

    # JSON Web Token Secret
    JWT_SECRET=your_jwt_secret

    # Server Port
    PORT=5000
    ```

2.  **Frontend (`/frontend/client/.env`)**

    Create a `.env` file in the `frontend/client` directory to specify the backend API endpoint.

    ```env
    REACT_APP_API_URL=http://localhost:5000/api
    ```

### Running the Application

You will need to run the frontend and backend servers concurrently in two separate terminal windows.

1.  **Run the Backend Server**

    From the `/backend` directory:

    ```sh
    # Using nodemon for development (auto-reloads on changes)
    npm run dev

    # Or, for production
    npm start
    ```

    The backend API will be running on `http://localhost:5000`.

2.  **Run the Frontend Client**

    From the `/frontend/client` directory:

    ```sh
    npm start
    ```

    The React application will open in your browser at `http://localhost:3000`.

---

## How to Use

### Registration and Login

1.  Navigate to the application in your browser (`http://localhost:3000`).
2.  Click on the "Register" or "Sign Up" link.
3.  Fill in the registration form with your details (e.g., username, email, password) and submit.
4.  Once registered, you will be redirected to the login page.
5.  Enter your credentials to log in to your account.

### Managing Todos

- **Create a Todo**: After logging in, you will see an input field. Type your new to-do item and press Enter or click the "Add" button.
- **View Todos**: All your to-do items are listed on the main page.
- **Update a Todo**: Click the "Edit" icon next to a to-do item to modify its text.
- **Complete a Todo**: Click the checkbox next to a to-do item to mark it as complete.
- **Delete a Todo**: Click the "Delete" or trash icon to permanently remove a to-do item.

---

## API Endpoints (Example)

> **Note**: This is an example structure. You should update it to reflect your actual API.

- **Authentication**

  - `POST /api/auth/register` - Register a new user.
  - `POST /api/auth/login` - Log in a user and receive a JWT.

- **Todos**
  - `GET /api/todos` - Get all todos for the logged-in user.
  - `POST /api/todos` - Create a new todo.
  - `PUT /api/todos/:id` - Update an existing todo.
  - `DELETE /api/todos/:id` - Delete a todo.
