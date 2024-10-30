const db = require('../../config/db');

const CouponModel = {
 getAllCoupons: (callback) => {
  const sql = 'SELECT * FROM db_coupons';
  db.query(sql, callback);
 },

 addCoupon: (couponData, callback) => {
  const sql = `
      INSERT INTO db_coupons (
        store_id, code, name, description, value, type, expire_date, status, created_by, created_date, created_time, system_name, system_ip
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
  const values = [
   couponData.store_id,
   couponData.code,
   couponData.name,
   couponData.description,
   couponData.value,
   couponData.type,
   couponData.expire_date,
   couponData.status,
   couponData.created_by,
   couponData.created_date,
   couponData.created_time,
   couponData.system_name,
   couponData.system_ip
  ];
  db.query(sql, values, callback);
 },

 editCoupon: (couponId, updatedData, callback) => {
  const sql = `
      UPDATE db_coupons
      SET store_id = ?, code = ?, name = ?, description = ?, value = ?, type = ?, expire_date = ?, status = ?, system_name = ?, system_ip = ?
      WHERE id = ?
    `;
  const values = [
   updatedData.store_id,
   updatedData.code,
   updatedData.name,
   updatedData.description,
   updatedData.value,
   updatedData.type,
   updatedData.expire_date,
   updatedData.status,
   updatedData.system_name,
   updatedData.system_ip,
   couponId
  ];
  db.query(sql, values, callback);
 },

 deleteCoupon: (couponId, callback) => {
  const sql = 'DELETE FROM db_coupons WHERE id = ?';
  db.query(sql, [couponId], callback);
 }
};

module.exports = CouponModel;
