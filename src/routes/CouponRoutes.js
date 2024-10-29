const express = require('express');
const CouponController = require('../controller/CouponController');

const router = express.Router();

router.get('/', CouponController.getCoupons); 
router.post('/register', CouponController.addCoupon); 
router.put('/edit/:id', CouponController.editCoupon); 
router.delete('/delete/:id', CouponController.deleteCoupon); 

module.exports = router;
