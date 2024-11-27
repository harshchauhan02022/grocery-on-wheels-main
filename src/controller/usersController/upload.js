const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
 destination: (req, file, cb) => {
  const uploadDir = path.join(__dirname, "../../../public/uploads");
  if (!fs.existsSync(uploadDir)) {
   fs.mkdirSync(uploadDir, { recursive: true });
  }
  cb(null, uploadDir);
 },
 filename: (req, file, cb) => {
  const fileName = `${Date.now()}_${file.originalname}`;
  cb(null, fileName);
 },
});

const upload = multer({
 storage,
 fileFilter: (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = allowedTypes.test(file.mimetype);
  if (extName && mimeType) {
   cb(null, true);
  } else {
   cb(new Error("Only images (jpeg, jpg, png) are allowed"));
  }
 },
});

module.exports = upload;
