const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  product_name: String,
  original_price: Number,
  price: Number,
  category: [String],
  stocks: { type: Number, default: 0 },
  total_sold: { type: Number, default: 0 },
  review: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  discount: Number,
  product_image: [String]
});

productSchema.pre('save', function(next) {
  if (this.stocks === 0) {
    this.isActive = false;
  } else {
    this.isActive = true;
  }
  next();
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;