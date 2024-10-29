const VariantModel = require('../models/VariantModel');

const VariantController = {
 getAllVariants: (req, res) => {
  VariantModel.getAllVariants((err, variants) => {
   if (err) {
    return res.status(500).json({ error: 'Database error: ' + err.message });
   }
   res.status(200).json(variants);
  });
 },

 createVariant: (req, res) => {
  const variantData = {
   store_id: req.body.store_id,
   variant_code: req.body.variant_code,
   variant_name: req.body.variant_name,
   description: req.body.description,
   status: req.body.status,
  };

  VariantModel.createVariant(variantData, (err, result) => {
   if (err) {
    return res.status(500).json({ error: 'Error creating variant: ' + err.message });
   }
   res.status(201).json({ message: 'Variant created successfully', variantId: result.insertId });
  });
 },

 editVariant: (req, res) => {
  const variantId = req.params.id;
  const variantData = {
   store_id: req.body.store_id,
   variant_code: req.body.variant_code,
   variant_name: req.body.variant_name,
   description: req.body.description,
   status: req.body.status,
  };

  VariantModel.editVariant(variantId, variantData, (err) => {
   if (err) {
    return res.status(500).json({ error: 'Error updating variant: ' + err.message });
   }
   res.status(200).json({ message: 'Variant updated successfully' });
  });
 },
 deleteVariant: (req, res) => {
  const variantId = req.params.id;

  VariantModel.deleteVariant(variantId, (err) => {
   if (err) {
    return res.status(500).json({ error: 'Error deleting variant: ' + err.message });
   }
   res.status(200).json({ message: 'Variant deleted successfully' });
  });
 }
};

module.exports = VariantController;
