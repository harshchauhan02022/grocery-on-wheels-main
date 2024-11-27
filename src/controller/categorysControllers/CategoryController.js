const CategoryModel = require('../../models/categorysModels/CategoryModels');

const CategoryController = {
 getAllCategories: (req, res) => {
  CategoryModel.getAllCategories((err, categories) => {
   if (err) {
    return res.status(500).json({ error: 'Database error: ' + err.message });
   }
   res.status(200).json(categories);
  });
 },

 createCategory: (req, res) => {
  const categoryData = {
   store_id: req.body.store_id,
   count_id: req.body.count_id,
   category_code: req.body.category_code,
   category_name: req.body.category_name,
   description: req.body.description,
   company_id: req.body.company_id,
   status: req.body.status
  };

  CategoryModel.createCategory(categoryData, (err, result) => {
   if (err) {
    return res.status(500).json({ error: 'Error creating category: ' + err.message });
   }
   res.status(201).json({ message: 'Category created successfully', categoryId: result.insertId });
  });
 },

 updateCategory: (req, res) => {
  const categoryData = {
   store_id: req.body.store_id,
   count_id: req.body.count_id,
   category_code: req.body.category_code,
   category_name: req.body.category_name,
   description: req.body.description,
   company_id: req.body.company_id,
   status: req.body.status
  };

  CategoryModel.updateCategory(req.params.id, categoryData, (err, result) => {
   if (err) {
    return res.status(500).json({ error: 'Error updating category: ' + err.message });
   }
   res.status(200).json({ message: 'Category updated successfully' });
  });
 },

 deleteCategory: (req, res) => {
  CategoryModel.deleteCategory(req.params.id, (err, result) => {
   if (err) {
    return res.status(500).json({ error: 'Error deleting category: ' + err.message });
   }
   res.status(200).json({ message: 'Category deleted successfully' });
  });
 }
};

module.exports = CategoryController;
