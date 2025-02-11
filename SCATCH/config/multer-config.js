const multer = require("multer");

// Set storage engine to memory storage
const storage = multer.memoryStorage();

// Initialize upload
const upload = multer({
  storage: storage,
});

module.exports = upload;
