const { DataTypes, Model } = require("sequelize");

class User extends Model {}

module.exports = {
  InitUser: initUserModel,
  User: User,
};

function initUserModel(sequelizeDb) {
  User.init(
    {
      // Model attributes are defined here
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        // allowNull defaults to true
      },
    },
    {
      // Other model options go here
      sequelize: sequelizeDb, // We need to pass the connection instance
      modelName: "User", // We need to choose the model name,
      createdAt: "created_at", // I want updatedAt to actually be called created_at
      updatedAt: "updated_at", // I want updatedAt to actually be called updated_at
      indexes: [{ unique: true, fields: ["first_name"] }],
    }
  );

  if (User === sequelizeDb.models.User) {
    return null;
  } else {
    return "Can't init User model";
  }
}
