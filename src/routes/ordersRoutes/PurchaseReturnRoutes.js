const express = require('express');
const router = express.Router();
const PurchaseReturnController = require('../../controller/ordersController/PurchaseReturnController');

router.post('/return', PurchaseReturnController.createPurchaseReturn);
router.get('/return/:id', PurchaseReturnController.getPurchaseReturnById);

module.exports = router;
