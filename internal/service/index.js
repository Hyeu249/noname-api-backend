const UserService = require("./user_service");
const ImageService = require("./image_service");

class Service {
  constructor() {}
  static UserService = UserService;
  static ImageService = ImageService;
}

module.exports = Service;
