const express = require('express');
const VanBookingController = require('../controller/VanBookingController');
const router = express.Router();

router.get('/', VanBookingController.getAllUsers);
router.post('/book', VanBookingController.bookVan);
router.delete('/cancel/:id', VanBookingController.cancelVanBooking);
router.get('/details/:id', VanBookingController.getVanBookingDetails);
router.post('/register', VanBookingController.registerVan);

module.exports = router;
