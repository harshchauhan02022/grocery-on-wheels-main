const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');
const BillsModels = require('../../models/billsModels/PFF-BillsModels');

const generateBillPDF = ({ serial_no, date, amount, items, pdfPath }) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument();
      const stream = fs.createWriteStream(pdfPath);
      doc.pipe(stream);

      doc.fontSize(20).text('Bill Details', { align: 'center' }).moveDown();

      doc.fontSize(14).text(`Serial No: ${serial_no}`);
      doc.text(`Date: ${date}`);
      doc.text(`Total Amount: ₹${amount}`).moveDown();

      doc.text('Items:', { underline: true }).moveDown();
      items.forEach((item, index) => {
        doc.text(`${index + 1}. ${item.item_name} - ₹${item.price}`);
      });

      doc.end();

      stream.on('finish', () => {
        console.log('PDF generated successfully');
        resolve();
      });

      stream.on('error', (err) => {
        console.error('PDF generation error:', err);
        reject(err);
      });
    } catch (error) {
      reject(error);
    }
  });
};

const createBill = async (req, res) => {
  try {
    const { date, amount, serial_no } = req.body;

    if (!date || !amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({ error: 'A valid date and a positive amount are required.' });
    }
    if (amount > 100000) {
      return res.status(400).json({ error: 'Amount cannot exceed 100,000.' });
    }

    const generatedSerialNo = serial_no || `BILL-${Date.now()}`;

    const items = await BillsModels.fetchItemsForBill(amount);
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(404).json({ error: 'No items available to generate a bill.' });
    }

    const billItems = items.map((item) => ({
      item_name: item.item_name,
      quantity: 1,
      price: item.price,
      item_total: item.price,
    }));

    const billId = await BillsModels.saveBill({
      date,
      amount,
      billItems,
      serial_no: generatedSerialNo,
    });

    const billsFolderPath = path.join('D:', 'Newfolder', 'grocery-on-wheels-main', 'bills');
    console.log("PDF save path:", billsFolderPath);
    if (!fs.existsSync(billsFolderPath)) {
      try {
        fs.mkdirSync(billsFolderPath, { recursive: true });
        console.log('Bills folder created successfully!');
      } catch (err) {
        console.error('Error creating folder:', err);
      }
    }

    const pdfPath = path.join(billsFolderPath, `BILL-${billId}.pdf`);
    console.log("Generating PDF at path:", pdfPath);
    await generateBillPDF({
      serial_no: generatedSerialNo,
      date,
      amount,
      items: billItems,
      pdfPath,
    });

    res.download(pdfPath, `BILL-${billId}.pdf`, (err) => {
      if (err) {
        console.error('Error sending file:', err);
        return res.status(500).json({ error: 'Error downloading file' });
      }

      fs.unlink(pdfPath, (unlinkErr) => {
        if (unlinkErr) console.error('Error deleting file:', unlinkErr);
      });
    });
  } catch (error) {
    console.error('Error creating bill:', error.message);
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
};

module.exports = { createBill };
