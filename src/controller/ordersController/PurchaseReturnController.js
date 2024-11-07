const PurchaseReturnModels = require('../../models/ordersModels/PurchaseReturnModels');

const PurchaseReturnController = {
 createPurchaseReturn: (req, res) => {
  const data = req.body;

  if (!data.store_id || !data.purchase_id || !data.return_code) {
   return res.status(400).json({ error: 'Missing required fields' });
  }

  PurchaseReturnModels.createPurchaseReturn(data, (err, result) => {
   if (err) {
    return res.status(500).json({ error: 'Database error', details: err });
   }
   res.status(201).json({ message: 'Purchase return created successfully', data: result });
  });
 },

 getPurchaseReturnById: (req, res) => {
  const returnId = req.params.id;

  if (!returnId) {
   return res.status(400).json({ error: 'Return ID is required' });
  }

  PurchaseReturnModels.getPurchaseReturnById(returnId, (err, result) => {
   if (err) {
    return res.status(500).json({ error: 'Database error', details: err });
   }
   if (!result) {
    return res.status(404).json({ message: 'Purchase return not found' });
   }
   res.status(200).json({ data: result });
  });
 }
};

module.exports = PurchaseReturnController;
