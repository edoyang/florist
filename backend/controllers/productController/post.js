const Product = require("../../models/product");

exports.addProduct = async (req, res) => {
  try {
    let { product_name, original_price, price, category, stocks, discount, isDiscounted } = req.body;

    console.log('req.body', req.body);

    // Convert string representations of booleans and numbers
    isDiscounted = isDiscounted === 'true'; // Converts "true" to true and anything else to false
    discount = parseFloat(discount) || 0;
    original_price = parseFloat(original_price);
    price = parseFloat(price);
    stocks = parseInt(stocks, 10);

    const files = req.files;

    if (!isDiscounted && original_price !== price) {
      return res.status(400).json({
        message: 'Original price and price must be equal if there is no discount'
      });
    }

    // Map each file to an object containing both the URL and publicId
    const product_images = files.map(file => ({
      url: file.path,
      publicId: file.filename
    }));

    const newProduct = new Product({
      product_name,
      original_price,
      isDiscounted,
      discount,
      price,
      category,
      stocks,
      product_image: product_images,
      isActive: stocks > 0
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
