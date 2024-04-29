# task-manager

Task Manager is a simple web application built with Node.js, Express.js, and MongoDB that allows users to manage their tasks. Users can create an account, log in, create tasks, update tasks, mark tasks as completed, and delete tasks.

## Features

- User Authentication: Users can create an account with a unique email address and password. Authentication is handled using JSON Web Tokens (JWT).
- Task Management: Authenticated users can create, read, update, and delete tasks. Tasks can have a title, description, due date, and status (completed or pending).
- Secure Password Storage: User passwords are securely hashed using bcrypt before being stored in the database.
- Error Handling: The application provides meaningful error messages for common user errors, such as invalid credentials or duplicate email addresses during registration.
- RESTful API: The application provides a RESTful API for interacting with user accounts and tasks. API endpoints are documented below.

## Client-Side Functionality
The client-side of the Task Manager application is built using HTML, CSS, and JavaScript. It provides a user-friendly interface for accessing the features mentioned above. Users can:

Interact with forms for user authentication, including registration and login.
View their list of tasks, including details such as title, description, due date, and status.
Create new tasks, update existing tasks, mark tasks as completed, and delete tasks.
Receive real-time feedback and error messages when interacting with the application.
