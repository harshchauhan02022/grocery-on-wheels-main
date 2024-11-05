const express = require('express');
const router = express.Router();
const warehouseController = require('../../controller/warehouseController/WarehouseController');

router.get('/', warehouseController.getAllWarehouses);
router.get('/:id', warehouseController.getWarehouseById);
router.post('/register', warehouseController.addWarehouse);
router.put('update/:id', warehouseController.updateWarehouse);
router.delete('delete/:id', warehouseController.deleteWarehouse);

module.exports = router;
