const ProductModel = require('../models/ProductModels');

const ProductController = {
  getAllProducts: (req, res) => {
    ProductModel.getAllProducts((err, products) => {
      if (err) {
        return res.status(500).json({ error: 'Database error: ' + err.message });
      }
      res.status(200).json(products);
    });
  },
};

module.exports = ProductController;
