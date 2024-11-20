const express = require('express');
const BillsController = require('../../controller/billsController/BillsController.js');

const router = express.Router();

router.post('/create', BillsController.createBill);

module.exports = router;
