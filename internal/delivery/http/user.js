const express = require("express");
const { StatusCodes } = require("http-status-codes");

const service = require("@server/internal/service");
const domain = require("@server/internal/domain");
const validator = require("@server/lib/validator");
const help = require("@server/lib/help");

const { OK, BAD_REQUEST, NOT_FOUND, INTERNAL_SERVER_ERROR } = StatusCodes;

// module.exports = router;
module.exports = {
  AttachUserServiceHTTPHandler: AttachUserServiceHTTPHandler,
};

function AttachUserServiceHTTPHandler(db) {
  const router = new express.Router();

  const g = "/users";

  router.post(g + "/register", register.bind({ db }));
  return router;
}

async function register(req, res) {
  const { db } = this;

  try {
    //validate struct
    var [body, err] = validator.Bind(req.body, domain.UserRegisterRequest).ValidateStruct().Parse();
    if (err !== null) {
      switch (err) {
        case domain.InternalErorAtValidation:
          return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.InternalErorAtValidation });
        default:
          return res.status(BAD_REQUEST).send({ message: err });
      }
    }
    //service
    var err = await service.userService.Register(db, body);
    if (err !== null) {
      const parseError = help.ParseErrorMessage(err.message);

      switch (parseError) {
        case domain.ErrUsernameAlreadyExist:
          return res.status(BAD_REQUEST).send({ message: domain.ErrUsernameAlreadyExist });
        case domain.ErrEmailAlreadyExist:
          return res.status(BAD_REQUEST).send({ message: domain.ErrEmailAlreadyExist });
        default:
          return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.InternalServerError });
      }
    }

    return res.status(OK).send({ message: domain.MsgUserRegisterSuccess });
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.InternalServerError });
  }
}
