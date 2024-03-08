const express = require('express');
const router = express.Router();
const {
  getProducts,
  getCustomers,
  getTransactions,
} = require('../controllers/client');

router.route('/products').get(getProducts);
router.route('/customers').get(getCustomers);
router.route('/transactions').get(getTransactions);

module.exports = router;
