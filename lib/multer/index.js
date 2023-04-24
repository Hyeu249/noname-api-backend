const { v4: uuidv4 } = require("uuid");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "upload");
  },
  filename: function (req, file, cb) {
    const location = uuidv4();
    cb(null, location);
  },
});

const upload = multer({ storage: storage });

class Multer {
  constructor() {}
  static StoreImageToLocal() {
    return upload.single("images");
  }
}

module.exports = Multer;
