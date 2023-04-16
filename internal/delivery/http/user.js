const express = require("express");
const httpStatus = require("http-status-codes");

//declare
const {
  OK: StatusOK,
  BAD_REQUEST: StatusBadRequest,
  NOT_FOUND: StatusNotFound,
  INTERNAL_SERVER_ERROR: StatusInternalServerError,
} = httpStatus;

const router = new express.Router();

router.get("/users", async (req, res) => {
  try {
    res.status(StatusOK).send({ message: "Hello World!!!" });
  } catch (e) {
    res.status(StatusInternalServerError).send(e);
  }
});

module.exports = router;
