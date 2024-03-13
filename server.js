const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Allows us to serve up static files
app.use(express.static(path.join(__dirname, 'Public')));

app.use(express.json()); // Use express.json() instead of body-parser

// The default URL ='s localhost:3000 
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/Public/html/index.html');
});

app.get('/rsa', (req, res) => {
  res.sendFile(__dirname + '/Public/html/rsa-tutorial.html');
});

app.get('/doubletransposition', (req, res) => {
  res.sendFile(__dirname + '/Public/html/doubletranspo-tutorial.html');
});

app.get('/team-members', (req, res) => {
  res.sendFile(__dirname + '/Public/html/team-members.html');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
