const db = require('../../config/db');

const BillsModels = {
  fetchItemsForBill: async (amount) => {
    try {
      const query = `
        SELECT id, item_name, price 
        FROM db_items 
        WHERE price BETWEEN 1 AND ${amount} 
        ORDER BY price DESC
      `;

      const results = await new Promise((resolve, reject) => {
        db.query(query, (err, results) => {
          if (err) return reject(err);
          resolve(results);
        });
      });

      if (!Array.isArray(results) || results.length === 0) {
        throw new Error('No items available for the bill');
      }

      console.log(">>>>>>>>>>>> mohit results", results)

      const target = amount;
      let bestSum = 0;
      const bestCombination = [];

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

  saveBill: async ({ date, amount, billItems }) => {
    try {
      const billQuery = `
        INSERT INTO db_aoutobiils (date, total_amount) 
        VALUES (?, ?)
      `;
      const [result] = await db.execute(billQuery, [date, amount]);
      const billId = result.insertId;

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
