const db = require('../config/db');

const VariantModel = {
 // Fetch all variants
 getAllVariants: (callback) => {
  const sql = 'SELECT * FROM db_variants';
  db.query(sql, callback);
 },

 // Insert a new variant
 createVariant: (variantData, callback) => {
  const sql = `
      INSERT INTO db_variants (
        store_id, variant_code, variant_name, description, status
      ) VALUES (?, ?, ?, ?, ?)`;
  const values = [
   variantData.store_id,
   variantData.variant_code,
   variantData.variant_name,
   variantData.description,
   variantData.status
  ];
  db.query(sql, values, callback);
 },

 // Update an existing variant
 editVariant: (id, variantData, callback) => {
  const sql = `
      UPDATE db_variants SET
        store_id = ?, variant_code = ?, variant_name = ?, description = ?, status = ?
      WHERE id = ?`;
  const values = [
   variantData.store_id,
   variantData.variant_code,
   variantData.variant_name,
   variantData.description,
   variantData.status,
   id
  ];
  db.query(sql, values, callback);
 },

 // Delete a variant
 deleteVariant: (id, callback) => {
  const sql = 'DELETE FROM db_variants  WHERE id = ?';
  db.query(sql, [id], callback);
 }
};

module.exports = VariantModel;
