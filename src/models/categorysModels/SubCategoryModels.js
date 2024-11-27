const db = require('../../config/db');

const SubCategoryModel = {
 getAllCategories: (callback) => {
  db.query('SELECT * FROM db_sub_category', callback);
 },

 createCategory: (data, callback) => {
  const query = `INSERT INTO db_sub_category 
      (category_id, store_id, count_id, category_code, category_name, description, company_id, status) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  const values = [
   data.category_id,
   data.store_id,
   data.count_id,
   data.category_code,
   data.category_name,
   data.description,
   data.company_id,
   data.status,
  ];
  db.query(query, values, callback);
 },

 updateCategory: (id, data, callback) => {
  const query = `UPDATE db_sub_category 
      SET category_id=?, store_id=?, count_id=?, category_code=?, category_name=?, description=?, company_id=?, status=? 
      WHERE id=?`;
  const values = [
   data.category_id,
   data.store_id,
   data.count_id,
   data.category_code,
   data.category_name,
   data.description,
   data.company_id,
   data.status,
   id,
  ];
  db.query(query, values, callback);
 },

 deleteCategory: (id, callback) => {
  db.query('DELETE FROM db_sub_category WHERE id = ?', [id], callback);
 },
};

module.exports = SubCategoryModel;
