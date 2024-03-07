const express = require('express');
const router = express.Router();
const { getProducts } = require('../controllers/client');

router.route('/products').get(getProducts);

module.exports = router;
