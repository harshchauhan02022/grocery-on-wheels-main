const db = require('../config/db');

const SupplierModel = {
 getAllSuppliers: (callback) => {
  const sql = 'SELECT * FROM db_suppliers';
  db.query(sql, callback);
 },

 addSupplier: (supplierData, callback) => {
  const sql = `
      INSERT INTO db_suppliers (
        store_id, count_id, supplier_code, supplier_name, mobile, phone, email,
        gstin, tax_number, vatin, opening_balance, purchase_due, purchase_return_due,
        country_id, state_id, city, postcode, address, system_ip, system_name,
        created_date, created_time, created_by, company_id, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

  const values = [
   supplierData.store_id,
   supplierData.count_id,
   supplierData.supplier_code,
   supplierData.supplier_name,
   supplierData.mobile,
   supplierData.phone,
   supplierData.email,
   supplierData.gstin,
   supplierData.tax_number,
   supplierData.vatin,
   supplierData.opening_balance,
   supplierData.purchase_due,
   supplierData.purchase_return_due,
   supplierData.country_id,
   supplierData.state_id,
   supplierData.city,
   supplierData.postcode,
   supplierData.address,
   supplierData.system_ip,
   supplierData.system_name,
   supplierData.created_date,
   supplierData.created_time,
   supplierData.created_by,
   supplierData.company_id,
   supplierData.status
  ];

  db.query(sql, values, callback);
 },

 findSupplier: (supplierCode, mobile, callback) => {
  const sql = `
      SELECT * FROM db_suppliers 
      WHERE supplier_code = ? OR mobile = ?
    `;
  db.query(sql, [supplierCode, mobile], callback);
 },

 deleteSupplier: (supplierId, callback) => {
  const sql = 'DELETE FROM db_suppliers WHERE id = ?';
  db.query(sql, [supplierId], callback);
}
};

module.exports = SupplierModel;
