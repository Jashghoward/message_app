// In your server.js or app.js file
app.get('/', (req, res) => {
  // Serve your HTML file here
  res.sendFile(__dirname + '/index.html');
});
