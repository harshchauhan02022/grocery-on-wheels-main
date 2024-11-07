const db = require('../../config/db');

const PaymentModels = {
 addPayment: (paymentData, callback) => {
  const {
   count_id, payment_code, store_id, purchase_id, payment_date,
   payment_type, payment, payment_note, system_ip, system_name,
   created_time, created_date, created_by, status, account_id, supplier_id, short_code
  } = paymentData;

  const query = `
    INSERT INTO db_purchasepayments (
      count_id, payment_code, store_id, purchase_id, payment_date, payment_type,
      payment, payment_note, system_ip, system_name, created_time, created_date,
      created_by, status, account_id, supplier_id, short_code
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(query, [
   count_id, payment_code, store_id, purchase_id, payment_date, payment_type,
   payment, payment_note, system_ip, system_name, created_time, created_date,
   created_by, status, account_id, supplier_id, short_code
  ], (err, result) => {
   if (err) {
    return callback(err, null);
   }
   callback(null, result);
  });
 },

 getPaymentById: (paymentId, callback) => {
  const query = 'SELECT * FROM db_purchasepayments WHERE id = ?';

  db.query(query, [paymentId], (err, result) => {
   if (err) {
    return callback(err, null);
   }
   if (result.length === 0) {
    return callback(null, null);
   }
   callback(null, result[0]);
  });
 }
};

module.exports = PaymentModels;
