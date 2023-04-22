const dataTypes = require("@server/lib/dataTypes");

const Var = {
  ErrUsernameAlreadyExist: "Username already exists.",
  ErrEmailAlreadyExist: "Email already exists.",
  MsgUserRegisterSuccess: "Register successfully.",
  MsgUserLoginSuccess: "Login successfully.",

  ErrIncorrectUsernamePwd: "incorrect username or/and password.",
};

const UserRegisterRequest = {
  // First name of user (Ten nguoi dung)
  first_name: {
    type: dataTypes.STRING,
    validate: ["required"],
  },
  // Last name of user (Ho nguoi dung)
  last_name: {
    type: dataTypes.STRING,
    validate: ["required"],
  },
  user_name: {
    type: dataTypes.STRING,
    validate: ["required"],
  },
  email: {
    type: dataTypes.STRING,
    validate: ["required", "email"],
  },
};

const UserLoginRequest = {
  user_name: { type: dataTypes.STRING, validate: ["required"] },
  pass_word: { type: dataTypes.STRING, validate: ["required"] },
};

module.exports = { ...Var, UserRegisterRequest, UserLoginRequest };
