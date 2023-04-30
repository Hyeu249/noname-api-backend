const Repo = require("@server/internal/repo");
const domain = require("@server/internal/domain");
const log = require("@server/lib/log");
const help = require("@server/lib/help");

class ImageService {
  constructor() {}
  static createPrintingImage = createPrintingImage;
  static createSampleImage = createSampleImage;
  static GetImage = GetImage;
  static DeleteImage = DeleteImage;
}

module.exports = ImageService;

async function createPrintingImage(db, body, user_id) {
  log.Service("Start IMAGE createPrintingImage Service");
  const tx = await db.transaction();

  try {
    //insert new image
    const err = await Repo.ImageRepo.InsertNewPrintingImage(tx, body, user_id);
    if (err !== null) {
      throw new Error(err);
    }

    await tx.commit();
    log.Service("Finish IMAGE createPrintingImage Service");
    return null;
  } catch (error) {
    await tx.rollback();
    const parseError = help.ParseErrorMessage(error.message);

    log.Error("Finish IMAGE createPrintingImage Service with error", error);
    return parseError;
  }
}

async function createSampleImage(db, body, user_id) {
  log.Service("Start IMAGE createSampleImage Service");
  const tx = await db.transaction();

  try {
    //insert new image
    const err = await Repo.ImageRepo.InsertNewSampleImage(tx, body, user_id);
    if (err !== null) {
      throw new Error(err);
    }

    await tx.commit();
    log.Service("Finish IMAGE createSampleImage Service");
    return null;
  } catch (error) {
    await tx.rollback();
    const parseError = help.ParseErrorMessage(error.message);

    log.Error("Finish IMAGE createSampleImage Service with error", error);
    return parseError;
  }
}

async function GetImage(db, image_id) {
  log.Service("Start IMAGE GetImage Service");
  const tx = await db.transaction();

  try {
    //check id
    var [isImageExist, err] = await Repo.ImageRepo.IsImageExist(tx, image_id);
    if (err !== null) {
      throw new Error(err);
    }
    if (!isImageExist) {
      throw new Error(domain.ImageIsNotFound);
    }
    //get image
    var [image, err] = await Repo.ImageRepo.GetImage(tx, image_id);
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

async function DeleteImage(db, image_id) {
  log.Service("Start IMAGE DeleteImage Service");
  const tx = await db.transaction();

  try {
    //check id
    var [isImageExist, err] = await Repo.ImageRepo.IsImageExist(tx, image_id);
    if (err !== null) {
      throw new Error(err);
    }
    if (!isImageExist) {
      throw new Error(domain.ImageIsNotFound);
    }
    //detroy new image
    var err = await Repo.ImageRepo.DetroyImage(tx, image_id);
    if (err !== null) {
      throw new Error(err);
    }

    await tx.commit();
    log.Service("Finish IMAGE DeleteImage Service");
    return null;
  } catch (error) {
    await tx.rollback();
    const parseError = help.ParseErrorMessage(error.message);

    log.Error("Finish IMAGE DeleteImage Service with error", error);
    return parseError;
  }
}
