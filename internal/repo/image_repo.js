const fs = require("fs");

const Sequelize = require("@server/lib/sequelize");
const log = require("@server/lib/log");

class ImageRepo {
  constructor() {}
  static InsertNewImage = InsertNewImage;
  static GetImageLocation = GetImageLocation;
  static GetImageByLocation = GetImageByLocation;
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

async function GetImageLocation(tx, image_id) {
  log.Repo("Start IMAGE Repo GetImageLocation");
  let location = null;

  try {
    await Sequelize.Image.findOne(
      {
        attributes: ["location"],
        where: {
          id: image_id,
        },
      },
      { transaction: tx }
    )
      .then((image) => {
        if (image === null) return;
        location = image?.location;
      })
      .catch((error) => {
        throw new Error(error);
      });

    log.Repo("Finish IMAGE Repo GetImageLocation");
    return [location, null];
  } catch (error) {
    log.Error("Finish IMAGE Repo GetImageLocation with error", error);
    return [null, error];
  }
}

async function GetImageByLocation(tx, location) {
  log.Repo("Start IMAGE Repo GetImageByLocation");
  let image = null;

  try {
    fs.readFile(location, "utf8", (err, data) => {
      if (err) {
        console.log("err-repo: ", err);
        return;
      }
      console.log("data-repo: ", data);
    });

    log.Repo("Finish IMAGE Repo GetImageByLocation");
    return [image, null];
  } catch (error) {
    log.Error("Finish IMAGE Repo GetImageByLocation with error", error);
    return [null, error];
  }
}
