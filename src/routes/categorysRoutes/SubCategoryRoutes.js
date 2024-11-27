const express = require('express');
const SubCategoryController = require('../../controller/categorysControllers/SubCategoryController');
const router = express.Router();

router.get('/', SubCategoryController.getAllCategories);
router.post('/create', SubCategoryController.createCategory);
router.put('/edit/:id', SubCategoryController.updateCategory);
router.delete('/delete/:id', SubCategoryController.deleteCategory);

module.exports = router;
