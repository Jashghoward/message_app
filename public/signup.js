// signup.js
const signupForm = document.getElementById('signup-form');


const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');



signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get the entered username and password




    const username = usernameInput.value;
    const password = passwordInput.value;

    // Implement your user registration logic here (e.g., store in a database)
    // Redirect to the login page once registration is successful
    alert('Registration successful. You can now log in.');
    window.location.href = 'login.html';
});

const express = require('express');
const app = express();

// Serve your static files (HTML, CSS, JS, etc.) using Express
app.use(express.static(__dirname + '/public'));

// ... Define your routes and other server logic ...

// Start your Express server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
