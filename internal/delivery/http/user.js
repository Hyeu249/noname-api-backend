const express = require("express");
const { StatusCodes } = require("http-status-codes");
const userService = require("@server/internal/implementation/user_service");

const router = new express.Router();

const { OK, BAD_REQUEST, NOT_FOUND, INTERNAL_SERVER_ERROR } = StatusCodes;
const internalServerError = "Something bad happened in our server. Please contact the Administrator.";

router.post("/users", async (req, res) => {
  try {
    const err = await userService.createUser(req.body);
    if (err !== null) {
      throw new Error(err);
    }

    res.status(OK).send({ message: "Hello World!!!" });
  } catch (error) {
    switch (error) {
      default:
        res.status(INTERNAL_SERVER_ERROR).send(internalServerError);
    }
  }
});

module.exports = router;
