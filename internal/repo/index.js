const UserRepo = require("./user_repo");
const ImageRepo = require("./image_repo");
const ProductTypeRepo = require("./product_type_repo");
const ProductRepo = require("./product_repo");

class Repo {
  constructor() {}
  static UserRepo = UserRepo;
  static ImageRepo = ImageRepo;
  static ProductTypeRepo = ProductTypeRepo;
  static ProductRepo = ProductRepo;
}

module.exports = Repo;
