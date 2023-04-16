const { Sequelize } = require("sequelize");
const model = require("./model/model");
const { ParseDbStr } = require("./support");

module.exports = {
  open: openConnection,
  schema: {
    create: createSchema,
  },
};

async function openConnection(dbType, dbStr) {
  try {
    //require dbStr var formated like username:password@protocol(host:port)/database
    const { username, password, protocol, host, port, database } = ParseDbStr(dbType, dbStr);

    const sequelizeDb = new Sequelize(database, username, password, {
      host: host,
      port: port,
      protocol: protocol,
      dialect: dbType,
      logging: false,
      // logging: (msg, msg2) => console.log(msg2),
    });
    await sequelizeDb.authenticate();
    return [sequelizeDb, null];
  } catch (error) {
    return [null, error];
  }
}

function createSchema(sequelizeDb) {
  try {
    var err = model.InitUser(sequelizeDb);
    if (err !== null) {
      throw new Error(err);
    }

    sequelizeDb.sync({ force: true });
    return null;
  } catch (error) {
    return error;
  }
}
