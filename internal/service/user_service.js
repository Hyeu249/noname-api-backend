const repo = require("@server/internal/repo");
const domain = require("@server/internal/domain");
const log = require("@server/lib/log");

module.exports = {
  Register,
};

async function Register(db, body) {
  log.Service("Start USER Register Service");
  const tx = await db.transaction();

  try {
    // Check if username already exist
    var [isUsernameExist, err] = await repo.userRepo.IsUsernameExist(tx, body);
    if (err !== null) {
      throw new Error(err);
    }
    if (isUsernameExist) {
      throw new Error(domain.ErrUsernameAlreadyExist);
    }

    //check if email already exist
    var [isEmailExist, err] = await repo.userRepo.IsEmailExist(tx, body);
    if (err !== null) {
      throw new Error(err);
    }
    if (isEmailExist) {
      throw new Error(domain.ErrEmailAlreadyExist);
    }

    //insert new user
    err = await repo.userRepo.InsertNewUser(tx, body);
    if (err !== null) {
      throw new Error(err);
    }

    await tx.commit();
    log.Service("Finish USER Register Service");
    return null;
  } catch (error) {
    await tx.rollback();
    log.Error("Finish USER Register Service with error", error);
    return error;
  }
}
