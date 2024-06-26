const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true, // Trim leading/trailing whitespace
  },
  email: {
    type: String,
    unique: true,
    require: true,
    trim: true,
    lowercase: true, // Convert email to lowercase
    validate(value) {
      // Validate email using validator library
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  password: {
    type: String,
    require: true,
    trim: true, // Trim leading/trailing whitespace
    minlength: 7, // Minimum length of password
    // Check if password contains "password"
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error('Password cannot contain "password"');
      }
    },
  },
  age: {
    type: Number,
    default: 0, // Default value if not provided
    // Validate age to be positive
    validate(value) {
      if (value < 0) {
        throw new Error("Age must be positive");
      }
    },
  },
  tokens: [
    {
      token: {
        type: String,
        require: true,
      },
    },
  ],
});

// Create a vrtual field of user's tasks
userSchema.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "owner",
});

// Define a static method for searching user by email and password (credentials)
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Unable to login");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Unable to login");
  }
  return user;
};

// Define an instance method for generating a user token
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "thisismysecret");
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

// Define an instance method for toJSON
userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;
  return userObject;
};

// Hash the user plain text password
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    const hashedPassword = await bcrypt.hash(user.password, 8);
    user.password = hashedPassword;
  }
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
