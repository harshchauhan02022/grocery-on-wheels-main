const db = require('../../config/db');

const CustomerModel = {
  getAllCustomers: (callback) => {
    const sql = 'SELECT * FROM db_customers';
    db.query(sql, callback);
  },
  addCustomer: (customerData, callback) => {
    const sql = `
      INSERT INTO db_customers (
        store_id, count_id, customer_code, customer_name, mobile, phone, email,
        password, gstin, tax_number, vatin, opening_balance, sales_due, 
        sales_return_due, country_id, state_id, city, postcode, address, 
        ship_country_id, ship_state_id, ship_city, ship_postcode, ship_address, 
        system_ip, system_name, created_by, company_id, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      customerData.store_id,
      customerData.count_id,
      customerData.customer_code,
      customerData.customer_name,
      customerData.mobile,
      customerData.phone,
      customerData.email,
      customerData.password,
      customerData.gstin,
      customerData.tax_number,
      customerData.vatin,
      customerData.opening_balance,
      customerData.sales_due,
      customerData.sales_return_due,
      customerData.country_id,
      customerData.state_id,
      customerData.city,
      customerData.postcode,
      customerData.address,
      customerData.ship_country_id,
      customerData.ship_state_id,
      customerData.ship_city,
      customerData.ship_postcode,
      customerData.ship_address,
      customerData.system_ip,
      customerData.system_name,
      customerData.created_by,
      customerData.company_id,
      customerData.status,
    ];
    db.query(sql, values, callback);
  },
  findCustomerByCode: (usernameOrEmail, callback) => {
    const sql = `
      SELECT * FROM db_customers 
      WHERE customer_code = ? 
         OR customer_name = ? 
         OR email = ?
    `;
    db.query(sql, [usernameOrEmail, usernameOrEmail, usernameOrEmail], (err, results) => {
      if (err) return callback(err, null);
      callback(null, results[0]);
    });
  },
  updateCustomer: (customerData, callback) => {
    const sql = `
    UPDATE db_customers SET 
      store_id = ?, 
      customer_name = ?, 
      mobile = ?, 
      phone = ?, 
      email = ?, 
      gstin = ?, 
      tax_number = ?, 
      vatin = ?, 
      opening_balance = ?, 
      sales_due = ?, 
      sales_return_due = ?, 
      country_id = ?, 
      state_id = ?, 
      city = ?, 
      postcode = ?, 
      address = ?, 
      ship_country_id = ?, 
      ship_state_id = ?, 
      ship_city = ?, 
      ship_postcode = ?, 
      ship_address = ?, 
      system_ip = ?, 
      system_name = ?, 
      status = ? 
    WHERE id = ?;
  `;
    const values = [
      customerData.store_id,
      customerData.customer_name,
      customerData.mobile,
      customerData.phone,
      customerData.email,
      customerData.gstin,
      customerData.tax_number,
      customerData.vatin,
      customerData.opening_balance,
      customerData.sales_due,
      customerData.sales_return_due,
      customerData.country_id,
      customerData.state_id,
      customerData.city,
      customerData.postcode,
      customerData.address,
      customerData.ship_country_id,
      customerData.ship_state_id,
      customerData.ship_city,
      customerData.ship_postcode,
      customerData.ship_address,
      customerData.system_ip,
      customerData.system_name,
      customerData.updated_by,
      customerData.status,
      customerData.id,
    ];
    db.query(sql, values, callback);
  },
  deleteCustomer: (customerId, callback) => {
    const sql = 'DELETE FROM db_customers WHERE idPrimary = ?';
    db.query(sql, [customerId], callback);
  },
  updatePasswordByEmail: (email, hashedPassword, callback) => {
    const sql = 'UPDATE db_customers SET password = ? WHERE email = ?';
    db.query(sql, [hashedPassword, email], callback);
  },
  getCustomerOrderHistory: (customerId, callback) => {
    const sql = `
      SELECT 
        dp.id AS order_id,
        dp.purchase_date AS order_date,
        dp.purchase_status AS status,
        dpi.store_id,
        dpi.price
      FROM db_purchase dp
      LEFT JOIN db_items dpi ON dp.id = dpi.id
      WHERE dp.id = ?
    `;
    db.query(sql, [customerId], callback);
  },
  saveResetTokenForCustomer: (email, token, callback) => {
    const sql = 'UPDATE db_customers SET reset_token = ? WHERE email = ?';
    db.query(sql, [token, email], callback);
  },
  
  findCustomerByEmail: (email, callback) => {
    const query = 'SELECT * FROM db_customers WHERE email = ?';
    db.query(query, [email], (err, results) => {
      if (err) return callback(err, null);
      if (results.length > 0) {
        return callback(null, results[0]);  
      }
      return callback(null, null);  
    });
  },
  
  clearResetToken: (email, callback) => {
    const sql = 'UPDATE db_customers SET reset_token = NULL WHERE email = ?';
    db.query(sql, [email], callback);
  }
  


};

module.exports = CustomerModel;
