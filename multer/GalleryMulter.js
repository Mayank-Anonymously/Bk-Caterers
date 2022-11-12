const multer = require("multer");
var { existsSync, mkdirSync } = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "images/Gallery");
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

const uploadToGallery = multer({
  storage: storage,
  dest: "images/Gallery",
}).single("image");
module.exports = uploadToGallery;
