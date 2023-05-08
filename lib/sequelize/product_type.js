const { DataTypes, Model } = require("sequelize");

class ProductType extends Model {}

class ProductType_ {
  constructor() {}
  static Schema = {
    Init: Init,
  };
  static Relation = {
    Init: InitRelation,
  };
  static Modal = ProductType;
}

module.exports = ProductType_;

function Init(sequelizeDb) {
  ProductType.init(
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
      base_cost: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      colors: {
        type: DataTypes.ARRAY(arrayEnum()),
        allowNull: false,
      },
    },
    {
      // Other model options go here
      sequelize: sequelizeDb, // We need to pass the connection instance
      modelName: "ProductType", // We need to choose the model name,
      underscored: true,
      paranoid: true,
    }
  );

  if (ProductType === sequelizeDb.models.ProductType) {
    return [null];
  } else {
    return ["Can't init ProductType model"];
  }
}

function arrayEnum() {
  return DataTypes.ENUM({
    values: ["#f4f4f4", "#1a1a1a", "#0a1339", "#3a4b98", "#9f0110", "#134522", "#4b256e"],
  });
}

function InitRelation({ Image, Product }) {
  ProductType.hasMany(Product);
  ProductType.belongsTo(Image, {
    foreignKey: {
      allowNull: false,
      name: "image_id",
    },
  });
}
