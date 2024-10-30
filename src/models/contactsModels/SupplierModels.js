const db = require('../../config/db');

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

 updateSupplier: (supplierId, updateData, callback) => {
  const sql = `
    UPDATE db_suppliers SET 
      store_id = ?, count_id = ?, supplier_code = ?, supplier_name = ?, 
      mobile = ?, phone = ?, email = ?, gstin = ?, tax_number = ?, vatin = ?, 
      opening_balance = ?, purchase_due = ?, purchase_return_due = ?, 
      country_id = ?, state_id = ?, city = ?, postcode = ?, address = ?, 
      system_ip = ?, system_name = ?, created_by = ?, company_id = ?, status = ?
    WHERE id = ?
  `;

  const values = [
   updateData.store_id,
   updateData.count_id,
   updateData.supplier_code,
   updateData.supplier_name,
   updateData.mobile,
   updateData.phone,
   updateData.email,
   updateData.gstin,
   updateData.tax_number,
   updateData.vatin,
   updateData.opening_balance,
   updateData.purchase_due,
   updateData.purchase_return_due,
   updateData.country_id,
   updateData.state_id,
   updateData.city,
   updateData.postcode,
   updateData.address,
   updateData.system_ip,
   updateData.system_name,
   updateData.created_by,
   updateData.company_id,
   updateData.status,
   supplierId
  ];

  db.query(sql, values, callback);
 },

 deleteSupplier: (supplierId, callback) => {
  const sql = 'DELETE FROM db_suppliers WHERE id = ?';
  db.query(sql, [supplierId], callback);
 }
};

module.exports = SupplierModel;
