const express = require('express');
const path = require('path');
const axios = require('axios');

const app = express();
const PORT = 5000;

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../frontend/build')));

// API route example
app.get('/api/data', async (req, res) => {
  try {
    const response = await axios.get('https://api.example.com/data');
    res.json(response.data);
  } catch (error) {
    res.status(500).send('Error fetching data');
  }
});

// Catch-all handler: send React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
