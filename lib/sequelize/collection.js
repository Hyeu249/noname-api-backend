const { DataTypes, Model } = require("sequelize");

class Collection extends Model {}

class Collection_ {
  constructor() {}
  static Schema = {
    Init: Init,
  };
  static Relation = {
    Init: InitRelation,
  };
  static Modal = Collection;
}

module.exports = Collection_;

function Init(sequelizeDb) {
  Collection.init(
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
    },
    {
      // Other model options go here
      sequelize: sequelizeDb, // We need to pass the connection instance
      modelName: "Collection", // We need to choose the model name,
      underscored: true,
      paranoid: true,
    }
  );

  if (Collection === sequelizeDb.models.Collection) {
    return [null];
  } else {
    return ["Can't init Collection model"];
  }
}

function InitRelation({ User, CollectionCollectionRelation }) {
  Collection.belongsTo(User, {
    foreignKey: {
      allowNull: false,
      name: "user_id",
    },
  });
}
