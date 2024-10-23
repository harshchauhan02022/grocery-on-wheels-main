const db = require('../config/db');

const ProductModel = {
 getAllProducts: (callback) => {
  db.query('SELECT * FROM products', callback);
 },
};

module.exports = ProductModel;
