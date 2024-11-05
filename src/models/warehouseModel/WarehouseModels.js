const db = require('../../config/db');

const WarehouseModel = {
 getAllWarehouses: (callback) => {
  const query = 'SELECT * FROM db_warehouse';
  db.query(query, callback);
 },
 getWarehouseById: (id, callback) => {
  const query = 'SELECT * FROM db_warehouse WHERE id = ?';
  db.query(query, [id], callback);
 },
 addWarehouse: (warehouseData, callback) => {
  const query = `
  INSERT INTO db_warehouse (store_id, warehouse_type, warehouse_name, mobile, email, status, created_date)
  VALUES (?, ?, ?, ?, ?, ?, ?)
`;

  const values = [
   warehouseData.store_idIndex,
   warehouseData.warehouse_type,
   warehouseData.warehouse_name,
   warehouseData.mobile,
   warehouseData.email,
   warehouseData.status,
   warehouseData.created_date
  ];
  db.query(query, values, callback);
 },

 updateWarehouse: (id, warehouseData, callback) => {
  const query = `
      UPDATE db_warehouse SET store_idIndex = ?, warehouse_type = ?, warehouse_name = ?, mobile = ?, email = ?, status = ?, created_date = ?
      WHERE id = ?`;
  const values = [
   warehouseData.store_idIndex,
   warehouseData.warehouse_type,
   warehouseData.warehouse_name,
   warehouseData.mobile,
   warehouseData.email,
   warehouseData.status,
   warehouseData.created_date,
   id
  ];
  db.query(query, values, callback);
 },

 deleteWarehouse: (id, callback) => {
  const query = 'DELETE FROM db_warehouse WHERE id = ?';
  db.query(query, [id], callback);
 }
};

module.exports = WarehouseModel;
