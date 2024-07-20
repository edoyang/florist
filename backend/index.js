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
const allowedOrigins = ['https://meraki-wrap.vercel.app', 'https://florist-management-site.vercel.app'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'] // Added Authorization if you use it
}));

app.use(express.json());

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true, // Ensuring you use the new URL string parser as the old one is deprecated
  useUnifiedTopology: true, // Using the new Server Discover and Monitoring engine
  serverSelectionTimeoutMS: 20000 // 20 seconds timeout
})
  .then(() => console.log('MongoDB connection successful'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/user', userRoutes); // Changed for better route clarity
app.use('/product', productRoutes); // Changed for better route clarity

// IP Retrieval Route
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