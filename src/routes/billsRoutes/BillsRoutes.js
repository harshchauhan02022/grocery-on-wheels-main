const express = require('express');
const BillsController = require('../../controller/billsController/BillsController.js');

const router = express.Router();

router.post('/createBills', BillsController.createBill);
router.get('/allBills', BillsController.getBills);
router.get('/BySerNo/:serial_no', BillsController.getBillBySerialNo);
router.get('/ById/:id', BillsController.getBillById);
router.post('/createMultipleBills', BillsController.createMultipleBills);





module.exports = router;
