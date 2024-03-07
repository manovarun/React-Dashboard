const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const AppError = require('../utils/AppError');
const ProductStat = require('../models/ProductStat');
const Product = require('../models/Product');

exports.getProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find();

  if (!products) return next(new AppError('Products not found', 404));

  const productsWithStats = await Promise.all(
    products.map(async (product) => {
      const stat = await ProductStat.find({
        productId: product._id,
      });
      return {
        ...product._doc,
        stat,
      };
    })
  );

  res.status(200).json({
    status: 'success',
    numResults: products.length,
    products,
    productsWithStats,
  });
});
