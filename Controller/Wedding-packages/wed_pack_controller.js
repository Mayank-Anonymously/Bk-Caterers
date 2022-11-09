const Packages = require("../../Schemas/Wedding-packages/_addPackages");

const addNewPackage = async (req, res, cb) => {
  const { name, description, price } = req.body;
  const AddNewPackage = Packages({
    name,
    description,
    price,
  });
  try {
    const AlreadyExist = await Packages.findOne({
      name: name,
    });
    const AddPack = AddNewPackage.save();

    if (AlreadyExist) {
      res.status(200).json({
        baseResponse: {
          status: 1,
          message: "Already Exists",
        },
      });
    } else if (AddPack) {
      res.status(200).json({
        baseResponse: {
          status: 1,
          message: "Sucessfully added product",
        },
      });
    }
  } catch (err) {
    res.status(200).json({
      baseResponse: {
        status: 0,
        message: err.message,
      },
    });
  }
};
const GetallPackages = async (req, res, cb) => {
  const { name, description, price } = req.body;

  try {
    const GetAllPack = await Packages.find({});
    if (GetAllPack) {
      res.status(200).json({
        baseResponse: {
          status: 1,
          message: "Successfully got all packages",
        },
        response: GetAllPack,
      });
    }
  } catch (err) {
    res.status(200).json({
      baseResponse: {
        status: 0,
        message: err.message,
      },
    });
  }
};
const DeletePackByPackID = async (req, res, cb) => {
  const { name, description, price } = req.body;

  try {
    const DeletedPack = await Packages.deleteOne({
      name: name,
    });
    console.log(DeletedPack.deletedCount);
    if (DeletedPack.deletedCount === 1) {
      res.status(200).json({
        baseResponse: {
          status: 1,
          message: "deleted Succesfully",
        },
      });
    } else {
      res.status(404).json({
        baseResponse: {
          status: 0,
          message: "some error occured",
        },
      });
    }
  } catch (err) {
    res.status(200).json({
      baseResponse: {
        status: 0,
        message: err.message,
      },
    });
  }
};

module.exports = {
  addNewPackage,
  GetallPackages,
  DeletePackByPackID,
};
