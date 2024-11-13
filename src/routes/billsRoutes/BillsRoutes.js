const express = require('express');
const BillsController = require('../../controller/billsController/BillsController.js');

const router = express.Router();

router.get('/', BillsController.getAllBills);
router.get('/:id', BillsController.getBillById);
router.post('/create', BillsController.createBill);
router.put('/update/:id', BillsController.updateBill);
router.delete('/delete/:id', BillsController.deleteBill);

module.exports = router;
