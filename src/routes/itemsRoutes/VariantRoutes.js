const express = require('express');
const VariantController = require('../../controller/itemsController/VariantController');
const router = express.Router();

router.get('/', VariantController.getAllVariants);
router.post('/create', VariantController.createVariant);
router.put('/edit/:id', VariantController.editVariant);
router.delete('/delete/:id', VariantController.deleteVariant);

module.exports = router;
