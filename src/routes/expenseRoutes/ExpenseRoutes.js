const express = require('express');
const ExpenseController = require('../../controller/expenseController/ExpenseController');
const router = express.Router();

router.get('/', ExpenseController.getAllExpenses);
router.post('/create', ExpenseController.createExpense);
router.put('/edit/:id', ExpenseController.editExpense);
router.delete('/delete/:id', ExpenseController.deleteExpense);

module.exports = router;
