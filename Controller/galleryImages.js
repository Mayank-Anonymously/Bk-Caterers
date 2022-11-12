const gallerySchema = require("../Schemas/galleryImages");
const crypto = require("crypto");

// const id = crypto.randomBytes(12).toString("hex");
const AddImages = async (req, res) => {
  const ImageName = req.file.filename;
  const { imageName } = req.body;
  const SaveImageSchema = new gallerySchema({
    imageName: imageName,
    image: ImageName,
  });
  const addtodatabase = await SaveImageSchema.save();
  if (addtodatabase) {
    res.status(200).json({
      baseResponse: { status: 1, message: "Images saved successfully" },
    });
  } else {
    res.status(200).json({
      baseResponse: { status: 1, message: "Images saved successfully" },
    });
  }
};
const GetAllImages = async (req, res) => {
  const addtodatabase = await gallerySchema.find({});
  if (addtodatabase.length !== 0) {
    res.status(200).json({
      baseResponse: { status: 1, message: "Images fetched successfully" },
      response: addtodatabase,
    });
  } else {
    res.status(200).json({
      baseResponse: { status: 1, message: "No images found" },
    });
  }
};
const GetAllImagesById = async (req, res) => {
  const { ImageId } = req.params;

  const addtodatabase = await gallerySchema.findOne({ imageId: ImageId });
  if (addtodatabase.length !== 0) {
    res.status(200).json({
      baseResponse: { status: 1, message: "Image fetched successfully" },
      response: addtodatabase,
    });
  } else {
    res.status(200).json({
      baseResponse: { status: 1, message: "no image found" },
    });
  }
};
const DeleteImagesById = async (req, res) => {
  const { ImageId } = req.params;

  const addtodatabase = await gallerySchema.deleteOne({ imageId: ImageId });
  if (addtodatabase.deletedCount !== 0) {
    res.status(200).json({
      baseResponse: { status: 1, message: "Image deleted successfully" },
      response: addtodatabase,
    });
  } else {
    res.status(200).json({
      baseResponse: {
        status: 1,
        message: "No image deleted or no image for this image id",
      },
    });
  }
};

module.exports = {
  AddImages,
  GetAllImages,
  GetAllImagesById,
  DeleteImagesById,
};
