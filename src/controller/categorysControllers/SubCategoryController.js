const SubCategoryModel = require('../../models/categorysModels/SubCategoryModels');

const SubCategoryController = {
 getAllCategories: (req, res) => {
  SubCategoryModel.getAllCategories((err, results) => {
   if (err) return res.status(500).json({ error: err.message });
   res.status(200).json(results);
  });
 },

 createCategory: (req, res) => {
  const data = req.body;
  SubCategoryModel.createCategory(data, (err, results) => {
   if (err) return res.status(500).json({ error: err.message });
   res.status(201).json({ message: 'Category created successfully', id: results.insertId });
  });
 },

 updateCategory: (req, res) => {
  const id = req.params.id;
  const data = req.body;
  SubCategoryModel.updateCategory(id, data, (err, results) => {
   if (err) return res.status(500).json({ error: err.message });
   res.status(200).json({ message: 'Category updated successfully' });
  });
 },

 deleteCategory: (req, res) => {
  const id = req.params.id;
  SubCategoryModel.deleteCategory(id, (err, results) => {
   if (err) return res.status(500).json({ error: err.message });
   res.status(200).json({ message: 'Category deleted successfully' });
  });
 },
};

module.exports = SubCategoryController;
