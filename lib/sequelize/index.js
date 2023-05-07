const { Sequelize, Op } = require("sequelize");

const User = require("./user");
const Image = require("./image");
const ProductType = require("./product_type");
const Product = require("./product");
const Collection = require("./collection");
const ProductCollectionRelation = require("./product_collection_relation");
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
  static Product = Product.Modal;
  static Collection = Collection.Modal;
  static ProductCollectionRelation = ProductCollectionRelation.Modal;
  static Op = Op;
}
module.exports = Sequelize_;

const modals = {
  User: User.Modal,
  Image: Image.Modal,
  ProductType: ProductType.Modal,
  Product: Product.Modal,
  Collection: Collection.Modal,
  ProductCollectionRelation: ProductCollectionRelation.Modal,
};

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
    var [err] = Product.Schema.Init(sequelizeDb);
    if (err !== null) {
      throw new Error(err);
    }
    var [err] = Collection.Schema.Init(sequelizeDb);
    if (err !== null) {
      throw new Error(err);
    }
    var [err] = ProductCollectionRelation.Schema.Init(sequelizeDb);
    if (err !== null) {
      throw new Error(err);
    }

    User.Relation.Init(modals); // paranoid
    Image.Relation.Init(modals); // paranoid
    ProductType.Relation.Init(modals);
    Product.Relation.Init(modals);
    Collection.Relation.Init(modals);
    ProductCollectionRelation.Relation.Init(modals);

    sequelizeDb.sync({ force: true });
    return null;
  } catch (error) {
    return error;
  }
}
