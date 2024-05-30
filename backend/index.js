require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const cloudinary = require('cloudinary').v2;

const app = express();
app.use(express.json());
app.use(cors());

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('MongoDB connection successful'))
.catch(err => console.error('MongoDB connection error:', err));

app.use('/', userRoutes);
app.use('/', productRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});




// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');

// const app = express();

// // Middleware
// app.use(express.json());
// app.use(cors()); // Enables CORS for all origins

// // Connect to MongoDB
// mongoose.connect(process.env.MONGODB_URI)
// .then(() => console.log('MongoDB connection successful'))
// .catch(err => console.error('MongoDB connection error:', err));

// // Connect to Cloudinary
// const cloudinary = require('cloudinary').v2;
// const { CloudinaryStorage } = require('multer-storage-cloudinary');
// const multer = require('multer');

// // Cloudinary configuration
// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET
// });

// // Set up the storage, specifying the folder and allowed formats
// const storage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: {
//         folder: 'Meraki-wrap/products',
//         allowed_formats: ['jpg', 'png', 'jpeg']
//     }
// });

// // Configure multer to use Cloudinary storage
// const productImageParser = multer({ storage: storage });

// // User Schema
// const userSchema = new mongoose.Schema({
//   username: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true }
// });

// // User Model
// const User = mongoose.model('User', userSchema);

// // Product Schema
// const productSchema = new mongoose.Schema({
//   product_name: String,
//   original_price: Number,
//   price: Number,
//   category: [String],
//   stocks: { type: Number, default: 0 },
//   total_sold: { type: Number, default: 0 },
//   review: { type: Number, default: 0 },
//   isActive: { type: Boolean, default: true },
//   discount: Number,
//   product_image: [String]
// });

// const Product = mongoose.model('Product', productSchema);

// // Routes
// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

// // Register User
// app.post('/register', async (req, res) => {
//   try {
//     const { username, email, password } = req.body;
//     const newUser = new User({ username, email, password });
//     await newUser.save();
//     res.status(201).json({ message: "User registered successfully!" });
//   } catch (error) {
//     if (error.code === 11000) {
//       res.status(409).json({ message: "Email already exists!" });
//     } else {
//       res.status(500).json({ message: "Error registering user", error: error.message });
//     }
//   }
// });

// // Login User
// app.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (user && user.password === password) {
//       res.status(200).json({ message: "Login successful!" });
//     } else {
//       res.status(401).json({ message: "Invalid credentials" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// });

// // Route to upload a product and its image
// app.post('/add-product', productImageParser.array('product_image', 3), async (req, res) => {
//   try {
//     const { product_name, original_price, price, category, stocks, discount } = req.body;
//     const product_images = req.files.map(file => file.path);
//     const newProduct = new Product({
//       product_name,
//       original_price,
//       price,
//       category: category.split(','),
//       stocks: parseInt(stocks, 10),
//       discount,
//       product_image: product_images,
//       isActive: true
//     });
//     await newProduct.save();
//     res.status(201).json({
//       message: 'Product added successfully!',
//       data: newProduct
//     });
//   } catch (error) {
//     console.error('Failed to add product:', error);
//     res.status(500).json({
//       message: 'Failed to add product',
//       error: error.message
//     });
//   }
// });


// // Server Start
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });