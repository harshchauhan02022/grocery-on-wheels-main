const express = require('express');
const ProductController = require('../controller/ProductController');
const router = express.Router();

router.get('/', ProductController.getAllProducts);

module.exports = router;
