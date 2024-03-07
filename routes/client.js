const express = require('express');
const router = express.Router();
const { getProducts, getCustomers } = require('../controllers/client');

router.route('/products').get(getProducts);

router.route('/customers').get(getCustomers);

module.exports = router;
