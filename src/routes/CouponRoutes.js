const express = require('express');
const CouponController = require('../controller/CouponController');

const router = express.Router();

router.get('/', CouponController.getCoupons); // Get all coupons
router.post('/register', CouponController.addCoupon); // Add a new coupon
router.delete('/delete/:id', CouponController.deleteCoupon); // Delete a coupon by ID

module.exports = router;
