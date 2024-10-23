const db = require('../config/db');

const UserModel = {
  getAllUsers: (callback) => {
    const query = `SELECT * FROM db_users`;
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error retrieving users:', err.message);
        return callback(err, null);
      }
      callback(null, results);
    });
  },

  registerUser: (userData, callback) => {
    const { username, firstName, lastName, mobile, email, role, password } = userData;
    const query = `
      INSERT INTO db_users (username, first_name, last_name, mobile, email, role_name, password)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    db.query(query, [username, firstName, lastName, mobile, email, role, password], (err, result) => {
      if (err) {
        console.error('Database query error:', err.message);
        return callback(err, null);
      }
      callback(null, result);
    });
  },

  findUserByUsername: (username, callback) => {
    const query = `SELECT * FROM db_users WHERE username = ?`;
    db.query(query, [username], (err, results) => {
      if (err) {
        console.error('Error querying user by username:', err.message);
        return callback(err, null);
      }
      callback(null, results[0]);
    });
  },

  findUserByEmail: (email, callback) => {
    const query = `SELECT * FROM db_users WHERE email = ?`;
    db.query(query, [email], (err, results) => {
      if (err) {
        console.error('Error finding user by email:', err.message);
        return callback(err, null);
      }
      callback(null, results[0]);
    });
  },

  deleteUser: (id, callback) => {
    const query = `DELETE FROM db_users WHERE id = ?`;
    db.query(query, [id], (err, result) => {
      if (err) {
        console.error('Error deleting user:', err.message);
        return callback(err, null);
      }
      callback(null, result);
    });
  },

  updateUser: (userData, callback) => {
    const { username, firstName, lastName, mobile, email, role } = userData;
    const query = `
      UPDATE db_users 
      SET first_name = ?, last_name = ?, mobile = ?, email = ?, role_name = ? 
      WHERE username = ?
    `;
    db.query(query, [firstName, lastName, mobile, email, role, username], (err, result) => {
      if (err) {
        console.error('Error updating user:', err.message);
        return callback(err, null);
      }
      callback(null, result);
    });
  }
};

module.exports = UserModel;
