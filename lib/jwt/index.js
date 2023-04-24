const jwt = require("jsonwebtoken");

class Jwt_ {
  constructor() {}

  static SignedUserUUID(user_uuid) {
    const token = jwt.sign({ user_uuid: user_uuid }, process.env.JWT_SECRET, { expiresIn: "5h" });
    return token;
  }
  static VerifyToken(token) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  }
}

module.exports = Jwt_;
