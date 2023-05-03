const Sequelize = require("@server/lib/sequelize");

const log = require("@server/lib/log");

class ProductTypeRepo {
  constructor() {}
  static InsertNewProductType = InsertNewProductType;
  static UpdateProductType = UpdateProductType;
  static GetProductTypeList = GetProductTypeList;
  static DetroyProductType = DetroyProductType;
  static IsProductTypeExist = IsProductTypeExist;
  static IsThisUserOwned = IsThisUserOwned;
}
module.exports = ProductTypeRepo;

async function InsertNewProductType(tx, body) {
  log.Repo("Start PRODUCT_TYPE Repo InsertNewProductType");

  try {
    const _ = await Sequelize.ProductType.create(
      {
        name: body.name,
        description: body.description,
        image_id: body.image_id,
      },
      { transaction: tx }
    );

    log.Repo("Finish PRODUCT_TYPE Repo InsertNewProductType");
    return null;
  } catch (error) {
    log.Error("Finish PRODUCT_TYPE Repo InsertNewProductType with error", error);
    return error;
  }
}

async function UpdateProductType(tx, body, product_type_id) {
  log.Repo("Start PRODUCT_TYPE Repo UpdateProductType");
  try {
    const data = {};
    if (body.name !== undefined) data.name = body.name;
    if (body.description !== undefined) data.description = body.description;
    if (body.image_id !== undefined) data.image_id = body.image_id;

    const _ = await Sequelize.ProductType.update(data, { where: { id: product_type_id }, transaction: tx });

    log.Repo("Finish PRODUCT_TYPE Repo UpdateProductType");
    return null;
  } catch (error) {
    log.Error("Finish PRODUCT_TYPE Repo UpdateProductType with error", error);
    return error;
  }
}

async function GetProductTypeList(tx, body) {
  log.Repo("Start PRODUCT_TYPE Repo GetProductTypeList");
  let offset = 0;
  let limit = 20;

  const conditions = {};
  if (body.id !== undefined) conditions.id = body.id;
  if (body.name !== undefined) conditions.name = body.name;
  if (body.description !== undefined) conditions.description = body.description;
  if (body.image_id !== undefined) conditions.image_id = body.image_id;
  if (body.offset !== undefined) offset = body.offset;
  if (body.limit !== undefined) limit = body.limit;

  try {
    const productTypes = await Sequelize.ProductType.findAndCountAll(
      {
        include: [{ model: Sequelize.Image, attributes: ["location"] }],
        where: conditions,
        offset: Number(offset),
        limit: Number(limit),
      },
      { transaction: tx }
    );

    log.Repo("Finish PRODUCT_TYPE Repo GetProductTypeList");
    return [productTypes, null];
  } catch (error) {
    log.Error("Finish PRODUCT_TYPE Repo GetProductTypeList with error", error);
    return [null, error];
  }
}

async function DetroyProductType(tx, product_type_id) {
  log.Repo("Start PRODUCT_TYPE Repo DetroyProductType");

  try {
    const _ = await Sequelize.ProductType.destroy(
      {
        where: {
          id: product_type_id,
        },
      },
      { transaction: tx }
    );

    log.Repo("Finish PRODUCT_TYPE Repo DetroyProductType");
    return null;
  } catch (error) {
    log.Error("Finish PRODUCT_TYPE Repo DetroyProductType with error", error);
    return error;
  }
}

async function IsProductTypeExist(tx, id) {
  log.Repo("Start PRODUCT_TYPE Repo IsProductTypeExist");

  try {
    const count = await Sequelize.ProductType.count(
      {
        where: {
          id: id,
        },
      },
      { transaction: tx }
    );

    log.Repo("Finish PRODUCT_TYPE Repo IsProductTypeExist");
    return [count > 0, null];
  } catch (error) {
    log.Error("Finish PRODUCT_TYPE Repo IsProductTypeExist with error", error);
    return [null, error];
  }
}

async function IsThisUserOwned(tx, product_type_id, user_id) {
  log.Repo("Start PRODUCT_TYPE Repo IsThisUserOwned");

  try {
    const count = await Sequelize.ProductType.count(
      {
        where: {
          id: product_type_id,
          user_id: user_id,
        },
      },
      { transaction: tx }
    );

    log.Repo("Finish PRODUCT_TYPE Repo IsThisUserOwned");
    return [count > 0, null];
  } catch (error) {
    log.Error("Finish PRODUCT_TYPE Repo IsThisUserOwned with error", error);
    return [null, error];
  }
}
