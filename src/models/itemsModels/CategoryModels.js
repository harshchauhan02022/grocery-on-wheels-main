const db = require('../../config/db');

const CategoryModel = {
 getAllCategories: (callback) => {
  const sql = 'SELECT * FROM db_category';
  db.query(sql, callback);
 },

 createCategory: (categoryData, callback) => {
  const sql = `
      INSERT INTO db_category (
        store_id, count_id, category_code, category_name, description, company_id, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  const values = [
   categoryData.store_id,
   categoryData.count_id,
   categoryData.category_code,
   categoryData.category_name,
   categoryData.description,
   categoryData.company_id,
   categoryData.status
  ];
  db.query(sql, values, callback);
 },

 updateCategory: (id, categoryData, callback) => {
  const sql = `
      UPDATE db_category SET 
        store_id = ?, 
        count_id = ?, 
        category_code = ?, 
        category_name = ?, 
        description = ?, 
        company_id = ?, 
        status = ?
      WHERE id = ?`;
  const values = [
   categoryData.store_id,
   categoryData.count_id,
   categoryData.category_code,
   categoryData.category_name,
   categoryData.description,
   categoryData.company_id,
   categoryData.status,
   id
  ];
  db.query(sql, values, callback);
 },

 deleteCategory: (id, callback) => {
  const sql = 'DELETE FROM db_category WHERE id = ?';
  db.query(sql, [id], callback);
 }
};

module.exports = CategoryModel;
