const dataTypes = require("@server/lib/dataTypes");

const Var = {
  MsgProductTypeCreateSuccess: "Create product type successfully.",
  MsgProductTypeUpdateSuccess: "Update product type successfully.",
  MsgProductTypeGetListSuccess: "Download get list successfully.",
  MsgProductTypeDeleteSuccess: "Delete product type successfully.",

  ProductTypeIsNotFound: "Product type is not found.",
};

const ProductTypeCreateRequest = {
  name: {
    type: dataTypes.STRING,
    validate: ["required"],
  },
  description: {
    type: dataTypes.STRING,
    validate: [],
  },
  image_id: {
    type: dataTypes.STRING,
    validate: ["required"],
  },
};

const ProductTypeUpdateRequest = {
  name: {
    type: dataTypes.STRING,
    validate: [],
  },
  description: {
    type: dataTypes.STRING,
    validate: [],
  },
  image_id: {
    type: dataTypes.STRING,
    validate: [],
  },
};

const ProductTypeListRequest = {
  id: {
    type: dataTypes.STRING,
    validate: [],
  },
  offset: {
    type: dataTypes.STRING,
    validate: [],
  },
  limit: {
    type: dataTypes.STRING,
    validate: [],
  },
  name: {
    type: dataTypes.STRING,
    validate: [],
  },
  description: {
    type: dataTypes.STRING,
    validate: [],
  },
  image_id: {
    type: dataTypes.STRING,
    validate: [],
  },
};

const ProductTypeDeleteRequest = {
  id: { type: dataTypes.STRING, validate: ["required"] },
};

module.exports = { ...Var, ProductTypeCreateRequest, ProductTypeUpdateRequest, ProductTypeListRequest, ProductTypeDeleteRequest };
