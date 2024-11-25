const multer = require('multer');
const path = require('path');
const Barcode = require('../../models/billsModels/BarcodeModels'); // Ensure this path is correct

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/barcodes')); // Save files to "uploads/barcodes"
  },
  filename: (req, file, cb) => {
    const uniqueName = `barcode_${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueName); // Generate a unique filename
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Only accept image files
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
  }
});

const barcodeController = {
  uploadBarcodeImage: (req, res) => {
    try {
      const file = req.file; // Access the uploaded file
      const { text } = req.body; // Barcode text provided by the user

      if (!file || !text) {
        return res.status(400).json({ error: 'Both text and image file are required.' });
      }

      // Save the file path and text to the database
      Barcode.saveBarcodeImage(text, file.path, (err, result) => {
        if (err) {
          console.error('Error saving barcode to database:', err);
          return res.status(500).json({ error: 'Failed to save barcode to the database.' });
        }

        res.status(200).json({
          message: 'Barcode image uploaded successfully',
          filePath: file.path,
          barcodeText: text,
        });
      });
    } catch (error) {
      console.error('Error uploading barcode image:', error.message);
      res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
  }
};

module.exports = { barcodeController, upload };
