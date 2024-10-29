const express = require('express');
const router = express.Router();
const ExpenseCategoryController = require('../../controller/expenseController/ExpenseCategoryController');

router.get('/', ExpenseCategoryController.getAllExpensesCategory);
router.post('/create', ExpenseCategoryController.createExpenseCategory);
router.put('/edit/:id', ExpenseCategoryController.editExpenseCategory);
router.delete('/delete/:id', ExpenseCategoryController.deleteExpenseCategory);

module.exports = router;
