const db = require('../config/db'); // अपने डेटाबेस कनेक्शन फ़ाइल को यहां import करें

const CouponModel = {
 getAllCoupons: (callback) => {
  const sql = 'SELECT * FROM db_coupons';
  db.query(sql, callback);
 },

 addCoupon: (couponData, callback) => {
  const sql = `
      INSERT INTO db_coupons (
        store_idIndex, code, name, description, value, type, expire_date, status, created_by, created_date, created_time, system_name, system_ip
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
  const values = [
   couponData.store_idIndex,
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

 deleteCoupon: (couponId, callback) => {
  const sql = 'DELETE FROM db_coupons WHERE idPrimary = ?';
  db.query(sql, [couponId], callback);
 }
};

module.exports = CouponModel;
