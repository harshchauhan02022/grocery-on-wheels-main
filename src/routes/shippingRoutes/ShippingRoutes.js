const express = require('express');
const router = express.Router();
const ShippingController = require('../../controller/shippingController/ShippingController');

router.post('/register', ShippingController.createShippingAddress);
router.get('/', ShippingController.getAllShippingAddresses);
router.get('/:id', ShippingController.getShippingAddressById);
router.put('/update/:id', ShippingController.updateShippingAddress);
router.delete('/delete/:id', ShippingController.deleteShippingAddress);

module.exports = router;
