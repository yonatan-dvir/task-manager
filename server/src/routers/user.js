const express = require("express");
const User = require("../models/user");
const Task = require("../models/task");
const auth = require("../middleware/auth");

// Create a new Router instance to handle user-related routes
const router = new express.Router();

// Endpoint to create a new user (sign-up)
router.post("/users", async (req, res) => {
  console.log("creating user");
  const user = new User(req.body);
  try {
    //await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    console.log(e);
    if (e.code === 11000 && e.keyPattern.email) {
      // Email address is already taken
      res.status(400).send({ error: "Email address is already in use" });
    } else {
      // Other errors (e.g., validation errors)
      res.status(400).send({ error: e.message });
    }
  }
});

// Endpoint to user login
router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    console.log(e);
    res.status(400).send({ error: e.message });
  }
});

// Create endoint for user logout
router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send();
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: e.message });
  }
});

// Create endpoint for user logout from all devices
router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: e.message });
  }
});

// Endpoint to fetch logged in user's profile
router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});

// Endpoint to update a user by its ID
router.patch("/users/me", auth, async (req, res) => {
  // Send error if the update is unknown
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send({ error: e.message }"Error - Invalid update!");
  }

  try {
    updates.forEach((update) => {
      req.user[update] = req.body[update];
    });
    await req.user.save();
    res.send(req.user);
  } catch (e) {
    res.status(500).send(e);
  }
});

// Endpoint to delete the logged in user
router.delete("/users/me", auth, async (req, res) => {
  try {
    // const user = await User.findByIdAndDelete(req.user._id);
    // if (!user) {
    //   return res.status(404).send();
    // }
    await Task.deleteMany({ owner: req.user._id });
    await req.user.deleteOne();
    res.send(req.user);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

module.exports = router;
