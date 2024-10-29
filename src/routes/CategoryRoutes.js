const express = require('express');
const CategoryController = require('../controller/CategoryController')
const router = express.Router();

router.get('/', CategoryController.getAllCategories);
router.post('/create', CategoryController.createCategory);
router.put('/edit/:id', CategoryController.updateCategory);
router.delete('/delete/:id', CategoryController.deleteCategory);

module.exports = router;
