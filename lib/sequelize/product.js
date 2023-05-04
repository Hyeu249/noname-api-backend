const { DataTypes, Model } = require("sequelize");

class Product extends Model {}

class Product_ {
  constructor() {}
  static Schema = {
    Init: Init,
  };
  static Modal = Product;
}

module.exports = Product_;

function Init(sequelizeDb) {
  Product.init(
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
      x_size: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
      },
      y_size: {
        type: DataTypes.DECIMAL(3, 1),
        allowNull: false,
      },
      layout: {
        type: DataTypes.ENUM,
        values: ["1", "2"],
        allowNull: false,
      },
      cost: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      discount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      colors: {
        type: DataTypes.ARRAY(string()),
        allowNull: false,
      },
    },
    {
      // Other model options go here
      sequelize: sequelizeDb, // We need to pass the connection instance
      modelName: "Product", // We need to choose the model name,
      underscored: true,
      paranoid: true,
    }
  );

  if (Product === sequelizeDb.models.Product) {
    return [null];
  } else {
    return ["Can't init Product model"];
  }
}

function string() {
  return DataTypes.STRING;
}
