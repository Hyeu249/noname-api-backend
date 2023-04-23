const Sequelize = require("@server/lib/sequelize");
const log = require("@server/lib/log");

class UserRepo {
  constructor() {}
  static InsertNewUser = InsertNewUser;
  static IsUsernameExist = IsUsernameExist;
  static IsEmailExist = IsEmailExist;
  static GetUserUUIDPwdByUsername = GetUserUUIDPwdByUsername;
  static ActivateUser = ActivateUser;
}
module.exports = UserRepo;

async function InsertNewUser(tx, body) {
  log.Repo("Start USER Repo InsertNewUser");

  try {
    await Sequelize.User.create(
      {
        name: body.name,
        user_name: body.user_name,
        hashed_pwd: body.hashPwd,
      },
      { transaction: tx }
    )
      .then(() => {})
      .catch((error) => {
        throw new Error(error);
      });

    log.Repo("Finish USER Repo InsertNewUser");
    return null;
  } catch (error) {
    log.Error("Finish USER Repo InsertNewUser with error", error);
    return error;
  }
}

async function IsUsernameExist(tx, user_name) {
  log.Repo("Start USER Repo IsUsernameExist");
  let count = null;

  try {
    await Sequelize.User.count(
      {
        where: {
          user_name: user_name,
        },
      },
      { transaction: tx }
    )
      .then((e) => {
        count = e > 0;
      })
      .catch((error) => {
        throw new Error(error);
      });

    log.Repo("Finish USER Repo IsUsernameExist");
    return [count, null];
  } catch (error) {
    log.Error("Finish USER Repo IsUsernameExist with error", error);
    return [null, error];
  }
}
async function IsEmailExist(tx, email) {
  log.Repo("Start USER Repo IsEmailExist");
  let count = null;

  try {
    await Sequelize.User.count(
      {
        where: {
          email: email,
        },
      },
      { transaction: tx }
    )
      .then((e) => {
        count = e > 0;
      })
      .catch((error) => {
        throw new Error(error);
      });

    log.Repo("Finish USER Repo IsEmailExist");
    return [count, null];
  } catch (error) {
    log.Error("Finish USER Repo IsEmailExist with error", error);
    return [null, error];
  }
}

async function GetUserUUIDPwdByUsername(tx, user_name) {
  log.Repo("Start USER Repo GetUserUUIDPwdByUsername");
  let User = null;

  try {
    await Sequelize.User.findOne(
      {
        attributes: ["id", "hashed_pwd"],
        where: {
          user_name: user_name,
        },
      },
      { transaction: tx }
    )
      .then((user) => {
        User = user;
      })
      .catch((error) => {
        throw new Error(error);
      });

    log.Repo("Finish USER Repo GetUserUUIDPwdByUsername");
    return [User, null];
  } catch (error) {
    log.Error("Finish USER Repo GetUserUUIDPwdByUsername with error", error);
    return [null, error];
  }
}

async function ActivateUser(tx, user_id) {
  log.Repo("Start USER Repo ActivateUser");
  let User = null;

  try {
    await Sequelize.User.update(
      {
        is_active: true,
      },
      {
        where: { id: user_id },
      },
      { transaction: tx }
    )
      .then((user) => {
        user = user;
      })
      .catch((error) => {
        throw new Error(error);
      });

    log.Repo("Finish USER Repo ActivateUser");
    return [User, null];
  } catch (error) {
    log.Error("Finish USER Repo ActivateUser with error", error);
    return [null, error];
  }
}
