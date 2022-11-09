const Services = require("../Schemas/facilities_services_schema");

const AddServices = async (req, res) => {
  const {
    id,
    serviceName,
    serviceDescription,
    subServices,
    serviceRating,
    servicePrice,
  } = req.body;
  const AddNewService = new Services({
    id,
    serviceName,
    serviceDescription,
    subServices,
    serviceRating,
    servicePrice,
  });
  try {
    const SaveNewService = await AddNewService.save();
    if (SaveNewService) {
      res.status(200).json({
        baseResponse: { status: 1, message: "Service added successfully" },
        response: [],
      });
    } else {
      res.status(500).json({
        baseResponse: { status: 0, message: "Something went wrong" },
        response: [],
      });
    }
  } catch (err) {
    res.status(500).json({
      baseResponse: { status: 0, message: err.message },
      response: [],
    });
  }
};
const GetAllServices = async (req, res) => {
  try {
    const AllServices = await Services.find({}, { _v: false });
    if (AllServices.length !== 0) {
      res.status(200).json({
        baseResponse: { status: 1, message: "Service fetched successfully" },
        response: AllServices,
      });
    } else {
      res.status(404).json({
        baseResponse: { status: 1, message: "No services found" },
        response: [],
      });
    }
  } catch (err) {
    res.status(500).json({
      baseResponse: { status: 1, message: err.message },
      response: [],
    });
  }
};
const updateServices = async (req, res) => {
  const serviceId = req.params.serviceId;
  const {
    serviceName,
    serviceDescription,
    subServices,
    serviceRating,
    servicePrice,
  } = req.body;

  const updateNewService = {
    serviceName,
    serviceDescription,
    subServices,
    serviceRating,
    servicePrice,
  };
  try {
    if (serviceId !== undefined || serviceId !== null || serviceId !== "") {
      await Services.findOoneAndUpdate(
        { id: serviceId },
        {
          $set: updateNewService,
        }
      );
      res.status(200).json({
        baseResponse: { status: 1, message: "Service fetched successfully" },
        response: [],
      });
    } else {
      res.status(404).json({
        baseResponse: { status: 1, message: "Unable to update" },
        response: [],
      });
    }
  } catch (err) {
    res.status(500).json({
      baseResponse: { status: 1, message: err.message },
      response: [],
    });
  }
};
const deleteService = async (req, res) => {
  const serviceId = req.params.serviceId;

  try {
    const DeletedService = await Services.deleteOne({ id: serviceId });

    if (DeletedService.length !== undefined) {
      res.status(200).json({
        baseResponse: {
          status: 1,
          message: "Service removed successfully fetched successfully",
        },
        response: [],
      });
    } else {
      res.status(500).json({
        baseResponse: { status: 1, message: "no services found or deleted" },
        response: [],
      });
    }
  } catch (error) {
    res.status(500).json({
      baseResponse: { status: 1, message: error.message },
      response: [],
    });
  }
};
module.exports = {
  AddServices,
  GetAllServices,
  updateServices,
  deleteService,
};
