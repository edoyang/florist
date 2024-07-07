const Product = require("../../models/product");

exports.addProduct = async (req, res) => {
  try {
    const { product_name, original_price, price, category, stocks, discount } = req.body;
    const files = req.files;

    if (!discount && original_price !== price) {
      return res.status(400).json({
        message: 'Original price and price must be equal if there is no discount'
      });
    }

    const product_images = files.map(file => file.path);

    const newProduct = new Product({
      product_name,
      original_price,
      price,
      category: category,
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

