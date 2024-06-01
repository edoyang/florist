const Product = require('../models/Product');
const cloudinary = require('cloudinary').v2;

exports.addProduct = async (req, res) => {
  try {
    const { product_name, original_price, price, category, stocks, discount } = req.body;
    const product_images = req.files.map(file => file.path);
    const newProduct = new Product({
      product_name,
      original_price,
      price,
      category: category.split(','),
      stocks: parseInt(stocks, 10),
      discount,
      product_image: product_images,
      isActive: true
    });
    await newProduct.save();
    res.status(201).json({
      message: 'Product added successfully!',
      data: newProduct
    });
  } catch (error) {
    console.error('Failed to add product:', error);
    res.status(500).json({
      message: 'Failed to add product',
      error: error.message
    });
  }
};

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find({ isActive: true });  // Fetch all active products
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({
            message: "Failed to retrieve products",
            error: error.message
        });
    }
};


exports.updateProduct = async (req, res) => {
    try {
        const { product_name, original_price, price, category, stocks, discount, isActive } = req.body;
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Updating the product details
        product.product_name = product_name;
        product.original_price = original_price;
        product.price = price;
        product.category = JSON.parse(category);  // Assuming category comes as a JSON string array
        product.stocks = parseInt(stocks, 10);
        product.discount = discount;
        product.isActive = isActive;

        // Handle images update if there are new images uploaded
        if (req.files && req.files.length > 0) {
            const product_images = req.files.map(file => file.path);

            // Optional: Delete old images from Cloudinary
            product.product_image.forEach(async oldImage => {
                try {
                    await cloudinary.uploader.destroy(oldImage);
                } catch (error) {
                    console.error('Failed to delete old image from Cloudinary:', error);
                }
            });

            // Set new images
            product.product_image = product_images;
        }

        await product.save();
        res.status(200).json({
            message: 'Product updated successfully!',
            data: product
        });
    } catch (error) {
        console.error('Failed to update product:', error);
        res.status(500).json({
            message: 'Failed to update product',
            error: error.message
        });
    }
};

exports.getProductsManagement = async (req, res) => {
  try {
      const products = await Product.find(); // Fetches all products
      res.status(200).json(products);
  } catch (error) {
      res.status(500).json({
          message: "Failed to retrieve all products",
          error: error.message
      });
  }
};


exports.getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);  // Fetch product by ID
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({
            message: "Failed to retrieve product",
            error: error.message
        });
    }
};

exports.deleteProduct = async (req, res) => {
  try {
      const product = await Product.findById(req.params.id);
      if (!product) {
          return res.status(404).json({ message: "Product not found" });
      }

      // Proceed with Cloudinary deletion only if there is an image associated
      if (product.product_image && product.product_image.length > 0) {
          try {
              await cloudinary.uploader.destroy(product.product_image);
          } catch (cloudinaryError) {
              // Log the error but do not stop the deletion process
              console.error('Cloudinary deletion error:', cloudinaryError);
          }
      }

      // Proceed to delete the product from MongoDB regardless of Cloudinary result
      await Product.deleteOne({ _id: req.params.id });
      res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};
