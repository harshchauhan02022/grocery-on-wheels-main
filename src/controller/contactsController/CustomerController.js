const CustomerModel = require('../../models/contactsModels/CustomerModels');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = 'yourSecretKey';

const CustomerController = {
  getAllCustomers: (req, res) => {
    CustomerModel.getAllCustomers((err, results) => {
      if (err) return res.status(500).json({ message: "Error retrieving customers", error: err });
      res.status(200).json(results);
    });
  },
  addCustomer: (req, res) => {
    const { email, password, ...customerData } = req.body;

    // Check if email is in a valid format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    // Check if the customer already exists by email or customer code
    CustomerModel.findCustomerByCode(email, (err, existingCustomer) => {
      if (err) return res.status(500).json({ message: "Error checking existing customer", error: err });
      if (existingCustomer) return res.status(409).json({ message: "Customer already registered" });

      // Hash the password
      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) return res.status(500).json({ message: "Error hashing password" });

        // Add hashed password to customer data
        customerData.password = hashedPassword;
        customerData.email = email;

        // Register the new customer
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

    // Find customer by customer_code, customer_name, or email
    CustomerModel.findCustomerByCode(usernameOrEmail, async (err, customer) => {
      if (err) return res.status(500).json({ message: "Error retrieving customer", error: err });
      if (!customer) return res.status(404).json({ message: "Customer not found" });

      // Check if password is set and compare provided password with hashed password
      const isMatch = await bcrypt.compare(password, customer.password);
      if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

      // Generate and send token
      const token = jwt.sign({ id: customer.id, usernameOrEmail: customer.customer_code }, secretKey, { expiresIn: '1h' });
      res.status(200).json({ message: "Login successful", token });
    });
  },

  updateCustomer: (req, res) => {
    const customerData = { ...req.body, id: req.params.id };
    CustomerModel.updateCustomer(customerData, (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Error updating customer", error: err });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Customer not found" });
      }
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
      res.status(200).json(results);
    });
  }
};

module.exports = CustomerController;
