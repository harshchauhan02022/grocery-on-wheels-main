const PaymentModels = require('../../models/ordersModels/PaymentModels');

const PaymentController = {
 addPayment: (req, res) => {
  const paymentData = req.body;

  PaymentModels.addPayment(paymentData, (err, result) => {
   if (err) {
    return res.status(500).json({ error: 'Database error', details: err });
   }
   res.status(201).json({
    message: 'Payment record added successfully',
    result: result
   });
  });
 },

 getPaymentById: (req, res) => {
  const paymentId = req.params.id;

  PaymentModels.getPaymentById(paymentId, (err, result) => {
   if (err) {
    return res.status(500).json({ error: 'Database error', details: err });
   }
   if (!result) {
    return res.status(404).json({ message: 'Payment not found' });
   }
   res.status(200).json(result);
  });
 }
};

module.exports = PaymentController;
