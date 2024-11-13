const db = require('../../config/db');

const BillsModels = {
  getAll: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM db_bills', (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });
  },

  getById: (id) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM db_bills WHERE id = ?';
      db.query(query, [id], (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results[0]);
      });
    });
  },

  create: (billData) => {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO db_bills (serial_number, date, total_amount, status, remarks)
        VALUES (?, ?, ?, ?, ?)
      `;
      const { serial_number, date, total_amount, status, remarks } = billData;
      db.query(query, [serial_number, date, total_amount, status, remarks], (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve({ id: results.insertId, ...billData });
      });
    });
  },

  update: (id, billData) => {
    return new Promise((resolve, reject) => {
      const query = `
        UPDATE db_bills
        SET serial_number = ?, date = ?, total_amount = ?, status = ?, remarks = ?
        WHERE id = ?
      `;
      const { serial_number, date, total_amount, status, remarks } = billData;
      db.query(query, [serial_number, date, total_amount, status, remarks, id], (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results.affectedRows > 0 ? { id, ...billData } : null);
      });
    });
  },

  delete: (id) => {
    return new Promise((resolve, reject) => {
      const query = 'DELETE FROM db_bills WHERE id = ?';
      db.query(query, [id], (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results.affectedRows > 0);
      });
    });
  },
};

module.exports = BillsModels;
