const db = require('../../config/db');

const ExpenseCategoryModel = {
 createExpenseCategory: (data, callback) => {
  const { store_id, category_code, category_name, description, created_by, status } = data;
  const sql = 'INSERT INTO db_expense_category (store_id, category_code, category_name, description, created_by, status) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(sql, [store_id, category_code, category_name, description, created_by, status], callback);
 },

 getAllExpensesCategory: (callback) => {
  const sql = 'SELECT * FROM db_expense_category';
  db.query(sql, callback);
 },

 editExpenseCategory: (id, data, callback) => {
  const { store_id, category_code, category_name, description, created_by, status } = data;
  const sql = 'UPDATE db_expense_category SET store_id = ?, category_code = ?, category_name = ?, description = ?, created_by = ?, status = ? WHERE id = ?';
  db.query(sql, [store_id, category_code, category_name, description, created_by, status, id], callback);
 },

 deleteExpenseCategory: (id, callback) => {
  const sql = 'DELETE FROM db_expense_category WHERE id = ?';
  db.query(sql, [id], callback);
 }
};

module.exports = ExpenseCategoryModel;
