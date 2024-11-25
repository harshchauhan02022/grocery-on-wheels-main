const db = require('../../config/db'); // Ensure this path is correct

const Barcode = {
  saveBarcodeImage: (text, imagePath, callback) => {
    const query = 'INSERT INTO barcodes (text, image_path) VALUES (?, ?)';
    db.query(query, [text, imagePath], (err, result) => {
      callback(err, result);
    });
  }
};

module.exports = Barcode;
