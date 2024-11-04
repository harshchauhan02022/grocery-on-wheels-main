const express = require('express');
const router = express.Router();
const customerController = require('../../controller/contactsController/CustomerController');

router.get('/', customerController.getAllCustomers);
router.post('/register', customerController.addCustomer);
router.post('/login', customerController.loginCustomer);
router.delete('/delete/:id', customerController.deleteCustomer);
router.put('/update/:id', customerController.updateCustomer);

module.exports = router;
