// Import the express framework
const express = require("express");

// Import the database connection setup
require("./db/mongoose");

// Import routers for handling user and task routes
const userRouter = require("./routers/user.js");
const taskRouter = require("./routers/task.js");

// Create an instance of the Express application
const app = express();

// Define the port number on which the server will listen
const port = 3000;

// Use Express's automatically incoming json requests bodies converting
app.use(express.json());

// Register user and task routers with the Express application
app.use(userRouter);
app.use(taskRouter);

// Start the Express server and listen on the given port
app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
