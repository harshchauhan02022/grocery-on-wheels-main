const db = require('../config/db');

const VanBookingModel = {
  getAllUsers: (callback) => {
    db.query('SELECT * FROM van_bookings', callback);
  },
  bookVan: (data, callback) => {
    const sql = `INSERT INTO van_bookings (user_id, van_id, booking_date, status) VALUES (?, ?, ?, ?)`;
    db.query(sql, [data.user_id, data.van_id, data.booking_date, 'booked'], callback);
  },
  cancelVanBooking: (bookingId, callback) => {
    const sql = `DELETE FROM van_bookings WHERE id = ?`;
    db.query(sql, [bookingId], callback);
  },
  getVanBookingDetails: (bookingId, callback) => {
    const sql = `SELECT * FROM van_bookings WHERE id = ?`;
    db.query(sql, [bookingId], callback);
  },
  registerVan: (data, callback) => {
    const sql = `INSERT INTO vans (van_name, van_model, capacity, status) VALUES (?, ?, ?, ?)`;
    db.query(sql, [data.van_name, data.van_model, data.capacity, data.status], callback);
  }
};

module.exports = VanBookingModel;
