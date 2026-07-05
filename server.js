const express = require('express');
const cors = require('cors');
require('dotenv').config();
const axios = require('axios');

const app = express();

app.use(cors());
app.use(express.json());

// Home Route
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

// VTpass Balance Check
app.get('/api/vtpass/balance', async (req, res) => {
  try {
    const response = await axios.get(
      'https://api-service.vtpass.com/api/balance',
      {
        headers: {
          'api-key': process.env.VTPASS_API_KEY,
          'secret-key': process.env.VTPASS_SECRET_KEY
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.response?.data || error.message
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});