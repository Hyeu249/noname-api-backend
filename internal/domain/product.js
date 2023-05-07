const dataTypes = require("@server/lib/dataTypes");

const Var = {
  MsgProductCreateSuccess: "Create product successfully.",
  MsgProductUpdateSuccess: "Update product successfully.",
  MsgProductGetListSuccess: "Get list successfully.",
  MsgProductDeleteSuccess: "Delete product successfully.",

  ProductIsNotFound: "Product is not found.",
};

const ProductCreateRequest = {
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
  product_type_id: {
    type: dataTypes.STRING,
    validate: ["required"],
  },
  x_size: {
    type: dataTypes.NUMBER,
    validate: ["required", "gte=1"],
  },
  y_size: {
    type: dataTypes.NUMBER,
    validate: ["required", "gte=1"],
  },
  cost: {
    type: dataTypes.NUMBER,
    validate: ["required", "gte=1"],
  },
  discount: {
    type: dataTypes.NUMBER,
    validate: [],
  },
  layout: {
    type: dataTypes.STRING,
    validate: ["required"],
  },
  colors: {
    type: dataTypes.ARRAY,
    validate: ["required"],
  },
};

const ProductUpdateRequest = {
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
  product_type_id: {
    type: dataTypes.STRING,
    validate: [],
  },
  x_size: {
    type: dataTypes.NUMBER,
    validate: [],
  },
  y_size: {
    type: dataTypes.NUMBER,
    validate: [],
  },
  cost: {
    type: dataTypes.NUMBER,
    validate: [],
  },
  discount: {
    type: dataTypes.NUMBER,
    validate: [],
  },
  layout: {
    type: dataTypes.STRING,
    validate: [],
  },
  colors: {
    type: dataTypes.ARRAY,
    validate: [],
  },
};

const ProductListRequest = {
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
  product_type_id: {
    type: dataTypes.STRING,
    validate: [],
  },
  x_size: {
    type: dataTypes.NUMBER,
    validate: [],
  },
  y_size: {
    type: dataTypes.NUMBER,
    validate: [],
  },
  cost: {
    type: dataTypes.NUMBER,
    validate: [],
  },
  discount: {
    type: dataTypes.NUMBER,
    validate: [],
  },
  layout: {
    type: dataTypes.STRING,
    validate: [],
  },
};

const ProductDeleteRequest = {
  id: { type: dataTypes.STRING, validate: ["required"] },
};

module.exports = { ...Var, ProductCreateRequest, ProductUpdateRequest, ProductListRequest, ProductDeleteRequest };
