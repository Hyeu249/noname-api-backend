const { Sequelize } = require("sequelize");

const User = require("./user");
const { ParseDbStr } = require("./support");

class Sequelize_ {
  constructor() {}

  static Open = OpenConnection;
  static Schema = {
    Create: CreateSchema,
  };
  static User = User.Modal;
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
    const [err] = User.Schema.Init(sequelizeDb);
    if (err !== null) {
      throw new Error(err);
    }

    sequelizeDb.sync({ force: true });
    return null;
  } catch (error) {
    return error;
  }
}
