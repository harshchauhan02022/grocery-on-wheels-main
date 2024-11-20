const BillsModels = require('../../models/billsModels/BillsModels');

const BillsController = {
  createBill: async (req, res) => {
    try {
      const { date, amount } = req.body;

      if (!date || !amount || amount <= 0) {
        return res.status(400).json({ error: 'Valid date and positive amount are required.' });
      }

      const items = await BillsModels.fetchItemsForBill(amount);

      if (!Array.isArray(items) || items.length === 0) {
        return res.status(404).json({ error: 'No items available to generate a bill.' });
      }

      return res.status(201).json({
        message: 'Bill created successfully.',
        date,
        amount,
        items: items,
      });
    } catch (error) {
      console.error('Error creating bill:', error.message);
      return res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
  },
};

module.exports = BillsController;
