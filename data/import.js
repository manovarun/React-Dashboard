const dotenv = require('dotenv').config({ path: '.env' });
const { dataUser } = require('.');
const connectDB = require('../db');
const User = require('../models/User');

connectDB();

const importData = async () => {
  const users = dataUser.map((user) => ({
    ...user,
  }));
  try {
    await User.deleteMany();
    await User.insertMany(users);
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
    console.log('Data successfully deleted!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-i') {
  return importData();
} else if (process.argv[2] === '-d') {
  return deleteData();
}
