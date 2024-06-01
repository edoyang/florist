const express = require('express');
const router = express.Router();
const { addProduct, getProducts, getProduct, deleteProduct, getProductsManagement, updateProduct } = require('../controllers/productController');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary and multer for image uploads
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'meraki-wrap/products',
        allowed_formats: ['jpg', 'png', 'jpeg']
    }
});
const productImageParser = multer({ storage: storage });

router.post('/add-product', productImageParser.array('product_image', 3), addProduct);
router.get('/products', getProducts);
router.get('/productsManagement', getProductsManagement);
router.get('/product/:id', getProduct);
router.delete('/product/:id', deleteProduct);
router.put('/products/:id', productImageParser.array('product_image', 3), updateProduct);



module.exports = router;
