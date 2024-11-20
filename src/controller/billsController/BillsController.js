const BillsModels = require('../../models/billsModels/BillsModels');

const BillsController = {
  createBill: async (req, res) => {
    try {
      const { date, amount, serial_no } = req.body;

      if (!date || !amount || amount <= 0) {
        return res.status(400).json({ error: 'Valid date and positive amount are required.' });
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
      const billId = await BillsModels.saveBill({ date, amount, billItems, serial_no: generatedSerialNo });

      return res.status(201).json({
        message: 'Bill created successfully.',
        billId,
        serial_no: generatedSerialNo,
        date,
        amount,
        items: billItems,
      });
    } catch (error) {
      console.error('Error creating bill:', error.message);
      return res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
  },
  getBills: async (req, res) => {
    try {
      const { serial_no, date } = req.query;
      const bills = await BillsModels.fetchBills({ serial_no, date });

      if (bills.length === 0) {
        return res.status(404).json({ message: 'No bills found.' });
      }

      return res.status(200).json({ bills });
    } catch (error) {
      console.error('Error fetching bills:', error.message);
      return res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
  },
  getBillBySerialNo: async (req, res) => {
    try {
      const { serial_no } = req.params;

      if (!serial_no) {
        return res.status(400).json({ error: 'Serial number is required.' });
      }
      const bill = await BillsModels.fetchBillBySerialNo(serial_no);

      if (!bill) {
        return res.status(404).json({ message: `Bill with serial_no '${serial_no}' not found.` });
      }

      return res.status(200).json({ bill });
    } catch (error) {
      console.error('Error fetching bill by serial_no:', error.message);
      return res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
  },
  getBillById: async (req, res) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ error: 'Bill ID is required.' });
      }
      const bill = await BillsModels.fetchBillById(id);
      if (!bill) {
        return res.status(404).json({ message: `Bill with ID '${id}' not found.` });
      }

      return res.status(200).json({ bill });
    } catch (error) {
      console.error('Error fetching bill by ID:', error.message);
      return res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
  },
};

module.exports = BillsController;
