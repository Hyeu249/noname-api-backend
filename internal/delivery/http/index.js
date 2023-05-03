const User = require("./user");
const Image = require("./image");
const ProductType = require("./product_type");

class Http {
  constructor() {}
  static AttachUserServiceHTTPHandler = User.AttachUserServiceHTTPHandler;
  static AttachImageServiceHTTPHandler = Image.AttachImageServiceHTTPHandler;
  static AttachProductTypeServiceHTTPHandler = ProductType.AttachProductTypeServiceHTTPHandler;
}

module.exports = Http;
