const { DataTypes, Model } = require("sequelize");

class ProductCollectionRelation extends Model {}

class ProductCollectionRelation_ {
  constructor() {}
  static Schema = {
    Init: Init,
  };
  static Relation = {
    Init: InitRelation,
  };
  static Modal = ProductCollectionRelation;
}

module.exports = ProductCollectionRelation_;

function Init(sequelizeDb) {
  ProductCollectionRelation.init(
    {
      // Model attributes are defined here
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
    },
    {
      // Other model options go here
      sequelize: sequelizeDb, // We need to pass the connection instance
      modelName: "ProductCollectionRelation", // We need to choose the model name,
      underscored: true,
    }
  );

  if (ProductCollectionRelation === sequelizeDb.models.ProductCollectionRelation) {
    return [null];
  } else {
    return ["Can't init ProductCollectionRelation model"];
  }
}

function InitRelation({ Product, Collection }) {
  ProductCollectionRelation.belongsTo(Collection, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    foreignKey: {
      allowNull: false,
      name: "collection_id",
    },
  });
  ProductCollectionRelation.belongsTo(Product, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    foreignKey: {
      allowNull: false,
      name: "product_id",
    },
  });
}
