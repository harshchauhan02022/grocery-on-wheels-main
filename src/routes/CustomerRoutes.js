const express = require('express');
const router = express.Router();
const customerController = require('../controller/CustomerController');

router.get('/', customerController.getAllCustomers);
router.post('/register', customerController.addCustomer);
router.delete('/delete/:id', customerController.deleteCustomer);

module.exports = router;
