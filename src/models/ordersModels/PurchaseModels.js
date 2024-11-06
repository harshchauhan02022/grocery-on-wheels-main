const db = require('../../config/db');

const PurchaseModels = {
 createPurchase: (data, callback) => {
  const sql = `
      INSERT INTO db_purchase (
        store_id, warehouse_id, count_id, purchase_code, reference_no, purchase_date, purchase_status, supplier_id,
        other_charges_input, other_charges_tax_id, other_charges_amt, discount_to_all_input, discount_to_all_type,
        tot_discount_to_all_amt, subtotal, round_off, grand_total, purchase_note, payment_status, paid_amount,
        created_date, created_time, created_by, system_ip, system_name, company_id, status, return_bit
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [
   data.store_id, data.warehouse_id, data.count_id, data.purchase_code, data.reference_no, data.purchase_date,
   data.purchase_status, data.supplier_id, data.other_charges_input, data.other_charges_tax_id,
   data.other_charges_amt, data.discount_to_all_input, data.discount_to_all_type, data.tot_discount_to_all_amt,
   data.subtotal, data.round_off, data.grand_total, data.purchase_note, data.payment_status, data.paid_amount,
   data.created_date, data.created_time, data.created_by, data.system_ip, data.system_name, data.company_id,
   data.status, data.return_bit,
  ];

  db.query(sql, values, (err, result) => {
   if (err) return callback(err, null);
   callback(null, result);
  });
 },

 getOrderDetails: (orderId, callback) => {
  const sql = 'SELECT * FROM db_purchase WHERE id = ?';
  db.query(sql, [orderId], (err, results) => {
   if (err) return callback(err, null);
   callback(null, results[0]);
  });
 },

 createPurchaseReturn: (data, callback) => {
  const sql = `
    INSERT INTO db_purchasereturn (
      store_id, count_id, warehouse_id, purchase_id, return_code, reference_no, return_date, return_status,
      supplier_id, other_charges_input, other_charges_tax_id, other_charges_amt, discount_to_all_input, 
      discount_to_all_type, tot_discount_to_all_amt, subtotal, round_off, grand_total, return_note, payment_status, 
      paid_amount, created_date, created_time, created_by, system_ip, system_name, company_id, status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [
   data.store_id, data.count_id, data.warehouse_id, data.purchase_id, data.return_code, data.reference_no,
   data.return_date, data.return_status, data.supplier_id, data.other_charges_input, data.other_charges_tax_id,
   data.other_charges_amt, data.discount_to_all_input, data.discount_to_all_type, data.tot_discount_to_all_amt,
   data.subtotal, data.round_off, data.grand_total, data.return_note, data.payment_status, data.paid_amount,
   data.created_date, data.created_time, data.created_by, data.system_ip, data.system_name, data.company_id,
   data.status 
  ];

  db.query(sql, values, (err, result) => {
   if (err) return callback(err, null);
   callback(null, result);
  });
 },


 getPurchaseReturnById: (returnId, callback) => {
  const sql = 'SELECT * FROM db_purchasereturn WHERE id = ?';
  db.query(sql, [returnId], (err, results) => {
   if (err) return callback(err, null);
   callback(null, results[0]);
  });
 }
};

module.exports = PurchaseModels;
