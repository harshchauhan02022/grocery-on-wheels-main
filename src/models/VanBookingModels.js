const db = require('../config/db');

const VanBookingModel = {
  getAllUsers: (callback) => {
    db.query('SELECT * FROM van_bookings', callback);
  },
};

module.exports = VanBookingModel;
