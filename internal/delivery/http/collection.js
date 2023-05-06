const express = require("express");
const { StatusCodes } = require("http-status-codes");

const Service = require("@server/internal/service");
const domain = require("@server/internal/domain");
const validator = require("@server/lib/validator");

const { OK, BAD_REQUEST, NOT_FOUND, INTERNAL_SERVER_ERROR } = StatusCodes;

class User {
  constructor() {}
  static AttachCollectionServiceHTTPHandler = AttachCollectionServiceHTTPHandler;
}

// module.exports = router;
module.exports = User;

function AttachCollectionServiceHTTPHandler(db) {
  const router = new express.Router();

  const g = "/collections";

  router.get(g + "", getCollectionList.bind({ db }));
  router.post(g + "", createCollection.bind({ db }));
  router.patch(g + "/:id", updateCollection.bind({ db }));
  router.delete(g + "/:id", deleteCollection.bind({ db }));

  return router;
}

async function createCollection(req, res) {
  const { db } = this;

  try {
    //validate struct
    var [body, err] = validator.Bind(req.body, domain.CollectionCreateRequest).ValidateStruct().Parse();
    if (err !== null) {
      switch (err) {
        case domain.MalformedJSONErrResMsg:
          return res.status(BAD_REQUEST).send({ message: domain.MalformedJSONErrResMsg });
        case domain.validationFailureErrResMsg:
          return res.status(BAD_REQUEST).send({ message: domain.validationFailureErrResMsg });
        default:
          return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.InternalErorAtValidation });
      }
    }
    //service
    var err = await Service.CollectionService.CreateCollection(db, body, req.user_id);
    if (err !== null) {
      switch (err) {
        default:
          return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.InternalServerError });
      }
    }

    return res.status(OK).send({ message: domain.MsgCollectionCreateSuccess });
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.InternalServerError });
  }
}

async function getCollectionList(req, res) {
  const { db } = this;

  try {
    //validate struct
    var [body, err] = validator.Bind(req.query, domain.CollectionListRequest).ValidateStruct().Parse();
    if (err !== null) {
      switch (err) {
        case domain.MalformedJSONErrResMsg:
          return res.status(BAD_REQUEST).send({ message: domain.MalformedJSONErrResMsg });
        case domain.validationFailureErrResMsg:
          return res.status(BAD_REQUEST).send({ message: domain.validationFailureErrResMsg });
        default:
          return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.InternalErorAtValidation });
      }
    }
    //service
    var [collections, err] = await Service.CollectionService.GetCollectionList(db, body, req.user_id);
    if (err !== null) {
      switch (err) {
        case domain.CollectionIsNotFound:
          return res.status(NOT_FOUND).send({ message: domain.CollectionIsNotFound });
        default:
          return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.InternalServerError });
      }
    }

    return res.status(OK).send({ message: domain.MsgCollectionGetListSuccess, result: collections });
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.InternalServerError });
  }
}

async function updateCollection(req, res) {
  const { db } = this;

  try {
    const collection_id = req.params.id;

    //validate struct
    var [body, err] = validator.Bind(req.body, domain.CollectionUpdateRequest).ValidateStruct().Parse();
    if (err !== null) {
      switch (err) {
        case domain.MalformedJSONErrResMsg:
          return res.status(BAD_REQUEST).send({ message: domain.MalformedJSONErrResMsg });
        case domain.validationFailureErrResMsg:
          return res.status(BAD_REQUEST).send({ message: domain.validationFailureErrResMsg });
        default:
          return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.InternalErorAtValidation });
      }
    }
    //service
    var err = await Service.CollectionService.UpdateCollection(db, body, collection_id);
    if (err !== null) {
      switch (err) {
        case domain.CollectionIsNotFound:
          return res.status(NOT_FOUND).send({ message: domain.CollectionIsNotFound });
        default:
          return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.InternalServerError });
      }
    }

    return res.status(OK).send({ message: domain.MsgCollectionUpdateSuccess });
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.InternalServerError });
  }
}

async function deleteCollection(req, res) {
  const { db } = this;

  try {
    //validate struct
    var [body, err] = validator.Bind(req.params, domain.CollectionDeleteRequest).ValidateStruct().Parse();
    if (err !== null) {
      switch (err) {
        case domain.MalformedJSONErrResMsg:
          return res.status(BAD_REQUEST).send({ message: domain.MalformedJSONErrResMsg });
        case domain.validationFailureErrResMsg:
          return res.status(BAD_REQUEST).send({ message: domain.validationFailureErrResMsg });
        default:
          return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.InternalErorAtValidation });
      }
    }
    //service
    var err = await Service.CollectionService.DeleteCollection(db, body.id);
    if (err !== null) {
      switch (err) {
        case domain.CollectionIsNotFound:
          return res.status(NOT_FOUND).send({ message: domain.CollectionIsNotFound });
        default:
          return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.InternalServerError });
      }
    }

    return res.status(OK).send({ message: domain.MsgCollectionDeleteSuccess });
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.InternalServerError });
  }
}
