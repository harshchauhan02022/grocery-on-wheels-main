const ExpenseModel = require('../../models/expenseModels/ExpenseModel');

const ExpenseController = {
 getAllExpenses: (req, res) => {
  ExpenseModel.getAllExpenses((err, expenses) => {
   if (err) {
    return res.status(500).json({ error: 'Database error: ' + err.message });
   }
   res.status(200).json(expenses);
  });
 },
 createExpense: (req, res) => {
  const expenseData = {
   store_id: req.body.store_id,
   count_id: req.body.count_id,
   expense_code: req.body.expense_code,
   category_id: req.body.category_id,
   expense_date: req.body.expense_date,
   reference_no: req.body.reference_no,
   expense_for: req.body.expense_for,
   expense_amt: req.body.expense_amt,
   payment_type: req.body.payment_type,
   note: req.body.note,
   created_by: req.body.created_by,
   created_date: req.body.created_date,
   created_time: req.body.created_time,
   system_ip: req.body.system_ip,
   system_name: req.body.system_name,
   status: req.body.status,
  };

  ExpenseModel.createExpense(expenseData, (err, result) => {
   if (err) {
    return res.status(500).json({ error: 'Error creating expense: ' + err.message });
   }
   res.status(201).json({ message: 'Expense created successfully', expenseId: result.insertId });
  });
 },
 editExpense: (req, res) => {
  const expenseId = req.params.id;
  const expenseData = {
   store_id: req.body.store_id,
   count_id: req.body.count_id,
   expense_code: req.body.expense_code,
   category_id: req.body.category_id,
   expense_date: req.body.expense_date,
   reference_no: req.body.reference_no,
   expense_for: req.body.expense_for,
   expense_amt: req.body.expense_amt,
   payment_type: req.body.payment_type,
   note: req.body.note,
   created_by: req.body.created_by,
   created_date: req.body.created_date,
   created_time: req.body.created_time,
   system_ip: req.body.system_ip,
   system_name: req.body.system_name,
   status: req.body.status,
  };

  ExpenseModel.editExpense(expenseId, expenseData, (err) => {
   if (err) {
    return res.status(500).json({ error: 'Error updating expense: ' + err.message });
   }
   res.status(200).json({ message: 'Expense updated successfully' });
  });
 },
 deleteExpense: (req, res) => {
  const expenseId = req.params.id;

  ExpenseModel.deleteExpense(expenseId, (err) => {
   if (err) {
    return res.status(500).json({ error: 'Error deleting expense: ' + err.message });
   }
   res.status(200).json({ message: 'Expense deleted successfully' });
  });
 }
};

module.exports = ExpenseController;
