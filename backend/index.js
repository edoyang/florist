require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const cloudinary = require('cloudinary').v2;

const app = express();

// CORS configuration
const allowedOrigins = ['https://meraki-wrap.vercel.app', 'https://florist-management-site.vercel.app', 'https://florist-management-site.vercel.app/'];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json());
// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

mongoose.connect(process.env.MONGODB_URI),{
  serverSelectionTimeoutMS: 20000,
}
  .then(() => console.log('MongoDB connection successful'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/', userRoutes);
app.use('/', productRoutes);

app.get('/get-ip', async (req, res) => {
  try {
      const response = await axios.get('https://api.ipify.org?format=json');
      res.send(response.data); // This will return the IP address
  } catch (error) {
      res.status(500).send('Error retrieving IP address');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});