const db = require('../../config/db');

const CustomerModel = {
  getAllCustomers: (callback) => {
    const sql = 'SELECT * FROM db_customers';
    db.query(sql, callback);
  },

  findCustomerById: (id, callback) => {
    const sql = 'SELECT * FROM db_customers WHERE id = ?';
    db.query(sql, [id], (err, results) => {
      if (err) return callback(err, null);
      callback(null, results[0]); 
    });
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
      customerData.store_id, customerData.count_id, customerData.customer_code,
      customerData.customer_name, customerData.mobile, customerData.phone,
      customerData.email, customerData.password, customerData.gstin,
      customerData.tax_number, customerData.vatin, customerData.opening_balance,
      customerData.sales_due, customerData.sales_return_due, customerData.country_id,
      customerData.state_id, customerData.city, customerData.postcode, customerData.address,
      customerData.ship_country_id, customerData.ship_state_id, customerData.ship_city,
      customerData.ship_postcode, customerData.ship_address, customerData.system_ip,
      customerData.system_name, customerData.created_by, customerData.company_id,
      customerData.status,
    ];
    db.query(sql, values, callback);
  },

  findCustomerByCode: (usernameOrEmail, callback) => {
    const sql = `
      SELECT * FROM db_customers 
      WHERE customer_code = ? OR customer_name = ? OR email = ?
    `;
    db.query(sql, [usernameOrEmail, usernameOrEmail, usernameOrEmail], (err, results) => {
      if (err) return callback(err, null);
      callback(null, results[0]);
    });
  },

  updateCustomer: (customerData, callback) => {
    const sql = `
      UPDATE db_customers SET 
        store_id = ?, customer_name = ?, mobile = ?, phone = ?, email = ?, 
        gstin = ?, tax_number = ?, vatin = ?, opening_balance = ?, sales_due = ?, 
        sales_return_due = ?, country_id = ?, state_id = ?, city = ?, postcode = ?, 
        address = ?, ship_country_id = ?, ship_state_id = ?, ship_city = ?, 
        ship_postcode = ?, ship_address = ?, system_ip = ?, system_name = ?, 
        status = ? 
      WHERE id = ?
    `;
    const values = [
      customerData.store_id, customerData.customer_name, customerData.mobile,
      customerData.phone, customerData.email, customerData.gstin,
      customerData.tax_number, customerData.vatin, customerData.opening_balance,
      customerData.sales_due, customerData.sales_return_due, customerData.country_id,
      customerData.state_id, customerData.city, customerData.postcode, customerData.address,
      customerData.ship_country_id, customerData.ship_state_id, customerData.ship_city,
      customerData.ship_postcode, customerData.ship_address, customerData.system_ip,
      customerData.system_name, customerData.status, customerData.id,
    ];
    db.query(sql, values, callback);
  },

  deleteCustomer: (id, callback) => {
    const sql = 'DELETE FROM db_customers WHERE id = ?';
    db.query(sql, [id], callback);
  },

  updatePasswordByEmail: (email, hashedPassword, callback) => {
    const sql = 'UPDATE db_customers SET password = ? WHERE email = ?';
    db.query(sql, [hashedPassword, email], callback);
  },

  getCustomerOrderHistory: (id, callback) => {
    const sql = `
      SELECT 
        oh.id AS order_id, oh.order_date, oh.status,
        od.product_id, od.quantity, od.price
      FROM order_history AS oh
      LEFT JOIN order_details AS od ON oh.id = od.order_id
      WHERE oh.customer_id = ?
    `;
    db.query(sql, [id], callback);
  },
};

module.exports = CustomerModel;
