const Sequelize = require("@server/lib/sequelize");

const log = require("@server/lib/log");

class ProductRepo {
  constructor() {}
  static InsertNewProduct = InsertNewProduct;
  static UpdateProduct = UpdateProduct;
  static GetProductList = GetProductList;
  static DetroyProduct = DetroyProduct;
  static IsProductExist = IsProductExist;
}
module.exports = ProductRepo;

async function InsertNewProduct(tx, body) {
  log.Repo("Start PRODUCT Repo InsertNewProduct");

  try {
    const _ = await Sequelize.Product.create(
      {
        name: body.name,
        description: body.description,
        x_size: body.x_size,
        y_size: body.y_size,
        top: body.top,
        left: body.left,
        cost: body.cost,
        discount: body.discount,
        colors: body.colors,
        image_id: body.image_id,
        product_type_id: body.product_type_id,
      },
      { transaction: tx }
    );

    log.Repo("Finish PRODUCT Repo InsertNewProduct");
    return null;
  } catch (error) {
    log.Error("Finish PRODUCT Repo InsertNewProduct with error", error);
    return error;
  }
}

async function UpdateProduct(tx, body, product_id) {
  log.Repo("Start PRODUCT Repo UpdateProduct");
  try {
    const data = {};
    if (body.name !== undefined) data.name = body.name;
    if (body.description !== undefined) data.description = body.description;
    if (body.image_id !== undefined) data.image_id = body.image_id;
    if (body.product_type_id !== undefined) data.product_type_id = body.product_type_id;
    if (body.colors !== undefined) data.colors = body.colors;
    if (body.x_size !== undefined) data.x_size = body.x_size;
    if (body.y_size !== undefined) data.y_size = body.y_size;
    if (body.top !== undefined) data.top = body.top;
    if (body.left !== undefined) data.left = body.left;
    if (body.cost !== undefined) data.cost = body.cost;
    if (body.discount !== undefined) data.discount = body.discount;

    const _ = await Sequelize.Product.update(data, { where: { id: product_id }, transaction: tx });

    log.Repo("Finish PRODUCT Repo UpdateProduct");
    return null;
  } catch (error) {
    log.Error("Finish PRODUCT Repo UpdateProduct with error", error);
    return error;
  }
}

async function GetProductList(tx, body, user_id) {
  log.Repo("Start PRODUCT Repo GetProductList");
  let offset = 0;
  let limit = 20;
  const { Op } = Sequelize;

  const conditions = {};
  //exact condition
  if (body.offset !== undefined) offset = body.offset;
  if (body.limit !== undefined) limit = body.limit;
  if (body.id !== undefined) conditions.id = body.id;
  if (body.x_size !== undefined) conditions.x_size = body.x_size;
  if (body.y_size !== undefined) conditions.y_size = body.y_size;
  if (body.cost !== undefined) conditions.cost = body.cost;
  if (body.discount !== undefined) conditions.discount = body.discount;
  if (body.image_id !== undefined) conditions.image_id = body.image_id;
  if (body.product_type_id !== undefined) conditions.product_type_id = body.product_type_id;
  //like condition
  if (body.name !== undefined) conditions.name = { [Op.like]: "%" + body.name + "%" };
  if (body.description !== undefined) conditions.description = { [Op.like]: "%" + body.description + "%" };

  try {
    const products = await Sequelize.Product.findAndCountAll(
      {
        include: [
          { model: Sequelize.Image, attributes: ["location"], where: { user_id } },
          { model: Sequelize.ProductType, attributes: ["id"], include: [{ model: Sequelize.Image, attributes: ["location"] }] },
        ],
        where: conditions,
        offset: Number(offset),
        limit: Number(limit),
      },
      { transaction: tx }
    );

    log.Repo("Finish PRODUCT Repo GetProductList");
    return [products, null];
  } catch (error) {
    log.Error("Finish PRODUCT Repo GetProductList with error", error);
    return [null, error];
  }
}

async function DetroyProduct(tx, product_id) {
  log.Repo("Start PRODUCT Repo DetroyProduct");

  try {
    const _ = await Sequelize.Product.destroy(
      {
        where: {
          id: product_id,
        },
      },
      { transaction: tx }
    );

    log.Repo("Finish PRODUCT Repo DetroyProduct");
    return null;
  } catch (error) {
    log.Error("Finish PRODUCT Repo DetroyProduct with error", error);
    return error;
  }
}

async function IsProductExist(tx, id) {
  log.Repo("Start PRODUCT Repo IsProductExist");

  try {
    const count = await Sequelize.Product.count(
      {
        where: {
          id: id,
        },
      },
      { transaction: tx }
    );

    log.Repo("Finish PRODUCT Repo IsProductExist");
    return [count > 0, null];
  } catch (error) {
    log.Error("Finish PRODUCT Repo IsProductExist with error", error);
    return [null, error];
  }
}
