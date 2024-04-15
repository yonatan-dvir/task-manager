// Import necessary modules
const mongoose = require("mongoose");
const validator = require("validator");

// Define the User model schema using Mongoose
const User = mongoose.model("User", {
  name: {
    type: String,
    required: true,
    trim: true, // Trim leading/trailing whitespace
  },
  email: {
    type: String,
    required: true,
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
});

// Export the User model for use in other parts of the application
module.exports = User;
