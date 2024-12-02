const BannerModel = require('../../models/bannerModels/BannerModel');

const BannerController = {
 getAllBanners: (req, res) => {
  BannerModel.getAllBanners((err, results) => {
   if (err) {
    console.error('Error fetching banners:', err);
    return res.status(500).json({ error: 'Internal server error' });
   }
   res.status(200).json(results);
  });
 },

 getBannerById: (req, res) => {
  const { id } = req.params;
  BannerModel.getBannerById(id, (err, results) => {
   if (err) {
    console.error('Error fetching banner by ID:', err);
    return res.status(500).json({ error: 'Internal server error' });
   }
   if (results.length === 0) {
    return res.status(404).json({ error: 'Banner not found' });
   }
   res.status(200).json(results[0]);
  });
 },

 createBanner: (req, res) => {
  const { name, description, type, bannerItem, startDate, endDate, image, isActive, offer } = req.body;

  if (!name || !description || !type || !bannerItem || !startDate || !endDate || !image) {
   return res.status(400).json({ error: 'All required fields must be provided' });
  }

  const data = { name, description, type, bannerItem, startDate, endDate, image, isActive, offer };
  BannerModel.createBanner(data, (err, results) => {
   if (err) {
    console.error('Error creating banner:', err);
    return res.status(500).json({ error: 'Internal server error' });
   }
   res.status(201).json({ message: 'Banner created successfully', bannerId: results.insertId });
  });
 },

 createMultipleBanners: (req, res) => {
  const banners = req.body;

  if (!Array.isArray(banners) || banners.length === 0) {
   return res.status(400).json({ error: 'Request body must be a non-empty array of banners' });
  }
  const errors = [];
  const dataToInsert = banners.map((banner, index) => {
   const { name, description, type, bannerItem, startDate, endDate, image, isActive, offer } = banner;

   if (!name || !description || !type || !bannerItem || !startDate || !endDate || !image) {
    errors.push(`Missing required fields for banner at index ${index}`);
   }

   return [name, description, type, bannerItem, startDate, endDate, image, isActive ?? true, offer ?? 0];
  });

  if (errors.length > 0) {
   return res.status(400).json({ errors });
  }
  BannerModel.createMultipleBanners(dataToInsert, (err, results) => {
   if (err) {
    console.error('Error creating banners:', err);
    return res.status(500).json({ error: 'Internal server error' });
   }
   res.status(201).json({ message: 'Banners created successfully', insertedRows: results.affectedRows });
  });
 },
 updateBanner: (req, res) => {
  const { id } = req.params;
  const { name, description, type, bannerItem, startDate, endDate, image, isActive, offer } = req.body;

  const data = { name, description, type, bannerItem, startDate, endDate, image, isActive, offer };
  BannerModel.updateBanner(id, data, (err, results) => {
   if (err) {
    console.error('Error updating banner:', err);
    return res.status(500).json({ error: 'Internal server error' });
   }
   if (results.affectedRows === 0) {
    return res.status(404).json({ error: 'Banner not found' });
   }
   res.status(200).json({ message: 'Banner updated successfully' });
  });
 },
 deleteBanner: (req, res) => {
  const { id } = req.params;

  // Validate the ID
  if (!id || isNaN(id)) {
    return res.status(400).json({ error: 'Invalid banner ID' });
  }

  // Call the model function to delete the banner
  BannerModel.deleteBanner(id, (err, results) => {
    if (err) {
      console.error('Error deleting banner:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Banner not found' });
    }

    res.status(200).json({ message: 'Banner deleted successfully' });
  });
},

 createMultipleBanners: (req, res) => {
  const banners = req.body;

  // Validate if the request body is a non-empty array
  if (!Array.isArray(banners) || banners.length === 0) {
   return res.status(400).json({ error: 'Request body must be a non-empty array of banners' });
  }

  const errors = [];
  const dataToInsert = banners.map((banner, index) => {
   const { name, description, type, bannerItem, startDate, endDate, image, isActive, offer } = banner;

   // Validate required fields for each banner
   if (!name || !description || !type || !bannerItem || !startDate || !endDate || !image) {
    errors.push(`Missing required fields for banner at index ${index}`);
    return null; // Ensure no undefined values are added to the array
   }

   return [
    name,
    description,
    type,
    bannerItem,
    startDate,
    endDate,
    image,
    isActive ?? true, // Default to true if not provided
    offer ?? 0        // Default to 0 if not provided
   ];
  });

  // If errors exist, respond with the errors
  if (errors.length > 0) {
   return res.status(400).json({ errors });
  }

  // Filter out any `null` values from the dataToInsert array
  const filteredDataToInsert = dataToInsert.filter(Boolean);

  // Insert the data into the database
  BannerModel.createMultipleBanners(filteredDataToInsert, (err, results) => {
   if (err) {
    console.error('Error creating banners:', err);
    return res.status(500).json({ error: 'Internal server error' });
   }

   res.status(201).json({
    message: 'Banners created successfully',
    insertedRows: results.affectedRows
   });
  });
 }

};

module.exports = BannerController;
