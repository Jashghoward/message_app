const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const socketIo = require('socket.io');
const { Client } = require('pg');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const port = 3001;

// Serve your static files (HTML, CSS, JS, etc.) using Express
app.use(express.static(__dirname + '/public'));

// Middleware to parse JSON data
app.use(bodyParser.json());

// Configure your database connection
const dbConfig = {
    user: 'joshhoward',
    host: 'localhost',
    database: 'chat_app_dev',
    password: '', // Replace with your database password
    port: 5432, // Default PostgreSQL port
};

const client = new Client(dbConfig);

// Connect to the database
client.connect()
    .then(() => {
        console.log('Connected to PostgreSQL database');
        createTables(); // Create tables when the database connection is established
    })
    .catch((err) => {
        console.error('Error connecting to PostgreSQL:', err);
    });

// Function to create tables
const createTables = () => {
    const createTablesQuery = `
        -- Create a table to store messages
        CREATE TABLE IF NOT EXISTS messages (
            id SERIAL PRIMARY KEY,
            sender_id INT NOT NULL,
            message_text TEXT NOT NULL,
            timestamp TIMESTAMPTZ DEFAULT NOW()
        );

        -- Create a table to store user information
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL
        );

        -- Create a table to store user status (logged in or logged out)
        CREATE TABLE IF NOT EXISTS user_status (
            user_id INT NOT NULL,
            is_logged_in BOOLEAN NOT NULL DEFAULT false,
            last_login TIMESTAMPTZ,
            last_logout TIMESTAMPTZ
        );
    `;

    client.query(createTablesQuery)
        .then(() => {
            console.log('Tables created successfully');
        })
        .catch((err) => {
            console.error('Error creating tables:', err);
        });
};

// Handle Socket.io connections and chat logic here
io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle new messages
    socket.on('sendMessage', (message) => {
        // Broadcast the message to all connected clients
        io.emit('message', message);
    });
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Define a route for user registration (signup)


app.post('/signup', (req, res) => {
    const newUser = {
        username: req.body.username,
        password: req.body.password, // Hash the password using bcrypt (not shown in this code)
    };

    const insertUserQuery = {
        text: 'INSERT INTO users(username, password) VALUES($1, $2)',
        values: [newUser.username, newUser.password],
    };

    client.query(insertUserQuery)
        .then(() => {
            console.log('User inserted successfully');
            res.status(201).send('User inserted successfully');
        })
        .catch((err) => {
            console.error('Error inserting user:', err);
            res.status(500).send('Error inserting user');
        });
});

// Define a route for user login
app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // Check the username and password against your database
    // Replace this logic with actual authentication code
    // Example: Hash the password and compare it with the stored hash
    // Example: Fetch user from the database by username and compare hashes

    // For simplicity, let's assume the login is successful
    const isAuthenticated = true;

    if (isAuthenticated) {
        // Redirect to the message-sending page (e.g., messages.html)
        res.redirect('/messages.html');
    } else {
        // If login fails, you can redirect to the login page with an error message
        res.redirect('/login.html?error=1');
    }
});

// Start your Express server
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
