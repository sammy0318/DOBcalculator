const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json()); // Middleware to parse JSON body
app.use(cors()); // Allow cross-origin requests

// POST endpoint to calculate age
app.post('/DOB-calculator', (req, res) => {
  // Extract the Date of Birth from the request body
  const { dob } = req.body;

  // Check if the dob is provided
  if (!dob) {
    return res.status(400).json({ error: 'Date of Birth is required' });
  }

  // Parse the Date of Birth from the string to a Date object
  const dobDate = new Date(dob);
  const now = new Date();

  // Calculate years, months, weeks, days, hours, minutes, and seconds
  const years = now.getFullYear() - dobDate.getFullYear();
  const months = years * 12 + (now.getMonth() - dobDate.getMonth());
  const days = Math.floor((now - dobDate) / (1000 * 60 * 60 * 24));
  const hours = days * 24 + now.getHours();
  const minutes = hours * 60 + now.getMinutes();
  const seconds = minutes * 60 + now.getSeconds();
  const weeks = Math.floor(days / 7);

  // Set the Content-Type header for the response
  res.setHeader('Content-Type', 'application/json');

  // Send the calculated age in JSON format
  res.json({
    years,
    months,
    weeks,
    days,
    hours,
    minutes,
    seconds
  });
});

// Define the port number
const PORT = 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
