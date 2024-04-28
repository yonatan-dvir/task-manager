const mongoose = require("mongoose");

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

module.exports = Task;
