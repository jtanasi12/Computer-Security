const express = require('express');
const path = require('path');
const { modInv } = require('bigint-crypto-utils');


const app = express();
const PORT = 5000;

// Allows us to serve up static files
app.use(express.static(path.join(__dirname, 'Public')));

app.use(express.json()); // Use express.json() instead of body-parser

function calculateD(e, phi) {
  // Convert e and phi to BigInt explicitly
  e = BigInt(e);
  phi = BigInt(phi);

  // Use the bigint-crypto-utils library to calculate the modular inverse
  return modInv(e, phi);
}

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

app.post('/calculate-d', (req, res) => {
 // Extract e and phi from the request body
 const { e, phi } = req.body;

 console.log("e-->  " + e + "  phi  " + phi);
 try {
   // Call the calculateD function with the extracted e and phi
   const d = calculateD(e, phi);

   console.log("d: ---> " + d);

   console.log("Successful HTTP request");

   // Send the result back to the client
    res.json({ d: d.toString() });
 } catch (error) {
   console.error("Error calculating d:", error.message);
   res.status(500).json({ error: "Error calculating d" });
 }
});


app.get('/team-members', (req, res) => {
  res.sendFile(__dirname + '/Public/html/team-members.html');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
