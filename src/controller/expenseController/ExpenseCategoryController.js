const ExpenseCategoryModel = require('../../models/expenseModels/ExpenseCategoryModel');

const ExpenseCategoryController = {
 createExpenseCategory: (req, res) => {
  ExpenseCategoryModel.createExpenseCategory(req.body, (error, results) => {
   if (error) {
    return res.status(500).json({ error: 'Error creating category', details: error.message });
   }
   return res.status(201).json({ message: 'Category created successfully', data: results });
  });
 },

 getAllExpensesCategory: (req, res) => {
  ExpenseCategoryModel.getAllExpensesCategory((error, results) => {
   if (error) {
    return res.status(500).json({ error: 'Error fetching categories', details: error.message });
   }
   return res.status(200).json(results);
  });
 },

 editExpenseCategory: (req, res) => {
  const { id } = req.params;
  ExpenseCategoryModel.editExpenseCategory(id, req.body, (error, results) => {
   if (error) {
    return res.status(500).json({ error: 'Error updating category', details: error.message });
   }
   if (results.affectedRows === 0) {
    return res.status(404).json({ error: 'Category not found' });
   }
   return res.status(200).json({ message: 'Category updated successfully' });
  });
 },

 deleteExpenseCategory: (req, res) => {
  const { id } = req.params;
  ExpenseCategoryModel.deleteExpenseCategory(id, (error, results) => {
   if (error) {
    return res.status(500).json({ error: 'Error deleting category', details: error.message });
   }
   if (results.affectedRows === 0) {
    return res.status(404).json({ error: 'Category not found' });
   }
   return res.status(204).json({ message: 'Category deleted successfully' });
  });
 }
};

module.exports = ExpenseCategoryController;
