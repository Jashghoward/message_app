const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Serve your static files (HTML, CSS, JS, etc.) using Express
app.use(express.static(__dirname + '/public'));

// Middleware to parse JSON data
app.use(bodyParser.json());

// Define your routes and other middleware as needed

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

module.exports = app;
