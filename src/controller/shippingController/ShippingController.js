const ShippingModel = require('../../models/shippingModels/ShippingModels');

const ShippingController = {
 createShippingAddress: (req, res) => {
  const shippingData = req.body;
  ShippingModel.create(shippingData, (err, result) => {
   if (err) {
    return res.status(500).json({ message: "Error adding shipping address", error: err });
   }
   res.status(201).json({ message: "Shipping address created successfully", data: result });
  });
 },

 getAllShippingAddresses: (req, res) => {
  ShippingModel.getAll((err, results) => {
   if (err) {
    return res.status(500).json({ message: "Error retrieving shipping addresses", error: err });
   }
   res.status(200).json({ data: results });
  });
 },

 getShippingAddressById: (req, res) => {
  const id = req.params.id;
  ShippingModel.getById(id, (err, result) => {
   if (err) {
    return res.status(500).json({ message: "Error retrieving shipping address", error: err });
   }
   if (result.length === 0) {
    return res.status(404).json({ message: "Shipping address not found" });
   }
   res.status(200).json({ data: result[0] });
  });
 },

 updateShippingAddress: (req, res) => {
  const id = req.params.id;
  const shippingData = req.body;
  ShippingModel.update(id, shippingData, (err, result) => {
   if (err) {
    return res.status(500).json({ message: "Error updating shipping address", error: err });
   }
   res.status(200).json({ message: "Shipping address updated successfully" });
  });
 },

 deleteShippingAddress: (req, res) => {
  const id = req.params.id;
  ShippingModel.delete(id, (err, result) => {
   if (err) {
    return res.status(500).json({ message: "Error deleting shipping address", error: err });
   }
   res.status(200).json({ message: "Shipping address deleted successfully" });
  });
 }
};

module.exports = ShippingController;
