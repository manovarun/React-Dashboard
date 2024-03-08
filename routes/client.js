const express = require('express');
const router = express.Router();
const {
  getProducts,
  getCustomers,
  getTransactions,
  getGeography,
} = require('../controllers/client');

router.route('/products').get(getProducts);
router.route('/customers').get(getCustomers);
router.route('/transactions').get(getTransactions);
router.route('/geography').get(getGeography);

module.exports = router;
