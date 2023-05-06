const User = require("./user");
const Image = require("./image");
const ProductType = require("./product_type");
const Product = require("./product");
const Collection = require("./collection");

class Http {
  constructor() {}
  static AttachUserServiceHTTPHandler = User.AttachUserServiceHTTPHandler;
  static AttachImageServiceHTTPHandler = Image.AttachImageServiceHTTPHandler;
  static AttachProductTypeServiceHTTPHandler = ProductType.AttachProductTypeServiceHTTPHandler;
  static AttachProductServiceHTTPHandler = Product.AttachProductServiceHTTPHandler;
  static AttachCollectionServiceHTTPHandler = Collection.AttachCollectionServiceHTTPHandler;
}

module.exports = Http;
