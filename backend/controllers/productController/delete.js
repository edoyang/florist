const Product = require("../../models/product");
const cloudinary = require('cloudinary').v2;

exports.deleteProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Turn the product_image into an array if it's not
    if (!Array.isArray(product.product_image)) {
      product.product_image = product.product_image ? [product.product_image] : [];
    }

    // Delete images from Cloudinary using the correct publicId field
    const deletePromises = product.product_image.map(image =>
      cloudinary.uploader.destroy(image.publicId)
        .then(result => {
          return result;
        })
    );

    const results = await Promise.all(deletePromises);

    // Delete the product from the database
    await Product.findByIdAndDelete(productId);



    res.status(200).json({
      message: 'Product deleted'
    });
  } catch (error) {
    console.error('Failed to delete the product images', error);
    res.status(500).json({
      message: 'Failed to delete the product images',
      error: error.message
    });
  }
}
