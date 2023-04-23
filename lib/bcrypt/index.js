const bcrypt = require("bcryptjs");

class Bcrypt_ {
  constructor() {}

  static async GetPwdHash(req_password) {
    const hashedPwd = await bcrypt.hash(req_password, 8);
    return hashedPwd;
  }
  static async CompareHashAndPwd(req_password, hashedPwd) {
    const isMatch = await bcrypt.compare(req_password, hashedPwd);
    return isMatch;
  }
}

module.exports = Bcrypt_;
