const Product = require("../../models/product");
const cloudinary = require('cloudinary').v2;

exports.deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    // Find the product by ID
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        message: 'Product not found'
      });
    }

    // Delete images from Cloudinary
    const deleteImagePromises = product.product_image.map(imageUrl => {
      const publicId = imageUrl.split('/').pop().split('.')[0]; // Extract public_id from the URL
      return cloudinary.uploader.destroy(`meraki-wrap/products/${publicId}`);
    });

    await Promise.all(deleteImagePromises);

    // Delete product from MongoDB
    await Product.findByIdAndDelete(productId);

    res.status(200).json({
      message: 'Product and associated images deleted successfully'
    });
  } catch (error) {
    console.error('Failed to delete product:', error);
    res.status(500).json({
      message: 'Failed to delete product',
      error: error.message
    });
  }
};

