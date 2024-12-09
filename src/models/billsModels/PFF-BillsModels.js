const db = require('../../config/db');

const fetchItemsForBill = async (amount) => {
 try {
  const query = `
      SELECT id, item_name, price 
      FROM db_items 
      WHERE price BETWEEN 1 AND ? 
      ORDER BY price DESC
    `;
  const [results] = await db.promise().query(query, [amount]);

  if (!Array.isArray(results) || results.length === 0) {
   throw new Error('No items available for the bill');
  }

  const target = Math.min(amount, 100000);
  let bestSum = 0;
  const bestCombination = [];

  for (const item of results) {
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
};

const saveBill = async ({ date, amount, billItems, serial_no }) => {
 try {
  const billQuery = `
      INSERT INTO db_aoutobills (serial_no, date, total_amount) 
      VALUES (?, ?, ?)
    `;
  const [billResult] = await db.promise().query(billQuery, [serial_no, date, amount]);
  const billId = billResult.insertId;

  const billItemsQuery = `
      INSERT INTO db_bill_items (bill_id, item_name, quantity, price, item_total) 
      VALUES (?, ?, ?, ?, ?)
    `;
  const insertPromises = billItems.map((item) =>
   db.promise().query(billItemsQuery, [billId, item.item_name, item.quantity, item.price, item.item_total])
  );
  await Promise.all(insertPromises);

  return billId;
 } catch (error) {
  console.error('Error saving bill:', error.message);
  throw error;
 }
};

module.exports = { fetchItemsForBill, saveBill };
