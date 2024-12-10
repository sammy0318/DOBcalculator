const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json()); // Middleware to parse JSON body
app.use(cors()); // Allow cross-origin requests

// POST endpoint to calculate age
app.post('/DOB-calculator', (req, res) => {
  const { dob } = req.body;

  if (!dob) {
    return res.status(400).json({ error: 'Date of Birth is required' });
  }

  const dobDate = new Date(dob);
  const now = new Date();

  const years = now.getFullYear() - dobDate.getFullYear();
  const months = years * 12 + (now.getMonth() - dobDate.getMonth());
  const days = Math.floor((now - dobDate) / (1000 * 60 * 60 * 24));
  const hours = days * 24 + now.getHours();
  const minutes = hours * 60 + now.getMinutes();
  const seconds = minutes * 60 + now.getSeconds();
  const weeks = Math.floor(days / 7);

  res.json({
    years,
    months,
    weeks,
    days,
    hours,
    minutes,
    seconds,
  });
});

// Define the port number dynamically for hosting services
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});