const Sequelize = require("@server/lib/sequelize");
const log = require("@server/lib/log");

class ImageRepo {
  constructor() {}
  static InsertNewImage = InsertNewImage;
}
module.exports = ImageRepo;

async function InsertNewImage(tx, body) {
  log.Repo("Start IMAGE Repo InsertNewImage");

  try {
    await Sequelize.Image.create(
      {
        name: body.name,
        description: body.description,
        file_extention: body.file_extention,
        location: body.location,
      },
      { transaction: tx }
    )
      .then(() => {})
      .catch((error) => {
        throw new Error(error);
      });

    log.Repo("Finish IMAGE Repo InsertNewImage");
    return null;
  } catch (error) {
    log.Error("Finish IMAGE Repo InsertNewImage with error", error);
    return error;
  }
}
