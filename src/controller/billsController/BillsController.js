const BillsModels = require('../../models/billsModels/BillsModels');

const BillsController = {
  createBill: async (req, res) => {
    try {
      const { date, amount } = req.body;

      // Validate input
      if (!date || !amount || amount <= 0) {
        return res.status(400).json({ error: 'Valid date and positive amount are required.' });
      }

      // Fetch items for the bill
      const items = await BillsModels.fetchItemsForBill();

      if (!Array.isArray(items) || items.length === 0) {
        return res.status(404).json({ error: 'No items available to generate a bill.' });
      }

      // Select items for the bill
      let currentAmount = 0;
      const billItems = [];

      for (const item of items) {
        if (currentAmount + item.price > amount) {
          continue;
        }

        currentAmount += item.price;
        billItems.push({
          id: item.id,
          item_name: item.item_name,
          quantity: 1,
          price: item.price,
          item_total: item.price,
        });

        if (currentAmount >= amount) break;
      }

      // Ensure the total meets the required amount
      if (currentAmount < amount) {
        return res.status(400).json({ error: 'Cannot create bill as the items do not meet the required amount.' });
      }

      // Save the bill in the database
      const billId = await BillsModels.saveBill({ date, amount, billItems });

      // Respond with success
      return res.status(201).json({
        message: 'Bill created successfully.',
        billId,
        date,
        amount,
        items: billItems,
        total: currentAmount,
      });
    } catch (error) {
      console.error('Error creating bill:', error.message);
      return res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
  },
};

module.exports = BillsController;
