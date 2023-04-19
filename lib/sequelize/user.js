const { DataTypes, Model } = require("sequelize");

class User extends Model {}

class User_ {
  constructor() {}
  static Schema = {
    Init: Init,
  };
  static Modal = User;
}

module.exports = User_;

function Init(sequelizeDb) {
  User.init(
    {
      // Model attributes are defined here
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      user_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      // Other model options go here
      sequelize: sequelizeDb, // We need to pass the connection instance
      modelName: "User", // We need to choose the model name,
      underscored: true,
    }
  );

  if (User === sequelizeDb.models.User) {
    return [null];
  } else {
    return ["Can't init User model"];
  }
}
