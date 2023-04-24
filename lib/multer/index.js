const { v4: uuidv4 } = require("uuid");

const multer = require("multer");
const { MsgImageDownloadSuccess } = require("../../internal/domain/image");

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    try {
      callback(null, "upload");
    } catch (error) {
      callback(error);
    }
  },
  filename: function (req, file, callback) {
    try {
      const location = uuidv4();
      //declare body
      req.body.name = file.originalname.split(".")[0];
      req.body.description = file.description;
      req.body.file_extention = file.mimetype.split("/")[1];
      req.body.location = location;

      //callback
      callback(null, location);
    } catch (error) {
      callback(error);
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
