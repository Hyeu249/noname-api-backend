const express = require("express");
const { StatusCodes } = require("http-status-codes");

const Service = require("@server/internal/service");
const domain = require("@server/internal/domain");
const validator = require("@server/lib/validator");

const { OK, BAD_REQUEST, NOT_FOUND, INTERNAL_SERVER_ERROR } = StatusCodes;

class User {
  constructor() {}
  static AttachProductTypeServiceHTTPHandler = AttachProductTypeServiceHTTPHandler;
}

// module.exports = router;
module.exports = User;

function AttachProductTypeServiceHTTPHandler(db) {
  const router = new express.Router();

  const g = "/product-types";

  router.get(g + "", getProductTypeList.bind({ db }));
  router.post(g + "", createProductType.bind({ db }));
  router.patch(g + "/:id", updateProductType.bind({ db }));
  router.delete(g + "/:id", deleteProductType.bind({ db }));

  return router;
}

async function createProductType(req, res) {
  const { db } = this;

  try {
    //validate struct
    var [body, err] = validator.Bind(req.body, domain.ProductTypeCreateRequest).ValidateStruct().Parse();
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
    var err = await Service.ProductTypeService.CreateProductType(db, body);
    if (err !== null) {
      switch (err) {
        case domain.ImageIsNotFound:
          return res.status(NOT_FOUND).send({ message: domain.ImageIsNotFound });
        case domain.ThisIsNotSampleImage:
          return res.status(BAD_REQUEST).send({ message: domain.ThisIsNotSampleImage });
        default:
          return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.InternalServerError });
      }
    }

    return res.status(OK).send({ message: domain.MsgProductTypeCreateSuccess });
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.InternalServerError });
  }
}

async function getProductTypeList(req, res) {
  const { db } = this;

  try {
    //validate struct
    var [body, err] = validator.Bind(req.query, domain.ProductTypeListRequest).ValidateStruct().Parse();
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
    var [productTypes, err] = await Service.ProductTypeService.GetProductTypeList(db, body);
    if (err !== null) {
      switch (err) {
        case domain.ProductTypeIsNotFound:
          return res.status(NOT_FOUND).send({ message: domain.ProductTypeIsNotFound });
        case domain.ImageIsNotFound:
          return res.status(NOT_FOUND).send({ message: domain.ImageIsNotFound });
        case domain.ThisIsNotSampleImage:
          return res.status(BAD_REQUEST).send({ message: domain.ThisIsNotSampleImage });
        default:
          return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.InternalServerError });
      }
    }

    return res.status(OK).send({ message: domain.MsgProductTypeGetListSuccess, result: productTypes });
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.InternalServerError });
  }
}

async function updateProductType(req, res) {
  const { db } = this;

  try {
    const product_type_id = req.params.id;

    //validate struct
    var [body, err] = validator.Bind(req.body, domain.ProductTypeUpdateRequest).ValidateStruct().Parse();
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
    var err = await Service.ProductTypeService.UpdateProductType(db, body, product_type_id);
    if (err !== null) {
      switch (err) {
        case domain.ProductTypeIsNotFound:
          return res.status(NOT_FOUND).send({ message: domain.ProductTypeIsNotFound });
        case domain.ImageIsNotFound:
          return res.status(NOT_FOUND).send({ message: domain.ImageIsNotFound });
        case domain.ThisIsNotSampleImage:
          return res.status(BAD_REQUEST).send({ message: domain.ThisIsNotSampleImage });
        default:
          return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.InternalServerError });
      }
    }

    return res.status(OK).send({ message: domain.MsgProductTypeUpdateSuccess });
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.InternalServerError });
  }
}

async function deleteProductType(req, res) {
  const { db } = this;

  try {
    //validate struct
    var [body, err] = validator.Bind(req.params, domain.ProductTypeDeleteRequest).ValidateStruct().Parse();
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
    var err = await Service.ProductTypeService.DeleteProductType(db, body.id);
    if (err !== null) {
      switch (err) {
        case domain.ProductTypeIsNotFound:
          return res.status(NOT_FOUND).send({ message: domain.ProductTypeIsNotFound });
        default:
          return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.InternalServerError });
      }
    }

    return res.status(OK).send({ message: domain.MsgProductTypeDeleteSuccess });
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.InternalServerError });
  }
}
