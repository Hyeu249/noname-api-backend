const dataTypes = require("@server/lib/dataTypes");

const Var = {
  ErrUsernameAlreadyExist: "Username already exists.",
  ErrEmailAlreadyExist: "Email already exists.",
  MsgUserRegisterSuccess: "register successfully.",
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

module.exports = { ...Var, UserRegisterRequest };
