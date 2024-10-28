const express = require('express');
const SupplierController = require('../controller/SupplierController');

const router = express.Router();

router.post('/register', SupplierController.addSupplier);
router.get('/', SupplierController.getSuppliers);
router.delete('/delete/:id', SupplierController.deleteSupplier);

module.exports = router;
