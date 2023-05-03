const { Sequelize } = require("sequelize");

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
}
module.exports = Sequelize_;

async function OpenConnection(dbType, dbStr) {
  try {
    //require dbStr var formated like username:password@protocol(host:port)/database
    const { username, password, protocol, host, port, database } = ParseDbStr(dbType, dbStr);

    const sequelizeDb = new Sequelize(database, username, password, {
      host: host,
      port: port,
      protocol: protocol,
      dialect: dbType,
      logging: false,
      // logging: (a, b, c) => console.log("err: ", b),
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
    User.Modal.hasMany(Image.Modal, {
      foreignKey: {
        allowNull: false,
        name: "user_id",
      },
    });
    Image.Modal.belongsTo(User.Modal, {
      foreignKey: {
        allowNull: false,
        name: "user_id",
      },
    });

    //one to one for image and product type
    Image.Modal.hasOne(ProductType.Modal, {
      foreignKey: {
        allowNull: false,
        // name: "image_id",
      },
    });
    ProductType.Modal.belongsTo(Image.Modal, {
      foreignKey: {
        allowNull: false,
        // name: "image_id",
      },
    });

    sequelizeDb.sync({ force: false });
    return null;
  } catch (error) {
    return error;
  }
}
