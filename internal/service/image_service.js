const Repo = require("@server/internal/repo");
const domain = require("@server/internal/domain");
const log = require("@server/lib/log");
const help = require("@server/lib/help");

class ImageService {
  constructor() {}
  static uploadImage = uploadImage;
}

module.exports = ImageService;

async function uploadImage(db, body) {
  log.Service("Start IMAGE uploadImage Service");
  const tx = await db.transaction();

  try {
    throw new Error("hello");

    body.location = "";
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
