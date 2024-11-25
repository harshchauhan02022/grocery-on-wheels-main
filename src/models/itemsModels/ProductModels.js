const db = require('../../config/db');

const ProductModel = {
  getAllProducts: (callback) => {
    db.query('SELECT * FROM db_items', callback);
  },
  getProductById: (productId, callback) => {
    const sql = 'SELECT * FROM db_items WHERE id = ?';
    db.query(sql, [productId], (err, result) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, result.length ? result[0] : null);
    });
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
        custom_barcode,
        price,
        tax_id,
        tax_type,
        profit_margin,
        sales_price,
        discount_type,
        discount,
        description,
        mrp,
        expire_date,
        item_image
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

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
      productData.expire_date,
      productData.item_image,
    ];

    db.query(sql, values, callback);
  },
  deleteProduct: (productId, callback) => {
    const sql = 'DELETE FROM db_items WHERE id = ?';
    db.query(sql, [productId], callback);
  },
  updateProduct: (productId, updatedData, callback) => {
    const sql = `
      UPDATE db_items SET
        store_id = ?, 
        count_id = ?, 
        item_code = ?, 
        item_name = ?, 
        category_id = ?, 
        sub_category_id = ?, 
        sku = ?, 
        hsn = ?, 
        unit_id = ?, 
        alert_qty = ?, 
        seller_points = ?, 
        custom_barcode = ?, 
        price = ?, 
        tax_id = ?, 
        tax_type = ?, 
        profit_margin = ?, 
        sales_price = ?, 
        discount_type = ?, 
        discount = ?, 
        description = ?, 
        mrp = ?, 
        expire_date = ?
      WHERE id = ?
    `;

    const values = [
      updatedData.store_id,
      updatedData.count_id,
      updatedData.item_code,
      updatedData.item_name,
      updatedData.category_id,
      updatedData.sub_category_id,
      updatedData.sku,
      updatedData.hsn,
      updatedData.unit_id,
      updatedData.alert_qty,
      updatedData.seller_points,
      updatedData.custom_barcode,
      updatedData.price,
      updatedData.tax_id,
      updatedData.tax_type,
      updatedData.profit_margin,
      updatedData.sales_price,
      updatedData.discount_type,
      updatedData.discount,
      updatedData.description,
      updatedData.mrp,
      updatedData.expire_date,
      productId
    ];

    db.query(sql, values, callback);
  }
};

module.exports = ProductModel;
