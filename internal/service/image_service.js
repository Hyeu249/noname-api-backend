const Repo = require("@server/internal/repo");
const domain = require("@server/internal/domain");
const log = require("@server/lib/log");
const help = require("@server/lib/help");

class ImageService {
  constructor() {}
  static uploadImage = uploadImage;
}

module.exports = ImageService;

async function uploadImage(db, file) {
  log.Service("Start IMAGE uploadImage Service");
  const tx = await db.transaction();
  const body = {};

  try {
    //declare body
    body.name = file.originalname.split(".")[0];
    body.description = file.description;
    body.file_extention = file.mimetype.split("/")[1];
    body.location = file.path;

    //insert new image
    err = await Repo.ImageRepo.InsertNewImage(tx, body);
    if (err !== null) {
      throw new Error(err);
    }

    await tx.commit();
    log.Service("Finish IMAGE uploadImage Service");
    return null;
  } catch (error) {
    await tx.rollback();
    const parseError = help.ParseErrorMessage(error.message);

    log.Error("Finish IMAGE uploadImage Service with error", error);
    return parseError;
  }
}
