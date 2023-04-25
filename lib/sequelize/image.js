const { DataTypes, Model } = require("sequelize");

class Image extends Model {}

class Image_ {
  constructor() {}
  static Schema = {
    Init: Init,
  };
  static Modal = Image;
}

module.exports = Image_;

function Init(sequelizeDb) {
  Image.init(
    {
      // Model attributes are defined here
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      file_extention: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      // Other model options go here
      sequelize: sequelizeDb, // We need to pass the connection instance
      modelName: "Image", // We need to choose the model name,
      underscored: true,
      paranoid: true,
    }
  );

  if (Image === sequelizeDb.models.Image) {
    return [null];
  } else {
    return ["Can't init Image model"];
  }
}
