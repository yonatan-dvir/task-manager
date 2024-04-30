const express = require("express");
const path = require("path");

const app = express();
const port = 1234;

// Define paths for Express config
const publicDirPath = path.join(__dirname, "../public");

// Serve static files from the 'public' directory
app.use(express.static(publicDirPath));

// Start the server
app.listen(port, () => {
  console.log(`Client server is up and running on port ${port}...`);
});
