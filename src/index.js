const express = require("express");
require("./db/mongoose");
const User = require("./models/user");
const Task = require("./models/task");

// Create express application
const app = express();
const port = 3000;

// Use express automatically json convert
app.use(express.json());

// Setup the user creation endpoint
app.post("/users", (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then(() => {
      res.send(user);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

// Setup the task creation endpoint
app.post("/tasks", (req, res) => {
  const task = new Task(req.body);
  task
    .save()
    .then(() => {
      res.send(task);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
