const mongoose = require("mongoose");
const validator = require("validator");

// async function main() {
//   await mongoose.connect("mongodb://127.0.0.1:27017/test");
// }

mongoose.connect("mongodb://127.0.0.1:27017/test=manager-api");

const User = mongoose.model("User", {
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  password: {
    type: String,
    require: true,
    trim: true,
    minlength: 7,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error('Password cannot contain "password"');
      }
    },
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error("Age must be positive");
      }
    },
  },
});

// const me = new User({
//   name: " . Yonatan ",
//   email: "yonatandvir313@gmail.com",
//   age: 24,
//   password: "4345gggg3",
// });

// me.save()
//   .then(() => {
//     console.log(me);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

const Task = mongoose.model("Task", {
  description: {
    type: String,
    required: true,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const task = new Task({
  description: "Do HW",
});

task
  .save()
  .then(() => {
    console.log(task);
  })
  .catch((error) => {
    console.log(error);
  });
