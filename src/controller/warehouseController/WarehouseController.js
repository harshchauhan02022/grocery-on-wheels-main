const WarehouseModel = require('../../models/warehouseModel/WarehouseModels');

const warehouseController = {
 getAllWarehouses: (req, res) => {
  WarehouseModel.getAllWarehouses((err, results) => {
   if (err) return res.status(500).json({ message: "Error retrieving warehouses", error: err });
   res.status(200).json(results);
  });
 },

 getWarehouseById: (req, res) => {
  const { id } = req.params;
  WarehouseModel.getWarehouseById(id, (err, result) => {
   if (err) return res.status(500).json({ message: "Error retrieving warehouse", error: err });
   if (!result.length) return res.status(404).json({ message: "Warehouse not found" });
   res.status(200).json(result[0]);
  });
 },

 addWarehouse: (req, res) => {
  const { email, mobile, ...warehouseData } = req.body;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
   return res.status(400).json({ message: "Invalid email format" });
  }

  const mobileRegex = /^\d{10}$/;
  if (mobile && !mobileRegex.test(mobile)) {
   return res.status(400).json({ message: "Invalid mobile number format" });
  }

  WarehouseModel.addWarehouse({ email, mobile, ...warehouseData }, (err, result) => {
   if (err) return res.status(500).json({ message: "Error adding warehouse", error: err });
   res.status(201).json({ message: "Warehouse added successfully", warehouseId: result.insertId });
  });
 },

 updateWarehouse: (req, res) => {
  const { id } = req.params;
  const warehouseData = req.body;

  WarehouseModel.updateWarehouse(id, warehouseData, (err, result) => {
   if (err) return res.status(500).json({ message: "Error updating warehouse", error: err });
   res.status(200).json({ message: "Warehouse updated successfully" });
  });
 },

 deleteWarehouse: (req, res) => {
  const { id } = req.params;
  WarehouseModel.deleteWarehouse(id, (err, result) => {
   if (err) return res.status(500).json({ message: "Error deleting warehouse", error: err });
   res.status(200).json({ message: "Warehouse deleted successfully" });
  });
 }
};

module.exports = warehouseController;
