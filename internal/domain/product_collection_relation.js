const dataTypes = require("@server/lib/dataTypes");

const Var = {
  MsgProductCollectionRelationCreateSuccess: "Create product collection relation successfully.",
  MsgProductCollectionRelationUpdateSuccess: "Update product collection relation successfully.",
  MsgProductCollectionRelationGetListSuccess: "Get list successfully.",
  MsgProductCollectionRelationDeleteSuccess: "Delete product collection relation successfully.",

  ProductCollectionRelationIsNotFound: "Product collection relation is not found.",
};

const ProductCollectionRelationCreateRequest = {
  product_id: {
    type: dataTypes.STRING,
    validate: ["required"],
  },
  collection_id: {
    type: dataTypes.STRING,
    validate: ["required"],
  },
};

const ProductCollectionRelationUpdateRequest = {
  product_id: {
    type: dataTypes.STRING,
    validate: [],
  },
  collection_id: {
    type: dataTypes.STRING,
    validate: [],
  },
};

const ProductCollectionRelationListRequest = {
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
  product_id: {
    type: dataTypes.STRING,
    validate: [],
  },
  collection_id: {
    type: dataTypes.STRING,
    validate: [],
  },
};

const ProductCollectionRelationDeleteRequest = {
  id: { type: dataTypes.STRING, validate: ["required"] },
};

module.exports = {
  ...Var,
  ProductCollectionRelationCreateRequest,
  ProductCollectionRelationUpdateRequest,
  ProductCollectionRelationListRequest,
  ProductCollectionRelationDeleteRequest,
};
