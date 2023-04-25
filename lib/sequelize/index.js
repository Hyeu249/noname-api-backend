const { Sequelize } = require("sequelize");

const User = require("./user");
const Image = require("./image");
const { ParseDbStr } = require("./support");

class Sequelize_ {
  constructor() {}

  static Open = OpenConnection;
  static Schema = {
    Create: CreateSchema,
  };
  static User = User.Modal;
  static Image = Image.Modal;
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

    sequelizeDb.sync();
    return null;
  } catch (error) {
    return error;
  }
}
