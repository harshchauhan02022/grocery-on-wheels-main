const express = require('express');
const { barcodeController, upload } = require('../../controller/billsController/BarcodeController'); // Ensure this path is correct

const router = express.Router();

router.post('/upload', upload.single('barcodeImage'), barcodeController.uploadBarcodeImage);

module.exports = router;
