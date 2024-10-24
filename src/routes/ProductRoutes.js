const express = require('express');
const ProductController = require('../controller/ProductController');
const router = express.Router();

router.get('/', ProductController.getAllProducts);
router.post('/create', ProductController.createProduct);

module.exports = router;
