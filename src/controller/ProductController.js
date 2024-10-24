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

 createProduct: (req, res) => {
  const productData = {
   store_id: req.body.store_id,
   count_id: req.body.count_id,
   item_code: req.body.item_code,
   item_name: req.body.item_name,
   category_id: req.body.category_id,
   sub_category_id: req.body.sub_category_id,
   sku: req.body.sku,
   hsn: req.body.hsn,
   unit_id: req.body.unit_id,
   alert_qty: req.body.alert_qty,
   seller_points: req.body.seller_points,
   custom_barcode: req.body.custom_barcode,
   price: req.body.price,
   tax_id: req.body.tax_id,
   tax_type: req.body.tax_type,
   profit_margin: req.body.profit_margin,
   sales_price: req.body.sales_price,
   discount_type: req.body.discount_type,
   discount: req.body.discount,
   description: req.body.description,
   mrp: req.body.mrp,
   expire_date: req.body.expire_date
  };

  // Add the necessary SQL insert logic here, ensuring to match the column names
  ProductModel.createProduct(productData, (err, result) => {
   if (err) {
    return res.status(500).json({ error: 'Error inserting product: ' + err.message });
   }
   res.status(201).json({ message: 'Product created successfully', productId: result.insertId });
  });
 }

};

module.exports = ProductController;
