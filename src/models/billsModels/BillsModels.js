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
      const target = Math.min(amount, 100000);
      let bestSum = 0;
      const bestCombination = [];

      for (const item of results) {
        if (!item.item_name) {
          console.error('Skipping item with missing name:', item);
          continue;
        }

        if (bestSum + item.price <= target) {
          bestSum += item.price;
          bestCombination.push(item);
        }
        if (bestSum >= target) break;
      }

      return bestCombination;
    } catch (error) {
      console.error('Error fetching items for bill:', error.message);
      throw error;
    }
  },
  saveBill: async ({ date, amount, billItems, serial_number }) => {
    try {
      const billQuery = `
        INSERT INTO db_bills (serial_number, date, total_amount) 
        VALUES (?, ?, ?)
      `;
      const [billResult] = await new Promise((resolve, reject) => {
        db.query(billQuery, [serial_number, date, amount], (err, results) => {
          if (err) return reject(err);
          resolve([results]);
        });
      });

      const billId = billResult.insertId;
      const billItemsQuery = `
        INSERT INTO db_bill_items (bill_id, item_name, quantity, price, item_total) 
        VALUES (?, ?, ?, ?, ?)
      `;
      const insertPromises = billItems.map((item) =>
        new Promise((resolve, reject) => {
          db.query(
            billItemsQuery,
            [
              billId,
              item.item_name,
              item.quantity,
              item.price,
              item.item_total,
            ],
            (err, results) => {
              if (err) return reject(err);
              resolve(results);
            }
          );
        })
      );
      await Promise.all(insertPromises);
      return billId;
    } catch (error) {
      console.error('Error saving bill:', error.message);
      throw error;
    }
  },

  fetchBills: async ({ serial_number, date }) => {
    try {
      let query = `SELECT * FROM db_bills`;
      const params = [];
      if (serial_number || date) {
        query += ` WHERE`;
        if (serial_number) {
          query += ` serial_number = ?`;
          params.push(serial_number);
        }
        if (serial_number && date) query += ` AND`;
        if (date) {
          query += ` date = ?`;
          params.push(date);
        }
      }
      const results = await new Promise((resolve, reject) => {
        db.query(query, params, (err, results) => {
          if (err) return reject(err);
          resolve(results);
        });
      });

      return results;
    } catch (error) {
      console.error('Error fetching bills:', error.message);
      throw error;
    }
  },

  fetchBillBySerialNo: async (serial_number) => {
    try {
      const query = `SELECT * FROM db_bills WHERE serial_number = ?`;
      const results = await new Promise((resolve, reject) => {
        db.query(query, [serial_number], (err, results) => {
          if (err) return reject(err);
          resolve(results[0]);
        });
      });

      return results;
    } catch (error) {
      console.error('Error fetching bill by serial_number:', error.message);
      throw error;
    }
  },
  fetchBillById: async (id) => {
    try {
      const query = `SELECT * FROM db_bills WHERE id = ?`;

      const results = await new Promise((resolve, reject) => {
        db.query(query, [id], (err, results) => {
          if (err) return reject(err);
          resolve(results[0]);
        });
      });

      return results;
    } catch (error) {
      console.error('Error fetching bill by ID:', error.message);
      throw error;
    }
  },
};

module.exports = BillsModels;
