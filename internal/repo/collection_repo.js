const Sequelize = require("@server/lib/sequelize");

const log = require("@server/lib/log");

class CollectionRepo {
  constructor() {}
  static InsertNewCollection = InsertNewCollection;
  static UpdateCollection = UpdateCollection;
  static GetCollectionList = GetCollectionList;
  static DetroyCollection = DetroyCollection;
  static IsCollectionExist = IsCollectionExist;
}
module.exports = CollectionRepo;

async function InsertNewCollection(tx, body, user_id) {
  log.Repo("Start COLLECTION Repo InsertNewCollection");

  try {
    const _ = await Sequelize.Collection.create(
      {
        name: body.name,
        description: body.description,
        user_id: user_id,
      },
      { transaction: tx }
    );

    log.Repo("Finish COLLECTION Repo InsertNewCollection");
    return null;
  } catch (error) {
    log.Error("Finish COLLECTION Repo InsertNewCollection with error", error);
    return error;
  }
}

async function UpdateCollection(tx, body, collection_id) {
  log.Repo("Start COLLECTION Repo UpdateCollection");
  try {
    const data = {};
    if (body.name !== undefined) data.name = body.name;
    if (body.description !== undefined) data.description = body.description;

    const _ = await Sequelize.Collection.update(data, { where: { id: collection_id }, transaction: tx });

    log.Repo("Finish COLLECTION Repo UpdateCollection");
    return null;
  } catch (error) {
    log.Error("Finish COLLECTION Repo UpdateCollection with error", error);
    return error;
  }
}

async function GetCollectionList(tx, body, user_id) {
  log.Repo("Start COLLECTION Repo GetCollectionList");
  let offset = 0;
  let limit = 20;
  const { Op } = Sequelize;

  const conditions = { user_id };
  //exact condition
  if (body.offset !== undefined) offset = body.offset;
  if (body.limit !== undefined) limit = body.limit;
  if (body.id !== undefined) conditions.id = body.id;

  //like condition
  if (body.name !== undefined) conditions.name = { [Op.like]: "%" + body.name + "%" };
  if (body.description !== undefined) conditions.description = { [Op.like]: "%" + body.description + "%" };

  try {
    const collections = await Sequelize.Collection.findAndCountAll(
      {
        where: conditions,
        offset: Number(offset),
        limit: Number(limit),
      },
      { transaction: tx }
    );

    log.Repo("Finish COLLECTION Repo GetCollectionList");
    return [collections, null];
  } catch (error) {
    log.Error("Finish COLLECTION Repo GetCollectionList with error", error);
    return [null, error];
  }
}

async function DetroyCollection(tx, collection_id) {
  log.Repo("Start COLLECTION Repo DetroyCollection");

  try {
    const _ = await Sequelize.Collection.destroy(
      {
        where: {
          id: collection_id,
        },
      },
      { transaction: tx }
    );

    log.Repo("Finish COLLECTION Repo DetroyCollection");
    return null;
  } catch (error) {
    log.Error("Finish COLLECTION Repo DetroyCollection with error", error);
    return error;
  }
}

async function IsCollectionExist(tx, id) {
  log.Repo("Start COLLECTION Repo IsCollectionExist");

  try {
    const count = await Sequelize.Collection.count(
      {
        where: {
          id: id,
        },
      },
      { transaction: tx }
    );

    log.Repo("Finish COLLECTION Repo IsCollectionExist");
    return [count > 0, null];
  } catch (error) {
    log.Error("Finish COLLECTION Repo IsCollectionExist with error", error);
    return [null, error];
  }
}
