const express = require('express');
const VanBookingController = require('../controller/VanBookingController');
const router = express.Router();

router.get('/', VanBookingController.getAllUsers);

module.exports = router;
