const express = require("express");
require("./db/mongoose");
const User = require("./models/user");
const Task = require("./models/task");

// Create express application
const app = express();
const port = 3000;

// Use express automatically json convert
app.use(express.json());

// Setup creation endpoint - create user
app.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Setup reading endpoint - read all users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (e) {
    res.status(500).send();
  }
});

// Setup reading endpoint - read user by id
app.get("/users/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (e) {
    res.status(500).send();
  }
});

// Setup updating endpoint - update user by id
app.patch("/users/:id", async (req, res) => {
  // Send error if the update is unknown
  const updates = Object.keys(req.body);
  const allowedUpdated = ["name", "email", "password", "age"];
  const isValidOperation = updates.every((update) =>
    allowedUpdated.includes(update)
  );
  if (!isValidOperation) {
    res.status(400).send("Error - Invalid update!");
  }
  const _id = req.params.id;
  try {
    const user = await User.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      res.status(404).send();
    }
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

// Setup creation endpoint - create task
app.post("/tasks", async (req, res) => {
  const task = new Task(req.body);

  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Setup reading endpoint - read all tasks
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.send(tasks);
  } catch (e) {
    res.status(500).send();
  }
});

// Setup reading endpoint - read task by id
app.get("/tasks/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findById(_id);
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    console.log("here");
    res.status(500).send();
  }
});

// Setup updating endpoint - update task by id
app.patch("/tasks/:id", async (req, res) => {
  // Send error if the update is unknown
  const updates = Object.keys(req.body);
  const allowedUpdated = ["description", "completed"];
  const isValidOperation = updates.every((update) =>
    allowedUpdated.includes(update)
  );
  if (!isValidOperation) {
    res.status(400).send("Error - Invalid update!");
  }
  const _id = req.params.id;
  try {
    const task = await Task.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
