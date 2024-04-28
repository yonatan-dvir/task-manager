// Import necessary modules
const mongoose = require("mongoose");

// Define the Task model schema using Mongoose
const Task = mongoose.model("Task", {
  description: {
    type: String,
    required: true,
    trim: true, // Trim leading/trailing whitespace
  },
  completed: {
    type: Boolean,
    default: false, // Default value if not provided
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
  },
});

// Export the model for using in other parts of the application
module.exports = Task;
