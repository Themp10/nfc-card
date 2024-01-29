const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(__dirname)
    const parentFolder = path.resolve(__dirname, '..');
    cb(null, path.join(parentFolder, 'uploads'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname); 
  }
});
const uploadMiddleware = multer({ storage: storage });

module.exports = uploadMiddleware;