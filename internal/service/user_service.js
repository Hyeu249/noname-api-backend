const Repo = require("@server/internal/repo");
const domain = require("@server/internal/domain");
const log = require("@server/lib/log");
const help = require("@server/lib/help");
const Bcrypt = require("@server/lib/bcrypt");
const Jwt = require("@server/lib/jwt");

class UserService {
  constructor() {}
  static Register = Register;
  static Login = Login;
}

module.exports = UserService;

async function Register(db, body) {
  log.Service("Start USER Register Service");
  const tx = await db.transaction();

  try {
    // Check if username already exist
    var [isUsernameExist, err] = await Repo.UserRepo.IsUsernameExist(tx, body.user_name);
    if (err !== null) {
      throw new Error(err);
    }
    if (isUsernameExist) {
      throw new Error(domain.ErrUsernameAlreadyExist);
    }

    const hashPwd = await Bcrypt.GetPwdHash(body.password);
    body.hashPwd = hashPwd;

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

async function Login(db, body) {
  log.Service("Start USER Login Service");
  const tx = await db.transaction();

  try {
    // Get user_uuid, pwd By username
    var [User, err] = await Repo.UserRepo.GetUserUUIDPwdByUsername(tx, body.user_name);
    if (err !== null) {
      throw new Error(err);
    }
    // return ErrIncorrectUsernamePwd, if cannot find user.
    if (User === null) {
      throw new Error(domain.ErrIncorrectUsernamePwd);
    }

    const isMatch = await Bcrypt.CompareHashAndPwd(body.password, User.hashed_pwd);
    if (!isMatch) {
      throw new Error(domain.ErrIncorrectUsernamePwd);
    }

    const tokenStr = await Jwt.SignedUserUUID(User.id);

    //insert new user
    var [user, err] = await Repo.UserRepo.ActivateUser(tx, User.id);
    console.log("user-2: ", user);
    if (err !== null) {
      throw new Error(err);
    }

    await tx.commit();
    log.Service("Finish USER Login Service");
    return [tokenStr, null];
  } catch (error) {
    await tx.rollback();
    const parseError = help.ParseErrorMessage(error.message);

    log.Error("Finish USER Login Service with error", error);
    return [null, parseError];
  }
}
