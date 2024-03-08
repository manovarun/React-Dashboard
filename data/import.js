const dotenv = require('dotenv').config({ path: '.env' });
const {
  dataUser,
  dataProduct,
  dataProductStat,
  dataTransaction,
} = require('.');
const connectDB = require('../db');
const Product = require('../models/Product');
const ProductStat = require('../models/ProductStat');
const Transaction = require('../models/Transaction');
const User = require('../models/User');

connectDB();

const importUserData = async () => {
  try {
    await User.deleteMany();
    await User.insertMany(dataUser);
    console.log('Data successfully imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const importProductData = async () => {
  try {
    await Product.deleteMany();
    await Product.insertMany(dataProduct);
    console.log('Data successfully imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const importProductStatData = async () => {
  try {
    await ProductStat.deleteMany();
    await ProductStat.insertMany(dataProductStat);
    console.log('Data successfully imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const importDataTransaction = async () => {
  try {
    await Transaction.deleteMany();
    await Transaction.insertMany(dataTransaction);
    console.log('Data successfully imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const deleteData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await ProductStat.deleteMany();
    console.log('Data successfully deleted!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-user') {
  return importUserData();
} else if (process.argv[2] === '-product') {
  return importProductData();
} else if (process.argv[2] === '-productStat') {
  return importProductStatData();
} else if (process.argv[2] === '-dataTransaction') {
  return importDataTransaction();
} else if (process.argv[2] === '-d') {
  return deleteData();
}
