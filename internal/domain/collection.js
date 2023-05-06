const dataTypes = require("@server/lib/dataTypes");

const Var = {
  MsgCollectionCreateSuccess: "Create collection successfully.",
  MsgCollectionUpdateSuccess: "Update collection successfully.",
  MsgCollectionGetListSuccess: "Get list successfully.",
  MsgCollectionDeleteSuccess: "Delete collection successfully.",

  CollectionIsNotFound: "Collection is not found.",
};

const CollectionCreateRequest = {
  name: {
    type: dataTypes.STRING,
    validate: ["required"],
  },
};

const CollectionUpdateRequest = {
  name: {
    type: dataTypes.STRING,
    validate: [],
  },
};

const CollectionListRequest = {
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
};

const CollectionDeleteRequest = {
  id: { type: dataTypes.STRING, validate: ["required"] },
};

module.exports = { ...Var, CollectionCreateRequest, CollectionUpdateRequest, CollectionListRequest, CollectionDeleteRequest };
