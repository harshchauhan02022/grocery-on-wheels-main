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
  res.status(500).json({ error: 'item not available' });
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




getAll: () => {
 return new Promise((resolve, reject) => {
   db.query('SELECT * FROM db_bills', (err, results) => {
     if (err) {
       return reject(err);
     }
     resolve(results);
   });
 });
},

getById: (id) => {
 return new Promise((resolve, reject) => {
   const query = 'SELECT * FROM db_bills WHERE id = ?';
   db.query(query, [id], (err, results) => {
     if (err) {
       return reject(err);
     }
     resolve(results[0]);
   });
 });
},

create: (billData) => {
 return new Promise((resolve, reject) => {
   const query = `
     INSERT INTO db_bills (serial_number, date, total_amount, status, remarks)
     VALUES (?, ?, ?, ?, ?)
   `;
   const { serial_number, date, total_amount, status, remarks } = billData;
   db.query(query, [serial_number, date, total_amount, status, remarks], (err, results) => {
     if (err) {
       return reject(err);
     }
     resolve({ id: results.insertId, ...billData });
   });
 });
},

update: (id, billData) => {
 return new Promise((resolve, reject) => {
   const query = `
     UPDATE db_bills
     SET serial_number = ?, date = ?, total_amount = ?, status = ?, remarks = ?
     WHERE id = ?
   `;
   const { serial_number, date, total_amount, status, remarks } = billData;
   db.query(query, [serial_number, date, total_amount, status, remarks, id], (err, results) => {
     if (err) {
       return reject(err);
     }
     resolve(results.affectedRows > 0 ? { id, ...billData } : null);
   });
 });
},

delete: (id) => {
 return new Promise((resolve, reject) => {
   const query = 'DELETE FROM db_bills WHERE id = ?';
   db.query(query, [id], (err, results) => {
     if (err) {
       return reject(err);
     }
     resolve(results.affectedRows > 0);
   });
 });
},



router.get('/', BillsController.getAllBills);
router.get('/:id', BillsController.getBillById);
router.post('/create', BillsController.createBill);
router.put('/update/:id', BillsController.updateBill);
router.delete('/delete/:id', BillsController.deleteBill);