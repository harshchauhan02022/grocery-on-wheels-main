const db = require('../../config/db');

const BillsModels = {
  // Fetch items for the bill
  fetchItemsForBill: async () => {
    try {
      const query = `
        SELECT id, item_name, price
        FROM db_items
        WHERE price BETWEEN 1 AND 5000
        ORDER BY price DESC;
      `;
      const [results] = await db.execute(query);

      if (!Array.isArray(results) || results.length === 0) {
        throw new Error('No items available for the bill');
      }

      // Greedy approach to select items within the target amount
      const target = 5000;
      let bestSum = 0;
      let bestCombination = [];

      for (const item of results) {
        if (bestSum + item.price <= target) {
          bestSum += item.price;
          bestCombination.push(item);
        }

        if (bestSum >= target) break;
      }

      console.log('Selected Items:', bestCombination);
      return bestCombination;
    } catch (error) {
      console.error('Error fetching items for bill:', error.message);
      throw error;
    }
  },

  // Save the bill and its items
  saveBill: async ({ date, amount, billItems }) => {
    try {
      // Insert into the `db_aoutobiils` table
      const billQuery = `
        INSERT INTO db_aoutobiils (date, total_amount) 
        VALUES (?, ?)
      `;
      const [result] = await db.execute(billQuery, [date, amount]);
      const billId = result.insertId;

      // Insert bill items into the `db_bill_items` table
      const billItemsQuery = `
        INSERT INTO db_bill_items (bill_id, item_name, quantity, price, item_total) 
        VALUES (?, ?, ?, ?, ?)
      `;
      const insertPromises = billItems.map((item) =>
        db.execute(billItemsQuery, [
          billId,
          item.item_name,
          item.quantity,
          item.price,
          item.item_total,
        ])
      );
      await Promise.all(insertPromises);

      return billId;
    } catch (error) {
      console.error('Error saving bill:', error.message);
      throw error;
    }
  },
};

module.exports = BillsModels;
