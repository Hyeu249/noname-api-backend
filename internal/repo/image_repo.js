const Sequelize = require("@server/lib/sequelize");
const log = require("@server/lib/log");

class ImageRepo {
  constructor() {}
  static InsertNewImage = InsertNewImage;
  static GetImageLocation = GetImageLocation;
  static DetroyImage = DetroyImage;
}
module.exports = ImageRepo;

async function InsertNewImage(tx, body) {
  log.Repo("Start IMAGE Repo InsertNewImage");

  try {
    const _ = await Sequelize.Image.create(
      {
        name: body.name,
        description: body.description,
        file_extention: body.file_extention,
        location: body.location,
      },
      { transaction: tx }
    );

    log.Repo("Finish IMAGE Repo InsertNewImage");
    return null;
  } catch (error) {
    log.Error("Finish IMAGE Repo InsertNewImage with error", error);
    return error;
  }
}

async function GetImageLocation(tx, image_id) {
  log.Repo("Start IMAGE Repo GetImageLocation");

  try {
    const { location } = await Sequelize.Image.findOne(
      {
        attributes: ["location"],
        where: {
          id: image_id,
        },
      },
      { transaction: tx }
    );

    log.Repo("Finish IMAGE Repo GetImageLocation");
    return [location, null];
  } catch (error) {
    log.Error("Finish IMAGE Repo GetImageLocation with error", error);
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
