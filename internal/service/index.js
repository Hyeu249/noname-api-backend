const UserService = require("./user_service");
const ImageService = require("./image_service");
const ProductTypeService = require("./product_type_service");

class Service {
  constructor() {}
  static UserService = UserService;
  static ImageService = ImageService;
  static ProductTypeService = ProductTypeService;
}

module.exports = Service;
