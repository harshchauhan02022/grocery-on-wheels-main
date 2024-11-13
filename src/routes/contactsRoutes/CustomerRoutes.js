const express = require('express');
const router = express.Router();
const customerController = require('../../controller/contactsController/CustomerController');

router.get('/', customerController.getAllCustomers);
router.get('/:id', customerController.getCustomerById);
router.post('/register', customerController.addCustomer);
router.post('/login', customerController.loginCustomer);
router.put('/update/:id', customerController.updateCustomer);
router.delete('/delete/:id', customerController.deleteCustomer);
router.put('/reset-password', customerController.resetPassword);
router.get('/order-history/:id', customerController.getCustomerOrderHistory);

module.exports = router;
