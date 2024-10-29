const db = require('../../config/db');

const ExpenseModel = {
 getAllExpenses: (callback) => {
  const sql = 'SELECT * FROM db_expense';
  db.query(sql, callback);
 },
 createExpense: (expenseData, callback) => {
  const sql = `
      INSERT INTO db_expense (
        store_id, count_id, expense_code, category_id, expense_date, reference_no,
        expense_for, expense_amt, payment_type, note, created_by,
        created_date, created_time, system_ip, system_name, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const values = [
   expenseData.store_id,
   expenseData.count_id,
   expenseData.expense_code,
   expenseData.category_id,
   expenseData.expense_date,
   expenseData.reference_no,
   expenseData.expense_for,
   expenseData.expense_amt,
   expenseData.payment_type,
   expenseData.note,
   expenseData.created_by,
   expenseData.created_date,
   expenseData.created_time,
   expenseData.system_ip,
   expenseData.system_name,
   expenseData.status,
  ];
  db.query(sql, values, callback);
 },
 editExpense: (id, expenseData, callback) => {
  const sql = `
      UPDATE db_expense SET
        store_id = ?, count_id = ?, expense_code = ?, category_id = ?, expense_date = ?, 
        reference_no = ?, expense_for = ?, expense_amt = ?, payment_type = ?, 
        note = ?, created_by = ?, created_date = ?, created_time = ?, 
        system_ip = ?, system_name = ?, status = ?
      WHERE id = ?`;
  const values = [
   expenseData.store_id,
   expenseData.count_id,
   expenseData.expense_code,
   expenseData.category_id,
   expenseData.expense_date,
   expenseData.reference_no,
   expenseData.expense_for,
   expenseData.expense_amt,
   expenseData.payment_type,
   expenseData.note,
   expenseData.created_by,
   expenseData.created_date,
   expenseData.created_time,
   expenseData.system_ip,
   expenseData.system_name,
   expenseData.status,
   id
  ];
  db.query(sql, values, callback);
 },
 deleteExpense: (id, callback) => {
  const sql = 'DELETE FROM db_expense WHERE id = ?';
  db.query(sql, [id], callback);
 }
};

module.exports = ExpenseModel;
