const express = require("express");
const router = express.Router();
const {
  addNewPackage,
  GetallPackages,
  DeletePackByPackID,
} = require("../Controller/Wedding-packages/wed_pack_controller");
const upload = require("../multer/Wed_pack_images/image_multer");
const validator = require("../Validator/WedPackagesValidation");
router.post("/Addpackages", validator, upload, addNewPackage);
router.get("/GetAllWeddingPackages", GetallPackages);
router.put("/RemoveWeddingPackage", DeletePackByPackID);

module.exports = router;
