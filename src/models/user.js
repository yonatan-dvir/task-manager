// Import necessary modules
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

// Define the User model schema using Mongoose
const userSchema = new mongoose.Schema({
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

// Define a method for searching user by email and password (credentials)
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({email});
  if (!user){
    throw new Error ('Unable to login');
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch){
    throw new Error ('Unable to login');
  }
  return user;
} 

// Hash the user pain text password
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    const hashedPassword = await bcrypt.hash(user.password, 8);
    console.log(hashedPassword);
    user.password = hashedPassword;
  }
  next();
});

const User = mongoose.model("User", userSchema);

// Export the User model for using in other parts of the application
module.exports = User;
