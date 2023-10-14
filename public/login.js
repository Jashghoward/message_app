// login.js
const loginForm = document.getElementById('login-form');


const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get the entered username and password
    const username = usernameInput.value;
    const password = passwordInput.value;

    // Implement your authentication logic here (e.g., check username and password)
    if (username === 'your_username' && password === 'your_password') {
        // Authentication successful, redirect to the chat interface
        window.location.href = 'index.html';
    } else {
        // Authentication failed, show an error message or handle it accordingly
        alert('Authentication failed. Please check your username and password.');
    }
});
