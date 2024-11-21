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
  saveBill: async ({ date, amount, billItems, serial_no }) => {
    try {
      const billQuery = `
        INSERT INTO db_aoutobiils (serial_no, date, total_amount) 
        VALUES (?, ?, ?)
      `;
      const [billResult] = await new Promise((resolve, reject) => {
        db.query(billQuery, [serial_no, date, amount], (err, results) => {
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

  fetchBills: async ({ serial_no, date }) => {
    try {
      let query = `SELECT * FROM db_aoutobiils`;
      const params = [];
      if (serial_no || date) {
        query += ` WHERE`;
        if (serial_no) {
          query += ` serial_no = ?`;
          params.push(serial_no);
        }
        if (serial_no && date) query += ` AND`;
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

  fetchBillBySerialNo: async (serial_no) => {
    try {
      const query = `SELECT * FROM db_aoutobiils WHERE serial_no = ?`;
      const results = await new Promise((resolve, reject) => {
        db.query(query, [serial_no], (err, results) => {
          if (err) return reject(err);
          resolve(results[0]);
        });
      });

      return results;
    } catch (error) {
      console.error('Error fetching bill by serial_no:', error.message);
      throw error;
    }
  },
  fetchBillById: async (id) => {
    try {
      const query = `SELECT * FROM db_aoutobiils WHERE id = ?`;

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
