const Sequelize = require("@server/lib/sequelize");
const Image = require("@server/lib/sequelize/image");

const log = require("@server/lib/log");

class ImageRepo {
  constructor() {}
  static InsertNewPrintingImage = InsertNewPrintingImage;
  static InsertNewSampleImage = InsertNewSampleImage;
  static GetImage = GetImage;
  static DetroyImage = DetroyImage;
  static IsImageExist = IsImageExist;
}
module.exports = ImageRepo;

async function InsertNewPrintingImage(tx, body) {
  log.Repo("Start IMAGE Repo InsertNewPrintingImage");
  try {
    const _ = await Sequelize.Image.create(
      {
        name: body.name,
        description: body.description,
        type: Image.Image_types.PRINTING,
        file_extention: body.file_extention,
        location: body.location,
      },
      { transaction: tx }
    );

    log.Repo("Finish IMAGE Repo InsertNewPrintingImage");
    return null;
  } catch (error) {
    log.Error("Finish IMAGE Repo InsertNewPrintingImage with error", error);
    return error;
  }
}

async function InsertNewSampleImage(tx, body) {
  log.Repo("Start IMAGE Repo InsertNewSampleImage");

  try {
    const _ = await Sequelize.Image.create(
      {
        name: body.name,
        description: body.description,
        type: Image.Image_types.SAMPLE,
        file_extention: body.file_extention,
        location: body.location,
      },
      { transaction: tx }
    );

    log.Repo("Finish IMAGE Repo InsertNewSampleImage");
    return null;
  } catch (error) {
    log.Error("Finish IMAGE Repo InsertNewSampleImage with error", error);
    return error;
  }
}

async function GetImage(tx, image_id) {
  log.Repo("Start IMAGE Repo GetImage");

  try {
    const image = await Sequelize.Image.findOne(
      {
        where: {
          id: image_id,
        },
      },
      { transaction: tx }
    );

    log.Repo("Finish IMAGE Repo GetImage");
    return [image, null];
  } catch (error) {
    log.Error("Finish IMAGE Repo GetImage with error", error);
    return [null, error];
  }
}

async function DetroyImage(tx, image_id) {
  log.Repo("Start IMAGE Repo DetroyImage");

  try {
    const _ = await Sequelize.Image.destroy(
      {
        where: {
          id: image_id,
        },
      },
      { transaction: tx }
    );

    log.Repo("Finish IMAGE Repo DetroyImage");
    return null;
  } catch (error) {
    log.Error("Finish IMAGE Repo DetroyImage with error", error);
    return error;
  }
}

async function IsImageExist(tx, image_id) {
  log.Repo("Start IMAGE Repo IsImageExist");

  try {
    const count = await Sequelize.Image.count(
      {
        where: {
          id: image_id,
        },
      },
      { transaction: tx }
    );

    log.Repo("Finish IMAGE Repo IsImageExist");
    return [count > 0, null];
  } catch (error) {
    log.Error("Finish IMAGE Repo IsImageExist with error", error);
    return [null, error];
  }
}
