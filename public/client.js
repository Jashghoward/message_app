const socket = io();
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');
const chatMessages = document.getElementById('chat-messages');

socket.on('message', (message) => {
  const messageElement = document.createElement('div');
  messageElement.textContent = message;
  chatMessages.appendChild(messageElement);
});

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = messageInput.value;
  socket.emit('sendMessage', message);
  messageInput.value = '';
});







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


