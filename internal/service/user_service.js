const Repo = require("@server/internal/repo");
const domain = require("@server/internal/domain");
const log = require("@server/lib/log");
const help = require("@server/lib/help");

class UserService {
  constructor() {}
  static Register = Register;
}

module.exports = UserService;

async function Register(db, body) {
  log.Service("Start USER Register Service");
  const tx = await db.transaction();

  try {
    // Check if username already exist
    var [isUsernameExist, err] = await Repo.UserRepo.IsUsernameExist(tx, body);
    if (err !== null) {
      throw new Error(err);
    }
    if (isUsernameExist) {
      throw new Error(domain.ErrUsernameAlreadyExist);
    }

    //check if email already exist
    var [isEmailExist, err] = await Repo.UserRepo.IsEmailExist(tx, body);
    if (err !== null) {
      throw new Error(err);
    }
    if (isEmailExist) {
      throw new Error(domain.ErrEmailAlreadyExist);
    }

    //insert new user
    err = await Repo.UserRepo.InsertNewUser(tx, body);
    if (err !== null) {
      throw new Error(err);
    }

    await tx.commit();
    log.Service("Finish USER Register Service");
    return null;
  } catch (error) {
    await tx.rollback();
    const parseError = help.ParseErrorMessage(error.message);

    log.Error("Finish USER Register Service with error", error);
    return parseError;
  }
}
