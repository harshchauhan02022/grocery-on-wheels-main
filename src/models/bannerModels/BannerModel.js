const db = require('../../config/db');

const BannerModel = {
 getAllBanners: (callback) => {
  const query = `SELECT * FROM db_banners`;
  db.query(query, callback);
 },

 getBannerById: (id, callback) => {
  const query = `SELECT * FROM db_banners WHERE id = ?`;
  db.query(query, [id], callback);
 },

 createBanner: (data, callback) => {
  const query = `
      INSERT INTO db_banners (name, description, type, bannerItem, start_date, end_date, image, isActive, offer)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
  db.query(
   query,
   [data.name, data.description, data.type, data.bannerItem, data.startDate, data.endDate, data.image, data.isActive, data.offer],
   callback
  );
 },
 createMultipleBanners: (bannersData, callback) => {
  const query = `
    INSERT INTO db_banners (name, description, type, bannerItem, start_date, end_date, image, isActive, offer)
    VALUES ?
  `;
  db.query(query, [bannersData], (err, results) => {
   if (err) {
    console.error('Database error during multiple banner insertion:', err.message);
    return callback(err, null);
   }
   callback(null, results);
  });
 },
 updateBanner: (id, data, callback) => {
  const query = `
      UPDATE db_banners 
      SET name = ?, description = ?, type = ?, bannerItem = ?, start_date = ?, end_date = ?, image = ?, isActive = ?, offer = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;
  db.query(
   query,
   [data.name, data.description, data.type, data.bannerItem, data.startDate, data.endDate, data.image, data.isActive, data.offer, id],
   callback
  );
 },

 deleteBanner: (id, callback) => {
  const query = `DELETE FROM db_banners WHERE id = ?`;
  db.query(query, [id], callback);
 },

 createMultipleBanners: (data, callback) => {
  const query = `
    INSERT INTO db_banners (name, description, type, bannerItem, start_date, end_date, image, isActive, offer)
    VALUES ?
  `;

  db.query(query, [data], callback);
 }

};

module.exports = BannerModel;
