const express = require('express');
const router = express.Router();
const purchaseController = require('../../controller/ordersController/PurchaseController');

router.post('/create', purchaseController.createPurchase);
router.get('/order/:id', purchaseController.getOrderDetails);
router.post('/return', purchaseController.createPurchaseReturn);
router.get('/return/:id', purchaseController.getPurchaseReturnById);

module.exports = router;
