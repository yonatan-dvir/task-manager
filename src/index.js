const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user.js");
const taskRouter = require("./routers/task.js");

// Create express application
const app = express();
const port = 3000;

// Use express automatically json convert
app.use(express.json());

// Use user ans task routers in our app
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
