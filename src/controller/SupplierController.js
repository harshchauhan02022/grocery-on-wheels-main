const SupplierModel = require('../models/SupplierModels');

const SupplierController = {
 getSuppliers: (req, res) => {
  SupplierModel.getAllSuppliers((err, results) => {
   if (err) {
    return res.status(500).json({ message: "Error retrieving suppliers", error: err });
   }
   res.status(200).json(results);
  });
 },

 addSupplier: (req, res) => {
  const requiredFields = ['store_id', 'supplier_code', 'supplier_name', 'mobile'];
  for (let field of requiredFields) {
   if (!req.body[field]) {
    return res.status(400).json({ message: `${field} is required` });
   }
  }

  const { supplier_code, mobile } = req.body;

  // Check if the supplier already exists
  SupplierModel.findSupplier(supplier_code, mobile, (err, results) => {
   if (err) {
    return res.status(500).json({ message: "Error checking supplier", error: err });
   }
   if (results.length > 0) {
    return res.status(400).json({ message: "Supplier already exists" });
   }

   const supplierData = {
    store_id: req.body.store_id,
    count_id: req.body.count_id,
    supplier_code,
    supplier_name: req.body.supplier_name,
    mobile,
    phone: req.body.phone,
    email: req.body.email,
    gstin: req.body.gstin,
    tax_number: req.body.tax_number,
    vatin: req.body.vatin,
    opening_balance: req.body.opening_balance,
    purchase_due: req.body.purchase_due,
    purchase_return_due: req.body.purchase_return_due,
    country_id: req.body.country_id,
    state_id: req.body.state_id,
    city: req.body.city,
    postcode: req.body.postcode,
    address: req.body.address,
    system_ip: req.body.system_ip,
    system_name: req.body.system_name,
    created_date: req.body.created_date,
    created_time: req.body.created_time,
    created_by: req.body.created_by,
    company_id: req.body.company_id,
    status: req.body.status
   };

   // Proceed to add supplier
   SupplierModel.addSupplier(supplierData, (err, result) => {
    if (err) {
     return res.status(500).json({ message: "Error adding supplier", error: err });
    }
    res.status(201).json({ message: "Supplier added successfully", supplierId: result.insertId });
   });
  });
 },

 deleteSupplier: (req, res) => {
  const supplierId = req.params.id;
  SupplierModel.deleteSupplier(supplierId, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error deleting supplier", error: err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Supplier not found" });
    }
    res.status(200).json({ message: "Supplier deleted successfully" });
  });
}
};

module.exports = SupplierController;
