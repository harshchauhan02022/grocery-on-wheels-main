const express = require('express');
const ProductController = require('../../controller/itemsController/ProductController');
const router = express.Router();

router.get('/', ProductController.getAllProducts);
router.post('/create', ProductController.createProduct);
router.delete('/delete/:id', ProductController.deleteProduct);
router.put('/edit/:id', ProductController.updateProduct);

module.exports = router;
