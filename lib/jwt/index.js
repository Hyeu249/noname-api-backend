const jwt = require("jsonwebtoken");

class Jwt_ {
  constructor() {}

  static SignedUserId(user_id) {
    const token = jwt.sign({ user_id: user_id }, process.env.JWT_SECRET, { expiresIn: "24h" });
    return token;
  }
  static VerifyToken(token) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  }
}

module.exports = Jwt_;
