// controller/CustomerController.js
const CustomerModel = require('../models/CustomerModels');

const CustomerController = {
  getAllCustomers: (req, res) => {
    CustomerModel.getAllCustomers((err, results) => {
      if (err) {
        return res.status(500).json({ message: "Error retrieving customers", error: err });
      }
      res.status(200).json(results);
    });
  },

  addCustomer: (req, res) => {
    const requiredFields = ['store_id', 'customer_code', 'customer_name', 'mobile'];
    for (let field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({ message: `${field} is required` });
      }
    }

    const customerCode = req.body.customer_code;
    const mobile = req.body.mobile;

    // Check if the customer already exists
    CustomerModel.findCustomer(customerCode, mobile, (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Error checking customer", error: err });
      }
      if (results.length > 0) {
        return res.status(400).json({ message: "Customer already exists" });
      }

      const customerData = {
        store_id: req.body.store_id,
        count_id: req.body.count_id,
        customer_code: req.body.customer_code,
        customer_name: req.body.customer_name,
        mobile: req.body.mobile,
        phone: req.body.phone,
        email: req.body.email,
        gstin: req.body.gstin,
        tax_number: req.body.tax_number,
        vatin: req.body.vatin,
        opening_balance: req.body.opening_balance,
        sales_due: req.body.sales_due,
        sales_return_due: req.body.sales_return_due,
        country_id: req.body.country_id,
        state_id: req.body.state_id,
        city: req.body.city,
        postcode: req.body.postcode,
        address: req.body.address,
        ship_country_id: req.body.ship_country_id,
        ship_state_id: req.body.ship_state_id,
        ship_city: req.body.ship_city,
        ship_postcode: req.body.ship_postcode,
        ship_address: req.body.ship_address,
        system_name: req.body.system_name,
        system_ip: req.body.system_ip,
        created_by: req.body.created_by,
        status: req.body.status
      };

      // Proceed to add customer
      CustomerModel.addCustomer(customerData, (err, result) => {
        if (err) {
          return res.status(500).json({ message: "Error adding customer", error: err });
        }
        res.status(201).json({ message: "Customer added successfully", customerId: result.insertId });
      });
    });
  },

  deleteCustomer: (req, res) => {
    const customerId = req.params.id;
    CustomerModel.deleteCustomer(customerId, (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Error deleting customer", error: err });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Customer not found" });
      }
      res.status(200).json({ message: "Customer deleted successfully" });
    });
  }
};

module.exports = CustomerController;
