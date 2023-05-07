const Sequelize = require("@server/lib/sequelize");

const log = require("@server/lib/log");

class ProductCollectionRelationRepo {
  constructor() {}
  static InsertNewProductCollectionRelation = InsertNewProductCollectionRelation;
  static UpdateProductCollectionRelation = UpdateProductCollectionRelation;
  static GetProductCollectionRelationList = GetProductCollectionRelationList;
  static DetroyProductCollectionRelation = DetroyProductCollectionRelation;
  static IsProductCollectionRelationExist = IsProductCollectionRelationExist;
}
module.exports = ProductCollectionRelationRepo;

async function InsertNewProductCollectionRelation(tx, body) {
  log.Repo("Start PRODUCT_COLLECTION_RELATION Repo InsertNewProductCollectionRelation");

  try {
    const _ = await Sequelize.ProductCollectionRelation.create(
      {
        product_id: body.product_id,
        collection_id: body.collection_id,
      },
      { transaction: tx }
    );

    log.Repo("Finish PRODUCT_COLLECTION_RELATION Repo InsertNewProductCollectionRelation");
    return null;
  } catch (error) {
    log.Error("Finish PRODUCT_COLLECTION_RELATION Repo InsertNewProductCollectionRelation with error", error);
    return error;
  }
}

async function UpdateProductCollectionRelation(tx, body, product_collection_relation_id) {
  log.Repo("Start PRODUCT_COLLECTION_RELATION Repo UpdateProductCollectionRelation");
  try {
    const data = {};
    if (body.product_id !== undefined) data.product_id = body.product_id;
    if (body.collection_id !== undefined) data.collection_id = body.collection_id;

    const _ = await Sequelize.ProductCollectionRelation.update(data, { where: { id: product_collection_relation_id }, transaction: tx });

    log.Repo("Finish PRODUCT_COLLECTION_RELATION Repo UpdateProductCollectionRelation");
    return null;
  } catch (error) {
    log.Error("Finish PRODUCT_COLLECTION_RELATION Repo UpdateProductCollectionRelation with error", error);
    return error;
  }
}

async function GetProductCollectionRelationList(tx, body) {
  log.Repo("Start PRODUCT_COLLECTION_RELATION Repo GetProductCollectionRelationList");
  let offset = 0;
  let limit = 20;
  const { Op } = Sequelize;
  const conditions = {};
  //exact condition
  if (body.offset !== undefined) offset = body.offset;
  if (body.limit !== undefined) limit = body.limit;
  if (body.id !== undefined) conditions.id = body.id;
  if (body.product_id !== undefined) conditions.product_id = body.product_id;
  if (body.collection_id !== undefined) conditions.collection_id = body.collection_id;

  try {
    const productCollectionRelations = await Sequelize.ProductCollectionRelation.findAndCountAll(
      {
        include: [
          { model: Sequelize.Product, attributes: ["name"] },
          { model: Sequelize.Collection, attributes: ["name"] },
        ],
        where: conditions,
        offset: Number(offset),
        limit: Number(limit),
      },
      { transaction: tx }
    );

    log.Repo("Finish PRODUCT_COLLECTION_RELATION Repo GetProductCollectionRelationList");
    return [productCollectionRelations, null];
  } catch (error) {
    log.Error("Finish PRODUCT_COLLECTION_RELATION Repo GetProductCollectionRelationList with error", error);
    return [null, error];
  }
}

async function DetroyProductCollectionRelation(tx, product_collection_relation_id) {
  log.Repo("Start PRODUCT_COLLECTION_RELATION Repo DetroyProductCollectionRelation");

  try {
    const _ = await Sequelize.ProductCollectionRelation.destroy(
      {
        where: {
          id: product_collection_relation_id,
        },
      },
      { transaction: tx }
    );

    log.Repo("Finish PRODUCT_COLLECTION_RELATION Repo DetroyProductCollectionRelation");
    return null;
  } catch (error) {
    log.Error("Finish PRODUCT_COLLECTION_RELATION Repo DetroyProductCollectionRelation with error", error);
    return error;
  }
}

async function IsProductCollectionRelationExist(tx, id) {
  log.Repo("Start PRODUCT_COLLECTION_RELATION Repo IsProductCollectionRelationExist");

  try {
    const count = await Sequelize.ProductCollectionRelation.count(
      {
        where: {
          id: id,
        },
      },
      { transaction: tx }
    );

    log.Repo("Finish PRODUCT_COLLECTION_RELATION Repo IsProductCollectionRelationExist");
    return [count > 0, null];
  } catch (error) {
    log.Error("Finish PRODUCT_COLLECTION_RELATION Repo IsProductCollectionRelationExist with error", error);
    return [null, error];
  }
}
