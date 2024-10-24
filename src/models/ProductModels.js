const db = require('../config/db');

const ProductModel = {
 getAllProducts: (callback) => {
  db.query('SELECT * FROM db_items', callback);
 },

 createProduct: (productData, callback) => {
  const sql = `
      INSERT INTO db_items (
        store_id,
        count_id,
        item_code,
        item_name,
        category_id, 
        sub_category_id, 
        sku,
        hsn,
        unit_id, 
        alert_qty,
        seller_points,
        price, 
        tax_id,
        tax_type,
        profit_margin,
        sales_price,
        discount_type, 
        discount, 
        description, 
        mrp,
        expire_date
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [
   productData.store_id,
   productData.count_id,
   productData.item_code,
   productData.item_name,
   productData.category_id,
   productData.sub_category_id,
   productData.sku,
   productData.hsn,
   productData.unit_id,
   productData.alert_qty,
   productData.seller_points,
   productData.custom_barcode,
   productData.price,
   productData.tax_id,
   productData.tax_type,
   productData.profit_margin,
   productData.sales_price,
   productData.discount_type,
   productData.discount,
   productData.description,
   productData.mrp,
   productData.expire_date
  ];

  db.query(sql, values, (err, result) => {
   callback(err, result);
  });
 }
};

module.exports = ProductModel;
