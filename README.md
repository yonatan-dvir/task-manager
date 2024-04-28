# task-manager

Task Manager is a simple web application built with Node.js, Express.js, and MongoDB that allows users to manage their tasks. Users can create an account, log in, create tasks, update tasks, mark tasks as completed, and delete tasks.

## Features

- User Authentication: Users can create an account with a unique email address and password. Authentication is handled using JSON Web Tokens (JWT).
- Task Management: Authenticated users can create, read, update, and delete tasks. Tasks can have a title, description, due date, and status (completed or pending).
- Secure Password Storage: User passwords are securely hashed using bcrypt before being stored in the database.
- Error Handling: The application provides meaningful error messages for common user errors, such as invalid credentials or duplicate email addresses during registration.
- RESTful API: The application provides a RESTful API for interacting with user accounts and tasks. API endpoints are documented below.
