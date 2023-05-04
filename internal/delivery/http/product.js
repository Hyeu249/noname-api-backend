const express = require("express");
const { StatusCodes } = require("http-status-codes");

const Service = require("@server/internal/service");
const domain = require("@server/internal/domain");
const validator = require("@server/lib/validator");

const { OK, BAD_REQUEST, NOT_FOUND, INTERNAL_SERVER_ERROR } = StatusCodes;

class User {
  constructor() {}
  static AttachProductServiceHTTPHandler = AttachProductServiceHTTPHandler;
}

// module.exports = router;
module.exports = User;

function AttachProductServiceHTTPHandler(db) {
  const router = new express.Router();

  const g = "/products";

  router.get(g + "", getProductList.bind({ db }));
  router.post(g + "", createProduct.bind({ db }));
  router.patch(g + "/:id", updateProduct.bind({ db }));
  router.delete(g + "/:id", deleteProduct.bind({ db }));

  return router;
}

async function createProduct(req, res) {
  const { db } = this;

  try {
    //validate struct
    var [body, err] = validator.Bind(req.body, domain.ProductCreateRequest).ValidateStruct().Parse();
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
    var err = await Service.ProductService.CreateProduct(db, body);
    if (err !== null) {
      switch (err) {
        case domain.ImageIsNotFound:
          return res.status(NOT_FOUND).send({ message: domain.ImageIsNotFound });
        case domain.ThisIsNotPrintingImage:
          return res.status(BAD_REQUEST).send({ message: domain.ThisIsNotPrintingImage });
        case domain.ProductTypeIsNotFound:
          return res.status(NOT_FOUND).send({ message: domain.ProductTypeIsNotFound });
        default:
          return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.InternalServerError });
      }
    }

    return res.status(OK).send({ message: domain.MsgProductCreateSuccess });
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.InternalServerError });
  }
}

async function getProductList(req, res) {
  const { db } = this;

  try {
    //validate struct
    var [body, err] = validator.Bind(req.query, domain.ProductListRequest).ValidateStruct().Parse();
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
    var [products, err] = await Service.ProductService.GetProductList(db, body);
    if (err !== null) {
      switch (err) {
        case domain.ProductIsNotFound:
          return res.status(NOT_FOUND).send({ message: domain.ProductIsNotFound });
        case domain.ImageIsNotFound:
          return res.status(NOT_FOUND).send({ message: domain.ImageIsNotFound });
        case domain.ProductTypeIsNotFound:
          return res.status(NOT_FOUND).send({ message: domain.ProductTypeIsNotFound });
        case domain.ThisIsNotPrintingImage:
          return res.status(BAD_REQUEST).send({ message: domain.ThisIsNotPrintingImage });
        default:
          return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.InternalServerError });
      }
    }

    return res.status(OK).send({ message: domain.MsgProductGetListSuccess, result: products });
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.InternalServerError });
  }
}

async function updateProduct(req, res) {
  const { db } = this;

  try {
    const product_id = req.params.id;

    //validate struct
    var [body, err] = validator.Bind(req.body, domain.ProductUpdateRequest).ValidateStruct().Parse();
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
    var err = await Service.ProductService.UpdateProduct(db, body, product_id);
    if (err !== null) {
      switch (err) {
        case domain.ProductIsNotFound:
          return res.status(NOT_FOUND).send({ message: domain.ProductIsNotFound });
        case domain.ImageIsNotFound:
          return res.status(NOT_FOUND).send({ message: domain.ImageIsNotFound });
        case domain.ProductTypeIsNotFound:
          return res.status(NOT_FOUND).send({ message: domain.ProductTypeIsNotFound });
        case domain.ThisIsNotPrintingImage:
          return res.status(BAD_REQUEST).send({ message: domain.ThisIsNotPrintingImage });
        default:
          return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.InternalServerError });
      }
    }

    return res.status(OK).send({ message: domain.MsgProductUpdateSuccess });
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.InternalServerError });
  }
}

async function deleteProduct(req, res) {
  const { db } = this;

  try {
    //validate struct
    var [body, err] = validator.Bind(req.params, domain.ProductDeleteRequest).ValidateStruct().Parse();
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
    var err = await Service.ProductService.DeleteProduct(db, body.id);
    if (err !== null) {
      switch (err) {
        case domain.ProductIsNotFound:
          return res.status(NOT_FOUND).send({ message: domain.ProductIsNotFound });
        default:
          return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.InternalServerError });
      }
    }

    return res.status(OK).send({ message: domain.MsgProductDeleteSuccess });
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.InternalServerError });
  }
}
