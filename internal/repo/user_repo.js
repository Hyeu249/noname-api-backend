const Sequelize = require("@server/lib/sequelize");
const log = require("@server/lib/log");

class UserRepo {
  constructor() {}
  static InsertNewUser = InsertNewUser;
  static IsUsernameExist = IsUsernameExist;
  static IsEmailExist = IsEmailExist;
}

module.exports = UserRepo;

async function InsertNewUser(tx, body) {
  log.Repo("Start USER Repo InsertNewUser");
  let err = null;

  try {
    await Sequelize.User.create(
      {
        user_name: body.user_name,
        email: body.email,
        first_name: body.first_name,
        last_name: body.last_name,
      },
      { transaction: tx }
    )
      .then(() => {})
      .catch((error) => {
        err = error;
      });

    log.Repo("Finish USER Repo InsertNewUser");
    return err;
  } catch (error) {
    log.Error("Finish USER Repo InsertNewUser with error", error);
    return error;
  }
}

async function IsUsernameExist(tx, body) {
  log.Repo("Start USER Repo IsUsernameExist");
  let count = null;
  let err = null;

  try {
    await Sequelize.User.count(
      {
        where: {
          user_name: body.user_name,
        },
      },
      { transaction: tx }
    )
      .then((e) => {
        count = e > 0;
      })
      .catch((error) => {
        err = error;
      });

    log.Repo("Finish USER Repo IsUsernameExist");
    return [count, err];
  } catch (error) {
    log.Error("Finish USER Repo IsUsernameExist with error", error);
    return [null, error];
  }
}
async function IsEmailExist(tx, body) {
  log.Repo("Start USER Repo IsEmailExist");
  let count = null;
  let err = null;

  try {
    await Sequelize.User.count(
      {
        where: {
          email: body.email,
        },
      },
      { transaction: tx }
    )
      .then((e) => {
        count = e > 0;
      })
      .catch((error) => {
        err = error;
      });

    log.Repo("Finish USER Repo IsEmailExist");
    return [count, err];
  } catch (error) {
    log.Error("Finish USER Repo IsEmailExist with error", error);
    return [null, error];
  }
}
