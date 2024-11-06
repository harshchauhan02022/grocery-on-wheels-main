const PurchaseModels = require('../../models/ordersModels/PurchaseModels');

const PurchaseController = {
 createPurchase: (req, res) => {
  const {
   store_id,
   warehouse_id,
   count_id,
   purchase_code,
   reference_no,
   purchase_date,
   purchase_status,
   supplier_id,
   other_charges_input,
   other_charges_tax_id,
   other_charges_amt,
   discount_to_all_input,
   discount_to_all_type,
   tot_discount_to_all_amt,
   subtotal,
   round_off,
   grand_total,
   purchase_note,
   payment_status,
   paid_amount,
   created_date,
   created_time,
   created_by,
   system_ip,
   system_name,
   company_id,
   status,
   return_bit,
  } = req.body;

  PurchaseModels.createPurchase({
   store_id,
   warehouse_id,
   count_id,
   purchase_code,
   reference_no,
   purchase_date,
   purchase_status,
   supplier_id,
   other_charges_input,
   other_charges_tax_id,
   other_charges_amt,
   discount_to_all_input,
   discount_to_all_type,
   tot_discount_to_all_amt,
   subtotal,
   round_off,
   grand_total,
   purchase_note,
   payment_status,
   paid_amount,
   created_date,
   created_time,
   created_by,
   system_ip,
   system_name,
   company_id,
   status,
   return_bit,
  }, (err, result) => {
   if (err) return res.status(500).json({ success: false, message: err.message });
   res.status(201).json({ success: true, data: result });
  });
 },

 getOrderDetails: (req, res) => {
  const { id } = req.params;
  PurchaseModels.getOrderDetails(id, (err, order) => {
   if (err) return res.status(500).json({ success: false, message: err.message });
   if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
   res.status(200).json({ success: true, data: order });
  });
 },

 createPurchaseReturn: (req, res) => {
  const data = req.body; 

  PurchaseModels.createPurchaseReturn(data, (err, result) => {
   if (err) {
    return res.status(500).json({ error: 'Database error', details: err });
   }
   res.status(201).json({ message: 'Purchase return created successfully', data: result });
  });
 },

 getPurchaseReturnById: (req, res) => {
  const returnId = req.params.id;

  PurchaseModels.getPurchaseReturnById(returnId, (err, result) => {
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

module.exports = PurchaseController;
