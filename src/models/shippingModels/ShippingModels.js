const db = require('../../config/db'); 

const ShippingModels = {
 create: (data, callback) => {
  const sql = `
            INSERT INTO db_shippingaddress (
                store_idIndex, 
                country_id, 
                state_id, 
                city, 
                postcode, 
                address, 
                status, 
                customer_idIndex, 
                location_link
            ) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
  db.query(sql, [
   data.store_idIndex,
   data.country_id,
   data.state_id,
   data.city,
   data.postcode,
   data.address,
   data.status,
   data.customer_idIndex,
   data.location_link
  ], callback);
 },
 getAll: (callback) => {
  const sql = 'SELECT * FROM db_shippingaddress';
  db.query(sql, callback);
 },
 getById: (id, callback) => {
  const sql = 'SELECT * FROM db_shippingaddress WHERE idIndex = ?';
  db.query(sql, [id], callback);
 },
 update: (id, data, callback) => {
  const sql = `
            UPDATE db_shippingaddress 
            SET 
                store_idIndex = ?, 
                country_id = ?, 
                state_id = ?, 
                city = ?, 
                postcode = ?, 
                address = ?, 
                status = ?, 
                customer_idIndex = ?, 
                location_link = ? 
            WHERE idIndex = ?
        `;
  db.query(sql, [
   data.store_idIndex,
   data.country_id,
   data.state_id,
   data.city,
   data.postcode,
   data.address,
   data.status,
   data.customer_idIndex,
   data.location_link,
   id
  ], callback);
 },

 delete: (id, callback) => {
  const sql = 'DELETE FROM db_shippingaddress WHERE idIndex = ?';
  db.query(sql, [id], callback);
 }
};

module.exports = ShippingModels;
