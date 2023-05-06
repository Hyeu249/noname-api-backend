const express = require("express");
const { StatusCodes } = require("http-status-codes");

const Service = require("@server/internal/service");
const domain = require("@server/internal/domain");
const validator = require("@server/lib/validator");

const { OK, BAD_REQUEST, NOT_FOUND, INTERNAL_SERVER_ERROR } = StatusCodes;

class User {
  constructor() {}
  static AttachProductCollectionRelationServiceHTTPHandler = AttachProductCollectionRelationServiceHTTPHandler;
}

// module.exports = router;
module.exports = User;

function AttachProductCollectionRelationServiceHTTPHandler(db) {
  const router = new express.Router();

  const g = "/product-collection-relations";

  router.get(g + "", getProductCollectionRelationList.bind({ db }));
  router.post(g + "", createProductCollectionRelation.bind({ db }));
  router.patch(g + "/:id", updateProductCollectionRelation.bind({ db }));
  router.delete(g + "/:id", deleteProductCollectionRelation.bind({ db }));

  return router;
}

async function createProductCollectionRelation(req, res) {
  const { db } = this;

  try {
    //validate struct
    var [body, err] = validator.Bind(req.body, domain.ProductCollectionRelationCreateRequest).ValidateStruct().Parse();
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
    var err = await Service.ProductCollectionRelationService.CreateProductCollectionRelation(db, body);
    if (err !== null) {
      switch (err) {
        case domain.ProductIsNotFound:
          return res.status(NOT_FOUND).send({ message: domain.ProductIsNotFound });
        case domain.CollectionIsNotFound:
          return res.status(NOT_FOUND).send({ message: domain.CollectionIsNotFound });
        default:
          return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.InternalServerError });
      }
    }

    return res.status(OK).send({ message: domain.MsgProductCollectionRelationCreateSuccess });
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.InternalServerError });
  }
}

async function getProductCollectionRelationList(req, res) {
  const { db } = this;

  try {
    //validate struct
    var [body, err] = validator.Bind(req.query, domain.ProductCollectionRelationListRequest).ValidateStruct().Parse();
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
    var [productCollectionRelations, err] = await Service.ProductCollectionRelationService.GetProductCollectionRelationList(db, body);
    if (err !== null) {
      switch (err) {
        case domain.ProductCollectionRelationIsNotFound:
          return res.status(NOT_FOUND).send({ message: domain.ProductCollectionRelationIsNotFound });
        case domain.ProductIsNotFound:
          return res.status(NOT_FOUND).send({ message: domain.ProductIsNotFound });
        case domain.CollectionIsNotFound:
          return res.status(NOT_FOUND).send({ message: domain.CollectionIsNotFound });
        default:
          return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.InternalServerError });
      }
    }

    return res.status(OK).send({ message: domain.MsgProductCollectionRelationGetListSuccess, result: productCollectionRelations });
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.InternalServerError });
  }
}

async function updateProductCollectionRelation(req, res) {
  const { db } = this;

  try {
    const product_collection_relation_id = req.params.id;

    //validate struct
    var [body, err] = validator.Bind(req.body, domain.ProductCollectionRelationUpdateRequest).ValidateStruct().Parse();
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
    var err = await Service.ProductCollectionRelationService.UpdateProductCollectionRelation(db, body, product_collection_relation_id);
    if (err !== null) {
      switch (err) {
        case domain.ProductCollectionRelationIsNotFound:
          return res.status(NOT_FOUND).send({ message: domain.ProductCollectionRelationIsNotFound });
        case domain.ProductIsNotFound:
          return res.status(NOT_FOUND).send({ message: domain.ProductIsNotFound });
        case domain.CollectionIsNotFound:
          return res.status(NOT_FOUND).send({ message: domain.CollectionIsNotFound });
        default:
          return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.InternalServerError });
      }
    }

    return res.status(OK).send({ message: domain.MsgProductCollectionRelationUpdateSuccess });
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.InternalServerError });
  }
}

async function deleteProductCollectionRelation(req, res) {
  const { db } = this;

  try {
    //validate struct
    var [body, err] = validator.Bind(req.params, domain.ProductCollectionRelationDeleteRequest).ValidateStruct().Parse();
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
    var err = await Service.ProductCollectionRelationService.DeleteProductCollectionRelation(db, body.id);
    if (err !== null) {
      switch (err) {
        case domain.ProductCollectionRelationIsNotFound:
          return res.status(NOT_FOUND).send({ message: domain.ProductCollectionRelationIsNotFound });
        default:
          return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.InternalServerError });
      }
    }

    return res.status(OK).send({ message: domain.MsgProductCollectionRelationDeleteSuccess });
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.InternalServerError });
  }
}
