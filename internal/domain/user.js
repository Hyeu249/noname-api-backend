const dataTypes = require("@server/lib/dataTypes");

const Var = {
  ErrUsernameAlreadyExist: "Username already exists.",
  ErrEmailAlreadyExist: "Email already exists.",
  MsgUserRegisterSuccess: "Register successfully.",
  MsgUserLoginSuccess: "Login successfully.",

  ErrIncorrectUsernamePwd: "incorrect username or/and password.",
  CantActiveThisUser: "Cant active this user.",
};

const UserRegisterRequest = {
  name: {
    type: dataTypes.STRING,
    validate: ["required"],
  },

  user_name: {
    type: dataTypes.STRING,
    validate: ["required"],
  },
  password: {
    type: dataTypes.STRING,
    validate: ["required"],
  },
};

const UserLoginRequest = {
  user_name: { type: dataTypes.STRING, validate: ["required"] },
  password: { type: dataTypes.STRING, validate: ["required"] },
};

module.exports = { ...Var, UserRegisterRequest, UserLoginRequest };
