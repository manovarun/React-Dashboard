const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const AppError = require('../utils/AppError');
const OverallStat = require('../models/OverallStat');

exports.getSales = asyncHandler(async (req, res, next) => {
  const overallStats = await OverallStat.find();

  if (!overallStats) return next(new AppError('Stats not found', 404));

  return res.status(200).json(overallStats[0]);
});
