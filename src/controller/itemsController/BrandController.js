const BrandModel = require('../../models/itemsModels/BrandModels');

const BrandController = {
 getAllBrands: (req, res) => {
  BrandModel.getAllBrands((err, brands) => {
   if (err) {
    return res.status(500).json({ error: 'Database error: ' + err.message });
   }
   res.status(200).json(brands);
  });
 },
 createBrand: (req, res) => {
  const brandData = {
   store_id: req.body.store_id,
   brand_code: req.body.brand_code,
   brand_name: req.body.brand_name,
   description: req.body.description,
   status: req.body.status
  };

  BrandModel.createBrand(brandData, (err, result) => {
   if (err) {
    return res.status(500).json({ error: 'Error creating brand: ' + err.message });
   }
   res.status(201).json({ message: 'Brand created successfully', brandId: result.insertId });
  });
 },
 updateBrand: (req, res) => {
  const id = req.params.id;
  const brandData = {
   store_id: req.body.store_id,
   brand_code: req.body.brand_code,
   brand_name: req.body.brand_name,
   description: req.body.description,
   status: req.body.status
  };

  BrandModel.updateBrand(id, brandData, (err) => {
   if (err) {
    return res.status(500).json({ error: 'Error updating brand: ' + err.message });
   }
   res.status(200).json({ message: 'Brand updated successfully' });
  });
 },
 deleteBrand: (req, res) => {
  const id = req.params.id;

  BrandModel.deleteBrand(id, (err) => {
   if (err) {
    return res.status(500).json({ error: 'Error deleting brand: ' + err.message });
   }
   res.status(200).json({ message: 'Brand deleted successfully' });
  });
 }
};

module.exports = BrandController;
