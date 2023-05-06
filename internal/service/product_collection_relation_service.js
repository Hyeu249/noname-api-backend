const Repo = require("@server/internal/repo");
const domain = require("@server/internal/domain");
const log = require("@server/lib/log");
const help = require("@server/lib/help");

class ProductCollectionRelationService {
  constructor() {}
  static CreateProductCollectionRelation = CreateProductCollectionRelation;
  static UpdateProductCollectionRelation = UpdateProductCollectionRelation;
  static GetProductCollectionRelationList = GetProductCollectionRelationList;
  static DeleteProductCollectionRelation = DeleteProductCollectionRelation;
}

module.exports = ProductCollectionRelationService;

async function CreateProductCollectionRelation(db, body) {
  log.Service("Start PRODUCT_COLLECTION_RELATION CreateProductCollectionRelation Service");
  const tx = await db.transaction();

  try {
    var [isProductExist, err] = await Repo.ProductRepo.IsProductExist(tx, body.product_id);
    if (err !== null) {
      throw new Error(err);
    }
    if (!isProductExist) {
      throw new Error(domain.ProductIsNotFound);
    }

    var [isCollectionExist, err] = await Repo.CollectionRepo.IsCollectionExist(tx, body.collection_id);
    if (err !== null) {
      throw new Error(err);
    }
    if (!isCollectionExist) {
      throw new Error(domain.CollectionIsNotFound);
    }

    //insert new ProductCollectionRelation
    var err = await Repo.ProductCollectionRelationRepo.InsertNewProductCollectionRelation(tx, body);
    if (err !== null) {
      throw new Error(err);
    }

    await tx.commit();
    log.Service("Finish PRODUCT_COLLECTION_RELATION CreateProductCollectionRelation Service");
    return null;
  } catch (error) {
    await tx.rollback();
    const parseError = help.ParseErrorMessage(error.message);

    log.Error("Finish PRODUCT_COLLECTION_RELATION CreateProductCollectionRelation Service with error", error);
    return parseError;
  }
}

async function UpdateProductCollectionRelation(db, body, product_collection_relation_id) {
  log.Service("Start PRODUCT_COLLECTION_RELATION UpdateProductCollectionRelation Service");
  const tx = await db.transaction();

  try {
    var [isProductCollectionRelationExist, err] = await Repo.ProductCollectionRelationRepo.IsProductCollectionRelationExist(
      tx,
      product_collection_relation_id
    );
    if (err !== null) {
      throw new Error(err);
    }
    if (!isProductCollectionRelationExist) {
      throw new Error(domain.ProductCollectionRelationIsNotFound);
    }

    if (body.product_id !== undefined) {
      var [isProductExist, err] = await Repo.ProductRepo.IsProductExist(tx, body.product_id);
      if (err !== null) {
        throw new Error(err);
      }
      if (!isProductExist) {
        throw new Error(domain.ProductIsNotFound);
      }
    }

    if (body.collection_id !== undefined) {
      var [isCollectionExist, err] = await Repo.CollectionRepo.IsCollectionExist(tx, body.collection_id);
      if (err !== null) {
        throw new Error(err);
      }
      if (!isCollectionExist) {
        throw new Error(domain.CollectionIsNotFound);
      }
    }

    //insert new productCollectionRelation
    var err = await Repo.ProductCollectionRelationRepo.UpdateProductCollectionRelation(tx, body, product_collection_relation_id);
    if (err !== null) {
      throw new Error(err);
    }

    await tx.commit();
    log.Service("Finish PRODUCT_COLLECTION_RELATION UpdateProductCollectionRelation Service");
    return null;
  } catch (error) {
    await tx.rollback();
    const parseError = help.ParseErrorMessage(error.message);

    log.Error("Finish PRODUCT_COLLECTION_RELATION UpdateProductCollectionRelation Service with error", error);
    return parseError;
  }
}

async function GetProductCollectionRelationList(db, body) {
  log.Service("Start PRODUCT_COLLECTION_RELATION GetProductCollectionRelationList Service");
  const tx = await db.transaction();

  try {
    if (body.id !== undefined) {
      var [isProductCollectionRelationExist, err] = await Repo.ProductCollectionRelationRepo.IsProductCollectionRelationExist(tx, body.id);
      if (err !== null) {
        throw new Error(err);
      }
      if (!isProductCollectionRelationExist) {
        throw new Error(domain.ProductCollectionRelationIsNotFound);
      }
    }

    if (body.product_id !== undefined) {
      var [isProductExist, err] = await Repo.ProductRepo.IsProductExist(tx, body.product_id);
      if (err !== null) {
        throw new Error(err);
      }
      if (!isProductExist) {
        throw new Error(domain.ProductIsNotFound);
      }
    }

    if (body.collection_id !== undefined) {
      var [isCollectionExist, err] = await Repo.CollectionRepo.IsCollectionExist(tx, body.collection_id);
      if (err !== null) {
        throw new Error(err);
      }
      if (!isCollectionExist) {
        throw new Error(domain.CollectionIsNotFound);
      }
    }

    //get productCollectionRelations
    var [productCollectionRelations, err] = await Repo.ProductCollectionRelationRepo.GetProductCollectionRelationList(tx, body);
    if (err !== null) {
      throw new Error(err);
    }

    await tx.commit();
    log.Service("Finish PRODUCT_COLLECTION_RELATION GetProductCollectionRelationList Service");
    return [productCollectionRelations, null];
  } catch (error) {
    await tx.rollback();
    const parseError = help.ParseErrorMessage(error.message);

    log.Error("Finish PRODUCT_COLLECTION_RELATION GetProductCollectionRelationList Service with error", error);
    return [null, parseError];
  }
}

async function DeleteProductCollectionRelation(db, product_collection_relation_id) {
  log.Service("Start PRODUCT_COLLECTION_RELATION DeleteProductCollectionRelation Service");
  const tx = await db.transaction();

  try {
    //check id
    var [isProductCollectionRelationExist, err] = await Repo.ProductCollectionRelationRepo.IsProductCollectionRelationExist(
      tx,
      product_collection_relation_id
    );
    if (err !== null) {
      throw new Error(err);
    }
    if (!isProductCollectionRelationExist) {
      throw new Error(domain.ProductCollectionRelationIsNotFound);
    }

    //detroy new productCollectionRelation
    var err = await Repo.ProductCollectionRelationRepo.DetroyProductCollectionRelation(tx, product_collection_relation_id);
    if (err !== null) {
      throw new Error(err);
    }

    await tx.commit();
    log.Service("Finish PRODUCT_COLLECTION_RELATION DeleteProductCollectionRelation Service");
    return null;
  } catch (error) {
    await tx.rollback();
    const parseError = help.ParseErrorMessage(error.message);

    log.Error("Finish PRODUCT_COLLECTION_RELATION DeleteProductCollectionRelation Service with error", error);
    return parseError;
  }
}
