const User = require("./user");
const Image = require("./image");

class Http {
  constructor() {}
  static AttachUserServiceHTTPHandler = User.AttachUserServiceHTTPHandler;
  static AttachImageServiceHTTPHandler = Image.AttachImageServiceHTTPHandler;
}

module.exports = Http;
