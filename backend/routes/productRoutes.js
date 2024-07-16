const express = require('express');
const router = express.Router();
const { addProduct } = require('../controllers/productController/post');
const { getProducts, getProductsManagement, getTotalProduct, getProduct } = require('../controllers/productController/get');
const { deleteProduct } = require('../controllers/productController/delete');
const { updateProduct } = require('../controllers/productController/put');
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

router.post('/add-product', productImageParser.array('product_image', 10), addProduct);
router.get('/products', getProducts);
router.get('/productsManagement', getProductsManagement);
router.get('/totalProduct', getTotalProduct);
router.get('/product/:productId', getProduct);
router.delete('/delete-product/:productId', deleteProduct);
router.put('/update-product/:productId', productImageParser.array('product_images', 3), updateProduct);

module.exports = router;
