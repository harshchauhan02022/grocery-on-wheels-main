const express = require('express');
const BillsController = require('../../controller/billsController/BillsController.js');

const router = express.Router();

router.post('/create', BillsController.createBill);
router.get('/all', BillsController.getBills);
router.get('/BySerNo/:serial_no', BillsController.getBillBySerialNo);
router.get('/ById/:id', BillsController.getBillById);




module.exports = router;
