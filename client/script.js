const axios = require("axios");

// Define the URL of your server-side API endpoint
const apiUrl = "http://localhost:3000/login";

// Make a GET request to fetch data from the server
axios
  .get(apiUrl)
  .then((response) => {
    // Handle successful response
    console.log("Data from server:", response.data);
  })
  .catch((error) => {
    // Handle error
    console.error("Error fetching data:", error);
  });
