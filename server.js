const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Home Route
app.get('/', (req, res) => {
  res.send('AB VTU Backend is running!');
});

// Test Route
app.get('/api/test', (req, res) => {
  res.json({
    success: true,
    message: 'Backend is working!',
    data: req.body
  });
});

// Wallet Balance
app.get('/api/clubkonnect/balance', async (req, res) => {
  try {
    const response = await axios.get(
      `https://www.nellobytesystems.com/APIWalletBala nceV1.asp?UserID=${process.env.CLUBKONNECT_USER_ID}&APIKey=${process.env.CLUBKONNECT_API_KEY}`
    );

    res.json(response.data);

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.response?.data || error.message
    });
  }
});

// Buy Data
app.get('/api/buy-data', async (req, res) => {
  try {

    const {
      MobileNetwork,
      DataPlan,
      MobileNumber,
      RequestID,
      CallBackURL
    } = req.query;


    console.log("REQUEST QUERY:", req.query);
    
    const url =
      `https://www.nellobytesystems.com/APIDatabundleV1.asp?UserID=${process.env.CLUBKONNECT_USER_ID}` +
      `&APIKey=${process.env.CLUBKONNECT_API_KEY}` +
      `&MobileNetwork=${MobileNetwork}` +
      `&DataPlan=${DataPlan}` +
      `&MobileNumber=${MobileNumber}` +
      `&RequestID=${RequestID}` +
      `&CallBackURL=${CallBackURL}`;

    const response = await axios.get(url);

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