const express = require('express');
const cors = require('cors');
require('dotenv').config();
const axios = require('axios');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('AB VTU Backend is running!');
});

// Test API Route
app.post('/api/test', (req, res) => {
  res.json({
    success: true,
    message: 'Backend is working!',
    data: req.body
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});