const Repo = require("@server/internal/repo");
const domain = require("@server/internal/domain");
const log = require("@server/lib/log");
const help = require("@server/lib/help");

class ImageService {
  constructor() {}
  static uploadImage = uploadImage;
  static GetImage = GetImage;
}

module.exports = ImageService;

async function uploadImage(db, body) {
  log.Service("Start IMAGE uploadImage Service");
  const tx = await db.transaction();

  try {
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

async function GetImage(db, image_id) {
  log.Service("Start IMAGE GetImage Service");
  const tx = await db.transaction();

  try {
    //insert new image
    var [location, err] = await Repo.ImageRepo.GetImageLocation(tx, image_id);
    if (err !== null) {
      throw new Error(err);
    }
    if (location === null) {
      throw new Error(domain.ImageLocationIsNotFound);
    }

    var [image, err] = await Repo.ImageRepo.GetImageByLocation(tx, location);
    if (err !== null) {
      throw new Error(err);
    }
    if (image === null) {
      throw new Error(domain.ImageIsNotFound);
    }

    await tx.commit();
    log.Service("Finish IMAGE GetImage Service");
    return [image, null];
  } catch (error) {
    await tx.rollback();
    const parseError = help.ParseErrorMessage(error.message);

    log.Error("Finish IMAGE GetImage Service with error", error);
    return [null, parseError];
  }
}
