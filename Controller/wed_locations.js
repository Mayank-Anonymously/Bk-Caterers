const locationSchema = require("../Schemas/wed-location");
const mongoose = require("mongoose");
const crypto = require("crypto");

const id = crypto.randomBytes(12).toString("hex");
const AddNewLocation = async (req, res) => {
  const { placeName, placeAddress, placeState, placePincode, locationID } =
    req.body;
  const AddNewPlace = new locationSchema({
    locationID: id,
    placeName: placeName,
    placeAddress: placeAddress,
    placeState: placeState,
    placePincode: placePincode,
  });
  const ExistingPlace = await locationSchema.find({ placeName: placeName });
  console.log(ExistingPlace.length);
  if (ExistingPlace.length === 0) {
    await AddNewPlace.save();
    res.status(200).json({
      baseResponse: { status: 1, message: "Location added successfully" },
      response: AddNewPlace,
    });
  } else {
    res.status(200).json({
      baseResponse: { status: 1, message: "Already Exists" },
      response: [],
    });
  }
};
const GetAllLocations = async (req, res) => {
  const AddNewPlace = await locationSchema.find({});

  if (AddNewPlace) {
    res.status(200).json({
      baseResponse: { status: 1, message: "Fetched locations successfully" },
      response: AddNewPlace,
    });
  } else {
    res.status(500).json({
      baseResponse: { status: 1, message: "something went wrong" },
      response: [],
    });
  }
};
const GetAllLocationsById = async (req, res) => {
  const locationID = req.params.locationID;
  const AddNewPlace = await locationSchema.findOne({
    locationID: locationID,
  });

  if (AddNewPlace) {
    res.status(200).json({
      baseResponse: {
        status: 1,
        message: "Location Details fetched successfully",
      },
      response: AddNewPlace,
    });
  } else {
    res.status(500).json({
      baseResponse: { status: 1, message: "something went wrong" },
      response: [],
    });
  }
};
const UpdateLoction = async (req, res) => {
  const locationID = req.params.locationID;
  const { placeName, placeAddress, placeState, placePincode } = req.body;

  if (locationID) {
    await locationSchema.findOneAndUpdate(
      { _id: locationID },
      { $set: { placeName, placeAddress, placeState, placePincode } }
    );
    res.status(200).json({
      baseResponse: {
        status: 1,
        message: "Location Details updated successfully",
      },
      response: [],
    });
  } else {
    res.status(500).json({
      baseResponse: { status: 1, message: "please provide a location id" },
      response: [],
    });
  }
};
const DeleteLocation = async (req, res) => {
  const locationID = req.params.locationID;
  const AddNewPlace = await locationSchema.deleteOne({
    _id: locationID,
  });

  if (AddNewPlace.deletedCount !== 0) {
    res.status(200).json({
      baseResponse: {
        status: 1,
        message: "Location deleted successfully",
      },
      response: AddNewPlace,
    });
  } else {
    res.status(500).json({
      baseResponse: { status: 1, message: "something went wrong" },
      response: [],
    });
  }
};

module.exports = {
  AddNewLocation,
  GetAllLocations,
  GetAllLocationsById,
  UpdateLoction,
  DeleteLocation,
};
