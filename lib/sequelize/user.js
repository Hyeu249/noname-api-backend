const { DataTypes, Model } = require("sequelize");

class User extends Model {}

class User_ {
  constructor() {}
  static Schema = {
    Init: Init,
  };
  static Relation = {
    Init: InitRelation,
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
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      hashed_pwd: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      is_supperuser: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      // Other model options go here
      sequelize: sequelizeDb, // We need to pass the connection instance
      modelName: "User", // We need to choose the model name,
      underscored: true,
      paranoid: true,
    }
  );

  if (User === sequelizeDb.models.User) {
    return [null];
  } else {
    return ["Can't init User model"];
  }
}

function InitRelation(Image, Collection) {
  User.hasMany(Image);
  User.hasMany(Collection);
}
