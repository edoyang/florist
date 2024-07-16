const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  product_name: String,
  original_price: Number,
  isDiscounted: Boolean,
  discount: Number,
  price: Number,
  stocks: Number,
  category: [String],
  isActive: Boolean,
  total_sold: Number,
  review: Number,
  product_image: [{
    url: String,
    publicId: String
  }]
});


productSchema.pre('save', function(next) {
  if (this.stocks === 0) {
    this.isActive = false;
  } else {
    this.isActive = true;
  }
  next();
});

const Product = mongoose.model('Product', productSchema, 'products');
module.exports = Product;