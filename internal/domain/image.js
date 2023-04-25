const dataTypes = require("@server/lib/dataTypes");

const Var = {
  MsgImageUploadSuccess: "Upload image successfully.",
  MsgImageDownloadSuccess: "Download image successfully.",
  MsgImageDeleteSuccess: "Delete image successfully.",

  ImageLocationIsNotFound: "Image location is not found.",
  ImageIsNotFound: "Image is not found.",
};

const ImageUploadRequest = {
  name: {
    type: dataTypes.STRING,
    validate: ["required"],
  },

  description: {
    type: dataTypes.STRING,
    validate: [],
  },
  file_extention: {
    type: dataTypes.STRING,
    validate: ["required"],
  },
  location: {
    type: dataTypes.STRING,
    validate: ["required"],
  },
};

const ImageDownloadRequest = {
  id: { type: dataTypes.STRING, validate: ["required"] },
};

const ImageDeleteRequest = {
  id: { type: dataTypes.STRING, validate: ["required"] },
};

module.exports = { ...Var, ImageUploadRequest, ImageDownloadRequest, ImageDeleteRequest };
