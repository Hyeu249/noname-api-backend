const express = require("express");
const { StatusCodes } = require("http-status-codes");

const Service = require("@server/internal/service");
const domain = require("@server/internal/domain");
const validator = require("@server/lib/validator");
const Multer = require("@server/lib/multer");

const { OK, BAD_REQUEST, NOT_FOUND, INTERNAL_SERVER_ERROR } = StatusCodes;

class User {
  constructor() {}
  static AttachImageServiceHTTPHandler = AttachImageServiceHTTPHandler;
}

// module.exports = router;
module.exports = User;

function AttachImageServiceHTTPHandler(db, middleware) {
  const router = new express.Router();

  const g = "/images";

  router.get(g + "/:id", downloadImage.bind({ db }));
  router.delete(g + "/:id", deleteImage.bind({ db }));
  //
  router.post(g + "/printing", ...middleware, Multer.StoreImageToLocal(), createPrintingImage.bind({ db }));
  router.post(g + "/sample", ...middleware, Multer.StoreImageToLocal(), createSampleImage.bind({ db }));
  router.patch(g + "/edit", ...middleware, updateImage.bind({ db }));

  return router;
}

async function createPrintingImage(req, res) {
  const { db } = this;

  try {
    //validate struct
    var [body, err] = validator.Bind(req.body, domain.ImageUploadRequest).ValidateStruct().Parse();
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
    var err = await Service.ImageService.CreatePrintingImage(db, body, req.user_id);
    if (err !== null) {
      switch (err) {
        default:
          return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.InternalServerError });
      }
    }

    return res.status(OK).send({ message: domain.MsgImageUploadSuccess });
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.InternalServerError });
  }
}

async function createSampleImage(req, res) {
  const { db } = this;

  try {
    //validate struct
    var [body, err] = validator.Bind(req.body, domain.ImageUploadRequest).ValidateStruct().Parse();
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
    var err = await Service.ImageService.CreateSampleImage(db, body, req.user_id);
    if (err !== null) {
      switch (err) {
        default:
          return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.InternalServerError });
      }
    }

    return res.status(OK).send({ message: domain.MsgImageUploadSuccess });
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.InternalServerError });
  }
}

async function downloadImage(req, res) {
  const { db } = this;

  try {
    //validate struct
    var [body, err] = validator.Bind({ id: req.params.id }, domain.ImageDownloadRequest).ValidateStruct().Parse();
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
    var [image, err] = await Service.ImageService.GetImage(db, body.id);
    if (err !== null) {
      switch (err) {
        case domain.ImageIsNotFound:
          return res.status(NOT_FOUND).send({ message: domain.ImageIsNotFound });
        case domain.ImageLocationIsNotFound:
          return res.status(NOT_FOUND).send({ message: domain.ImageLocationIsNotFound });
        default:
          return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.InternalServerError });
      }
    }

    return res.status(OK).send({ message: domain.MsgImageDownloadSuccess, image: image });
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.InternalServerError });
  }
}

async function updateImage(req, res) {
  const { db } = this;

  try {
    const { name, description } = req.body;
    const image_id = req.query.id;

    //validate struct
    var [body, err] = validator.Bind({ name, description, image_id }, domain.ImageUpdateRequest).ValidateStruct().Parse();
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
    var err = await Service.ImageService.UpdateImage(db, body, req.user_id);
    if (err !== null) {
      switch (err) {
        case domain.ImageIsNotFound:
          return res.status(NOT_FOUND).send({ message: domain.ImageIsNotFound });
        case domain.ThisUserIsNotTheOwner:
          return res.status(BAD_REQUEST).send({ message: domain.ThisUserIsNotTheOwner });
        default:
          return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.InternalServerError });
      }
    }

    return res.status(OK).send({ message: domain.MsgImageUpdateSuccess });
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.InternalServerError });
  }
}

async function deleteImage(req, res) {
  const { db } = this;

  try {
    //validate struct
    var [body, err] = validator.Bind({ id: req.params.id }, domain.ImageDownloadRequest).ValidateStruct().Parse();
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
    var err = await Service.ImageService.DeleteImage(db, body.id);
    if (err !== null) {
      switch (err) {
        case domain.ImageIsNotFound:
          return res.status(NOT_FOUND).send({ message: domain.ImageIsNotFound });
        default:
          return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.InternalServerError });
      }
    }

    return res.status(OK).send({ message: domain.MsgImageDeleteSuccess });
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.InternalServerError });
  }
}
