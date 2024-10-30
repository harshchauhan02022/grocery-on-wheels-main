const express = require('express');
const BrandController = require('../../controller/itemsController/BrandController');
const router = express.Router();

router.get('/', BrandController.getAllBrands);
router.post('/create', BrandController.createBrand);
router.put('/update/:id', BrandController.updateBrand);
router.delete('/delete/:id', BrandController.deleteBrand);

module.exports = router;
