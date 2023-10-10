// client.js
const socket = io();
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');
const chatMessages = document.getElementById('chat-messages');

// Get the username of the logged-in user (you need to implement this)
const loggedInUsername = "Alice"; // Replace with the actual username

socket.on('message', (data) => {
  // Parse the data received from the server
  const { sender, message } = JSON.parse(data);

  // Create a new message element
  const messageElement = document.createElement('div');

  

  // Display the sender's name above the message
  const senderElement = document.createElement('strong');
  senderElement.textContent = sender + ': ';
  messageElement.appendChild(senderElement);

  // Display the message content
  const messageContentElement = document.createElement('span');
  messageContentElement.textContent = message;
  messageElement.appendChild(messageContentElement);

  // Append the message element to the chat messages container
  chatMessages.appendChild(messageElement);
});

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = messageInput.value;
  
  // Send the message and the sender's name to the server
  socket.emit('sendMessage', JSON.stringify({ sender: loggedInUsername, message }));
  
  // Clear the input field
  messageInput.value = '';
});

// Event listener for login form (Assuming you have a login form)
const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const usernameInput = document.getElementById('username');
    loggedInUsername = usernameInput.value; // Store the logged-in user's username
    loginForm.style.display = 'none'; // Hide the login form
    // Show the chat interface or do any other logic you need
});

socket.on('message', (message) => {
    const messageElement = document.createElement('div');
    const messageTextElement = document.createElement('p');
    messageTextElement.textContent = message.text;
    const senderNameElement = document.createElement('small');
    senderNameElement.textContent = message.sender || 'Anonymous'; // Use sender name if available, or 'Anonymous'
    
    messageElement.appendChild(senderNameElement);
    messageElement.appendChild(messageTextElement);
    chatMessages.appendChild(messageElement);
});












//  THIS WORKS !!!!!!!!!!!!!!!!!!!!!!
// const socket = io();
// const messageForm = document.getElementById('message-form');
// const messageInput = document.getElementById('message-input');
// const chatMessages = document.getElementById('chat-messages');

// socket.on('message', (message) => {
//   const messageElement = document.createElement('div');
//   messageElement.textContent = message;
//   chatMessages.appendChild(messageElement);
// });

// messageForm.addEventListener('submit', (e) => {
//   e.preventDefault();
//   const message = messageInput.value;
//   socket.emit('sendMessage', message);
//   messageInput.value = '';
// });







// // client.js
// const socket = io();
// const messageForm = document.getElementById('message-form');
// const messageInput = document.getElementById('message-input');
// const chatMessages = document.getElementById('chat-messages');

// socket.on('message', (message) => {
//   // Create a new message element and append it to the chat messages container
//   const messageElement = document.createElement('div');
//   messageElement.textContent = message;
//   chatMessages.appendChild(messageElement);
// });

// messageForm.addEventListener('submit', (e) => {
//   e.preventDefault();
//   const message = messageInput.value;
//   // Send the message to the server
//   socket.emit('sendMessage', message);
//   // Clear the input field
//   messageInput.value = '';
// });


