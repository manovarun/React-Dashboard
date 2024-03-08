const asyncHandler = require('express-async-handler');
const getCountryIso3 = require('country-iso-2-to-3');
const User = require('../models/User');
const AppError = require('../utils/AppError');
const ProductStat = require('../models/ProductStat');
const Product = require('../models/Product');
const Transaction = require('../models/Transaction');

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

exports.getCustomers = asyncHandler(async (req, res, next) => {
  const customers = await User.find({ role: 'user' }).select('-password');

  if (!customers) return next(new AppError('Customers not found', 404));

  res.status(200).json({
    status: 'success',
    numResults: customers.length,
    customers,
  });
});

exports.getTransactions = asyncHandler(async (req, res, next) => {
  // sort should look like this: { "field": "userId", "sort": "desc"}

  const { page = 1, pageSize = 20, sort = null, search = '' } = req.query;

  // formatted sort should look like { userId: -1 }
  const generateSort = () => {
    const sortParsed = JSON.parse(sort);
    const sortFormatted = {
      [sortParsed.field]: (sortParsed.sort = 'asc' ? 1 : -1),
    };

    return sortFormatted;
  };
  const sortFormatted = Boolean(sort) ? generateSort() : {};

  const transactions = await Transaction.find({
    $or: [
      { cost: { $regex: new RegExp(search, 'i') } },
      { userId: { $regex: new RegExp(search, 'i') } },
    ],
  })
    .sort(sortFormatted)
    .skip(page * pageSize)
    .limit(pageSize);

  const total = await Transaction.countDocuments({
    name: { $regex: search, $options: 'i' },
  });

  res.status(200).json({ status: 'success', transactions, total });
});

exports.getGeography = asyncHandler(async (req, res, next) => {
  const users = await User.find();

  const mappedLocations = users.reduce((acc, { country }) => {
    const countryISO3 = getCountryIso3(country);
    if (!acc[countryISO3]) {
      acc[countryISO3] = 0;
    }
    acc[countryISO3]++;
    return acc;
  }, {});

  const formattedLocations = Object.entries(mappedLocations).map(
    ([country, count]) => {
      return { id: country, value: count };
    }
  );

  if (!formattedLocations)
    return next(new AppError('Locations not found', 404));

  res.status(200).json({ status: 'success', formattedLocations });
});
