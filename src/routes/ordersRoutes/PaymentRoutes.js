const express = require('express');
const router = express.Router();
const paymentController = require('../../controller/ordersController/PaymentController');

router.post('/payment', paymentController.addPayment);
router.get('/payment/:id', paymentController.getPaymentById);

module.exports = router;
