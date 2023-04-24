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

  router.post(g + "/upload", Multer.StoreImageToLocal(), uploadImage.bind({ db }));
  router.get(g + "/download", downloadImage.bind({ db }));
  router.delete(g + "/delete", deleteImage.bind({ db }));
  return router;
}

async function uploadImage(req, res) {
  const { db } = this;

  try {
    //service
    var err = await Service.ImageService.uploadImage(db, req.file);
    if (err !== null) {
      switch (err) {
        default:
          return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.InternalServerError });
      }
    }

    return res.status(OK).send({ message: domain.MsgImageUploadSuccess });
  } catch (error) {
    console.log("error: ", error.message);
    return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.InternalServerError });
  }
}

async function downloadImage(req, res) {}
async function deleteImage(req, res) {}
