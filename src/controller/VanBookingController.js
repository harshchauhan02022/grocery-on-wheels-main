const VanBookingModel = require('../models/VanBookingModels');   

const VanBookingController = {
 getAllUsers: (req, res) => {
  VanBookingModel.getAllUsers((err, result) => {
   if (err) {
    return res.status(500).json({ error: "Internal server error" });
   }
   return res.status(200).json({ userlist: result });
  });
 }
};

module.exports = VanBookingController;
