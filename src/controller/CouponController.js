const CouponModel = require('../models/CouponModels');

const CouponController = {
 getCoupons: (req, res) => {
  CouponModel.getAllCoupons((err, results) => {
   if (err) {
    return res.status(500).json({ message: "Error retrieving coupons", error: err });
   }
   res.status(200).json(results);
  });
 },

 addCoupon: (req, res) => {
  const requiredFields = ['store_idIndex', 'code', 'name', 'value', 'type'];
  for (let field of requiredFields) {
   if (!req.body[field]) {
    return res.status(400).json({ message: `${field} is required` });
   }
  }

  const couponData = {
   store_idIndex: req.body.store_idIndex,
   code: req.body.code,
   name: req.body.name,
   description: req.body.description,
   value: req.body.value,
   type: req.body.type,
   expire_date: req.body.expire_date,
   status: req.body.status,
   created_by: req.body.created_by,
   created_date: req.body.created_date,
   created_time: req.body.created_time,
   system_name: req.body.system_name,
   system_ip: req.body.system_ip
  };

  CouponModel.addCoupon(couponData, (err, result) => {
   if (err) {
    return res.status(500).json({ message: "Error adding coupon", error: err });
   }
   res.status(201).json({ message: "Coupon added successfully", couponId: result.insertId });
  });
 },

 deleteCoupon: (req, res) => {
  const couponId = req.params.id;
  CouponModel.deleteCoupon(couponId, (err, result) => {
   if (err) {
    return res.status(500).json({ message: "Error deleting coupon", error: err });
   }
   if (result.affectedRows === 0) {
    return res.status(404).json({ message: "Coupon not found" });
   }
   res.status(200).json({ message: "Coupon deleted successfully" });
  });
 }
};

module.exports = CouponController;
