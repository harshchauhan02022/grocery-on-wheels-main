const VanBookingModel = require('../models/VanBookingModels');

const VanBookingController = {
 getAllUsers: (req, res) => {
  VanBookingModel.getAllUsers((err, result) => {
   if (err) {
    return res.status(500).json({ error: "Internal server error" });
   }
   return res.status(200).json({ userlist: result });
  });
 },

 bookVan: (req, res) => {
  const bookingData = req.body;
  VanBookingModel.bookVan(bookingData, (err, result) => {
   if (err) {
    return res.status(500).json({ error: "Error booking van" });
   }
   return res.status(201).json({ message: "Van booked successfully", bookingId: result.insertId });
  });
 },

 cancelVanBooking: (req, res) => {
  const bookingId = req.params.id;
  VanBookingModel.cancelVanBooking(bookingId, (err, result) => {
   if (err) {
    return res.status(500).json({ error: "Error cancelling booking" });
   }
   if (result.affectedRows === 0) {
    return res.status(404).json({ message: "Booking not found" });
   }
   return res.status(200).json({ message: "Booking cancelled successfully" });
  });
 },

 getVanBookingDetails: (req, res) => {
  const bookingId = req.params.id;
  VanBookingModel.getVanBookingDetails(bookingId, (err, result) => {
   if (err) {
    return res.status(500).json({ error: "Error retrieving booking details" });
   }
   if (result.length === 0) {
    return res.status(404).json({ message: "Booking not found" });
   }
   return res.status(200).json({ bookingDetails: result });
  });
 },

 registerVan: (req, res) => {
  const vanData = req.body;
  VanBookingModel.registerVan(vanData, (err, result) => {
   if (err) {
    return res.status(500).json({ error: "Error registering van" });
   }
   return res.status(201).json({ message: "Van registered successfully", vanId: result.insertId });
  });
 }
};

module.exports = VanBookingController;
