const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const port = 3001;

app.use(express.static(__dirname + '/public'));

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('sendMessage', (message) => {
    io.emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});










// const express = require('express');
// const app = express() ;
// const http = require('http');
// const socketIo = require('socket.io');
// const bodyParser = require('body-parser');
// const { Client } = require('pg'); // Import the pg library


// const port = 3001; // Use the correct port number

// // Serve your static files (HTML, CSS, JS, etc.) using Express
// app.use(express.static(__dirname + '/public'));

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send('Something went wrong!');
// });

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });



// // Serve your static files (HTML, CSS, JS, etc.) using Express
// app.use(express.static(__dirname + '/public'));

// // Configure your database connection
// const dbConfig = {
//     user: 'joshhoward',
//     host: 'localhost',
//     database: 'chat_app_dev',
//     password: '',
//     port: 5432, // Default PostgreSQL port
// };

// const client = new Client(dbConfig);

// // Connect to the database
// client.connect()
//     .then(() => {
//         console.log('Connected to PostgreSQL database');
//         createTables(); // Create tables when the database connection is established
//     })
//     .catch((err) => {
//         console.error('Error connecting to PostgreSQL:', err);
//     });

// // Function to create tables
// const createTables = () => {
//     const createTablesQuery = `
//         -- Create a table to store messages
//         CREATE TABLE IF NOT EXISTS messages (
//             id SERIAL PRIMARY KEY,
//             sender_id INT NOT NULL,
//             message_text TEXT NOT NULL,
//             timestamp TIMESTAMPTZ DEFAULT NOW()
//         );

//         -- Create a table to store user information
//         CREATE TABLE IF NOT EXISTS users (
//             id SERIAL PRIMARY KEY,
//             username VARCHAR(255) UNIQUE NOT NULL,
//             password VARCHAR(255) NOT NULL
//         );

//         -- Create a table to store user status (logged in or logged out)
//         CREATE TABLE IF NOT EXISTS user_status (
//             user_id INT NOT NULL,
//             is_logged_in BOOLEAN NOT NULL DEFAULT false,
//             last_login TIMESTAMPTZ,
//             last_logout TIMESTAMPTZ
//         );
//     `;

//     client.query(createTablesQuery)
//         .then(() => {
//             console.log('Tables created successfully');
//         })
//         .catch((err) => {
//             console.error('Error creating tables:', err);
//         });
// };

// // Start your HTTP server for Socket.io
// const server = http.createServer(app);
// const io = socketIo(server);

// // Handle Socket.io connections and chat logic here
// io.on('connection', (socket) => {
//     console.log('A user connected');

//     // Handle new messages
//     socket.on('sendMessage', (message) => {
//         // Broadcast the message to all connected clients
//         io.emit('message', message);
//     });

//     socket.on('disconnect', () => {
//         console.log('A user disconnected');
//     });
// });

// // Start your Express server
// server.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });

// // Define a route for user registration
// app.post('/signup', (req, res) => {
//     const newUser = {
//         username: req.body.username,
//         password: req.body.password, // Hash the password using bcrypt (not shown in this code)
//     };

//     const insertUserQuery = {
//         text: 'INSERT INTO users(username, password) VALUES($1, $2)',
//         values: [newUser.username, newUser.password],
//     };

//     client.query(insertUserQuery)
//         .then(() => {
//             console.log('User inserted successfully');
//             res.status(201).send('User inserted successfully');
//         })
//         .catch((err) => {
//             console.error('Error inserting user:', err);
//             res.status(500).send('Error inserting user');
//         });
// });


// // Define other routes and server logic as needed