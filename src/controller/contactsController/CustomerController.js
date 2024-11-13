const CustomerModel = require('../../models/contactsModels/CustomerModels');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const secretKey = 'yourSecretKey';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com', // Replace with your email
    pass: 'your-email-password', // Replace with your email password
  },
});

const CustomerController = {
  getAllCustomers: (req, res) => {
    CustomerModel.getAllCustomers((err, results) => {
      if (err) return res.status(500).json({ message: "Error retrieving customers", error: err });
      res.status(200).json(results);
    });
  },
  getCustomerById: (req, res) => {
    const { id } = req.params;

    CustomerModel.findCustomerById(id, (err, customer) => {
      if (err) return res.status(500).json({ message: "Error retrieving customer", error: err });
      if (!customer) return res.status(404).json({ message: "Customer not found" });

      res.status(200).json(customer);
    });
  },

  addCustomer: (req, res) => {
    const { email, password, ...customerData } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }
    CustomerModel.findCustomerByCode(email, (err, existingCustomer) => {
      if (err) return res.status(500).json({ message: "Error checking existing customer", error: err });
      if (existingCustomer) return res.status(409).json({ message: "Customer already registered" });
      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) return res.status(500).json({ message: "Error hashing password" });

        customerData.password = hashedPassword;
        customerData.email = email;

        CustomerModel.addCustomer(customerData, (err, result) => {
          if (err) return res.status(500).json({ message: "Error adding customer", error: err });
          res.status(201).json({ message: "Customer added successfully", customerId: result.insertId });
        });
      });
    });
  },

  loginCustomer: (req, res) => {
    const { usernameOrEmail, password } = req.body;

    if (!usernameOrEmail || !password) {
      return res.status(400).json({ message: "Username or email and password are required" });
    }

    CustomerModel.findCustomerByCode(usernameOrEmail, async (err, customer) => {
      if (err) return res.status(500).json({ message: "Error retrieving customer", error: err });
      if (!customer) return res.status(404).json({ message: "Customer not found" });

      const isMatch = await bcrypt.compare(password, customer.password);
      if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

      const token = jwt.sign({ id: customer.id, email: customer.email }, secretKey, { expiresIn: '1h' });
      res.status(200).json({ message: "Login successful", token });
    });
  },

  updateCustomer: (req, res) => {
    const customerData = { ...req.body, id: req.params.id };

    CustomerModel.updateCustomer(customerData, (err, result) => {
      if (err) return res.status(500).json({ message: "Error updating customer", error: err });
      if (result.affectedRows === 0) return res.status(404).json({ message: "Customer not found" });
      res.status(200).json({ message: "Customer updated successfully" });
    });
  },

  deleteCustomer: (req, res) => {
    const { id } = req.params;

    CustomerModel.deleteCustomer(id, (err, result) => {
      if (err) return res.status(500).json({ message: "Error deleting customer", error: err });
      res.status(200).json({ message: "Customer deleted successfully" });
    });
  },

  resetPassword: (req, res) => {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res.status(400).json({ message: "Email and new password are required" });
    }

    bcrypt.hash(newPassword, 10, (err, hashedPassword) => {
      if (err) return res.status(500).json({ message: "Error hashing password" });

      CustomerModel.updatePasswordByEmail(email, hashedPassword, (err, result) => {
        if (err) return res.status(500).json({ message: "Error resetting password", error: err });
        if (result.affectedRows === 0) return res.status(404).json({ message: "Customer not found" });
        res.status(200).json({ message: "Password reset successfully" });
      });
    });
  },

  getCustomerOrderHistory: (req, res) => {
    const { id } = req.params;

    CustomerModel.getCustomerOrderHistory(id, (err, results) => {
      if (err) return res.status(500).json({ message: "Error retrieving order history", error: err });

      const orderHistory = {};
      results.forEach(row => {
        const { order_id, order_date, status, product_id, quantity, price } = row;

        if (!orderHistory[order_id]) {
          orderHistory[order_id] = {
            order_id,
            order_date,
            status,
            items: []
          };
        }

        if (product_id) {
          orderHistory[order_id].items.push({ product_id, quantity, price });
        }
      });

      res.status(200).json(Object.values(orderHistory));
    });
  },
};

module.exports = CustomerController;
