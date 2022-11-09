const multer = require("multer");
var { existsSync, mkdirSync } = require("fs");
var dir = "./tmp";

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "images/");
  },
  filename: function (req, file, callback) {
    console.log(file);
    callback(null, file.originalname);
  },
});

const upload = multer({ storage: storage, dest: "images/" }).single("image");
module.exports = upload;
