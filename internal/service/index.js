const UserService = require("./user_service");
const ImageService = require("./user_service");

class Service {
  constructor() {}
  static UserService = UserService;
  static ImageService = ImageService;
}

module.exports = Service;
