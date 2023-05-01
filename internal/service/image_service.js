const Repo = require("@server/internal/repo");
const domain = require("@server/internal/domain");
const log = require("@server/lib/log");
const help = require("@server/lib/help");

class ImageService {
  constructor() {}
  static CreatePrintingImage = CreatePrintingImage;
  static CreateSampleImage = CreateSampleImage;
  static UpdateImage = UpdateImage;
  static GetImage = GetImage;
  static DeleteImage = DeleteImage;
}

module.exports = ImageService;

async function CreatePrintingImage(db, body, user_id) {
  log.Service("Start IMAGE CreatePrintingImage Service");
  const tx = await db.transaction();

  try {
    //insert new image
    const err = await Repo.ImageRepo.InsertNewPrintingImage(tx, body, user_id);
    if (err !== null) {
      throw new Error(err);
    }

    await tx.commit();
    log.Service("Finish IMAGE CreatePrintingImage Service");
    return null;
  } catch (error) {
    await tx.rollback();
    const parseError = help.ParseErrorMessage(error.message);

    log.Error("Finish IMAGE CreatePrintingImage Service with error", error);
    return parseError;
  }
}

async function CreateSampleImage(db, body, user_id) {
  log.Service("Start IMAGE CreateSampleImage Service");
  const tx = await db.transaction();

  try {
    //insert new image
    const err = await Repo.ImageRepo.InsertNewSampleImage(tx, body, user_id);
    if (err !== null) {
      throw new Error(err);
    }

    await tx.commit();
    log.Service("Finish IMAGE CreateSampleImage Service");
    return null;
  } catch (error) {
    await tx.rollback();
    const parseError = help.ParseErrorMessage(error.message);

    log.Error("Finish IMAGE CreateSampleImage Service with error", error);
    return parseError;
  }
}

async function UpdateImage(db, body, user_id) {
  log.Service("Start IMAGE UpdateImage Service");
  const tx = await db.transaction();

  try {
    var [isImageExist, err] = await Repo.ImageRepo.IsImageExist(tx, body.image_id);
    if (err !== null) {
      throw new Error(err);
    }
    if (!isImageExist) {
      throw new Error(domain.ImageIsNotFound);
    }
    var [isThisUserOwned, err] = await Repo.ImageRepo.IsThisUserOwned(tx, body.image_id, user_id);
    if (err !== null) {
      throw new Error(err);
    }
    if (!isThisUserOwned) {
      throw new Error(domain.ThisUserIsNotTheOwner);
    }

    //insert new image
    var err = await Repo.ImageRepo.UpdateImage(tx, body);
    if (err !== null) {
      throw new Error(err);
    }

    await tx.commit();
    log.Service("Finish IMAGE UpdateImage Service");
    return null;
  } catch (error) {
    await tx.rollback();
    const parseError = help.ParseErrorMessage(error.message);

    log.Error("Finish IMAGE UpdateImage Service with error", error);
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

async function DeleteImage(db, image_id, user_id) {
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

    var [isThisUserOwned, err] = await Repo.ImageRepo.IsThisUserOwned(tx, image_id, user_id);
    if (err !== null) {
      throw new Error(err);
    }
    if (!isThisUserOwned) {
      throw new Error(domain.ThisUserIsNotTheOwner);
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
