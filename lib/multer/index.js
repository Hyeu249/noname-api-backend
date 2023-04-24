const { v4: uuidv4 } = require("uuid");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    try {
      cb(null, "upload");
    } catch (error) {
      cb(error);
    }
  },
  filename: function (req, file, cb) {
    try {
      const location = uuidv4();
      //declare body
      req.body.name = file.originalname.split(".")[0];
      req.body.description = file.description;
      req.body.file_extention = file.mimetype.split("/")[1];
      req.body.location = location;

      //callback
      cb(null, location);
    } catch (error) {
      cb(error);
    }
  },
});

const upload = multer({
  storage: storage,
});

class Multer {
  constructor() {}
  static StoreImageToLocal() {
    return upload.single("images");
  }
}

module.exports = Multer;
