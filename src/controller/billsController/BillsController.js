const BillsModels = require('../../models/billsModels/BillsModels.js');

const BillsController = {
 getAllBills: async (req, res) => {
  try {
   const bills = await BillsModels.getAll();
   res.status(200).json(bills);
  } catch (error) {
   res.status(500).json({ error: 'Failed to fetch bills' });
  }
 },

 getBillById: async (req, res) => {
  const { id } = req.params;
  try {
   const bill = await BillsModels.getById(id);
   if (!bill) {
    return res.status(404).json({ error: 'Bill not found' });
   }
   res.status(200).json(bill);
  } catch (error) {
   res.status(500).json({ error: 'Failed to fetch bill' });
  }
 },

 createBill: async (req, res) => {
  const { serial_number, date, total_amount, status, remarks } = req.body;

  if (!serial_number || !date || !total_amount) {
   return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
   const newBill = await BillsModels.create({
    serial_number,
    date,
    total_amount,
    status: status || 'Pending',
    remarks: remarks || null,
   });

   res.status(201).json({
    message: 'Bill created successfully',
    data: newBill,
   });
  } catch (error) {
   res.status(500).json({ error: 'Failed to create bill' });
  }
 },

 updateBill: async (req, res) => {
  const { id } = req.params;
  const { serial_number, date, total_amount, status, remarks } = req.body;

  try {
   const updatedBill = await BillsModels.update(id, {
    serial_number,
    date,
    total_amount,
    status,
    remarks,
   });

   if (!updatedBill) {
    return res.status(404).json({ error: 'Bill not found' });
   }

   res.status(200).json({ message: 'Bill updated successfully', data: updatedBill });
  } catch (error) {
   res.status(500).json({ error: 'Failed to update bill' });
  }
 },

 deleteBill: async (req, res) => {
  const { id } = req.params;

  try {
   const deleted = await BillsModels.delete(id);
   if (!deleted) {
    return res.status(404).json({ error: 'Bill not found' });
   }
   res.status(200).json({ message: 'Bill deleted successfully' });
  } catch (error) {
   res.status(500).json({ error: 'Failed to delete bill' });
  }
 },
};

module.exports = BillsController;
