const UserRepo = require("./user_repo");
const ImageRepo = require("./image_repo");

class Repo {
  constructor() {}
  static UserRepo = UserRepo;
  static ImageRepo = ImageRepo;
}

module.exports = Repo;
