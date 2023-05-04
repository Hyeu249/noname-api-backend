const { Sequelize, Op } = require("sequelize");

const User = require("./user");
const Image = require("./image");
const ProductType = require("./product_type");
const { ParseDbStr } = require("./support");

class Sequelize_ {
  constructor() {}

  static Open = OpenConnection;
  static Schema = {
    Create: CreateSchema,
  };
  static User = User.Modal;
  static Image = Image.Modal;
  static ProductType = ProductType.Modal;
  static Op = Op;
}
module.exports = Sequelize_;

async function OpenConnection(dbType, dbStr) {
  try {
    //require dbStr var formated like username:password@protocol(host:port)/database
    const { username, password, protocol, host, port, database } = ParseDbStr(dbStr);

    const sequelizeDb = new Sequelize(database, username, password, {
      host: host,
      port: port,
      protocol: protocol,
      dialect: dbType,
      logging: false,
    });
    await sequelizeDb.authenticate();
    return [sequelizeDb, null];
  } catch (error) {
    return [null, error];
  }
}

function CreateSchema(sequelizeDb) {
  try {
    var [err] = User.Schema.Init(sequelizeDb);
    if (err !== null) {
      throw new Error(err);
    }
    var [err] = Image.Schema.Init(sequelizeDb);
    if (err !== null) {
      throw new Error(err);
    }
    var [err] = ProductType.Schema.Init(sequelizeDb);
    if (err !== null) {
      throw new Error(err);
    }

    //one to many for user and image
    User.Modal.hasMany(Image.Modal);
    Image.Modal.belongsTo(User.Modal, {
      foreignKey: {
        allowNull: false,
        name: "user_id",
      },
    });

    //one to one for image and product type
    Image.Modal.hasMany(ProductType.Modal);
    ProductType.Modal.belongsTo(Image.Modal, {
      foreignKey: {
        allowNull: false,
        name: "image_id",
      },
    });

    sequelizeDb.sync({ alter: true });
    return null;
  } catch (error) {
    return error;
  }
}
