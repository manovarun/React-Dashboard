const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    price: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
    },
    category: {
      type: String,
    },
    rating: {
      type: Number,
      default: 0,
    },
    supply: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
