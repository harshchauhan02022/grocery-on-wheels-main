const db = require('../config/db');

const BrandModel = {
 // Get all brands
 getAllBrands: (callback) => {
  const sql = 'SELECT * FROM db_brands';
  db.query(sql, callback);
 },

 // Create a new brand
 createBrand: (brandData, callback) => {
  const sql = `
      INSERT INTO db_brands (
        store_id, brand_code, brand_name, description, status
      ) VALUES (?, ?, ?, ?, ?)`;
  const values = [
   brandData.store_id,
   brandData.brand_code,
   brandData.brand_name,
   brandData.description,
   brandData.status
  ];
  db.query(sql, values, callback);
 },

 updateBrand: (id, brandData, callback) => {
  const sql = `
     UPDATE db_brands SET 
       store_id = ?, 
       brand_code = ?, 
       brand_name = ?, 
       description = ?, 
       status = ? 
     WHERE id = ?`; 
  const values = [
   brandData.store_id,
   brandData.brand_code,
   brandData.brand_name,
   brandData.description,
   brandData.status,
   id
  ];
  db.query(sql, values, callback);
 },

 deleteBrand: (id, callback) => {
  const sql = 'DELETE FROM db_brands WHERE id = ?';
  db.query(sql, [id], callback);
 }
};

module.exports = BrandModel;
