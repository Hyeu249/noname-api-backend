const Repo = require("@server/internal/repo");
const domain = require("@server/internal/domain");
const log = require("@server/lib/log");
const help = require("@server/lib/help");

class ProductTypeService {
  constructor() {}
  static CreateProductType = CreateProductType;
  static UpdateProductType = UpdateProductType;
  static GetProductTypeList = GetProductTypeList;
  static DeleteProductType = DeleteProductType;
}

module.exports = ProductTypeService;

async function CreateProductType(db, body) {
  log.Service("Start PRODUCT_TYPE CreateProductType Service");
  const tx = await db.transaction();

  try {
    var [isImageExist, err] = await Repo.ImageRepo.IsImageExist(tx, body.image_id);
    if (err !== null) {
      throw new Error(err);
    }
    if (!isImageExist) {
      throw new Error(domain.ImageIsNotFound);
    }

    var [isSampleImage, err] = await Repo.ImageRepo.IsSampleImage(tx, body.image_id);
    if (err !== null) {
      throw new Error(err);
    }
    if (!isSampleImage) {
      throw new Error(domain.ThisIsNotSampleImage);
    }

    //insert new productType
    var err = await Repo.ProductTypeRepo.InsertNewProductType(tx, body);
    if (err !== null) {
      throw new Error(err);
    }

    await tx.commit();
    log.Service("Finish PRODUCT_TYPE CreateProductType Service");
    return null;
  } catch (error) {
    await tx.rollback();
    const parseError = help.ParseErrorMessage(error.message);

    log.Error("Finish PRODUCT_TYPE CreateProductType Service with error", error);
    return parseError;
  }
}

async function UpdateProductType(db, body, product_type_id) {
  log.Service("Start PRODUCT_TYPE UpdateProductType Service");
  const tx = await db.transaction();

  try {
    var [isProductTypeExist, err] = await Repo.ProductTypeRepo.IsProductTypeExist(tx, product_type_id);
    if (err !== null) {
      throw new Error(err);
    }
    if (!isProductTypeExist) {
      throw new Error(domain.ProductTypeIsNotFound);
    }

    if (body.image_id !== undefined) {
      var [isImageExist, err] = await Repo.ImageRepo.IsImageExist(tx, body.image_id);
      if (err !== null) {
        throw new Error(err);
      }
      if (!isImageExist) {
        throw new Error(domain.ImageIsNotFound);
      }

      var [isSampleImage, err] = await Repo.ImageRepo.IsSampleImage(tx, body.image_id);
      if (err !== null) {
        throw new Error(err);
      }
      if (!isSampleImage) {
        throw new Error(domain.ThisIsNotSampleImage);
      }
    }

    //insert new productType
    var err = await Repo.ProductTypeRepo.UpdateProductType(tx, body, product_type_id);
    if (err !== null) {
      throw new Error(err);
    }

    await tx.commit();
    log.Service("Finish PRODUCT_TYPE UpdateProductType Service");
    return null;
  } catch (error) {
    await tx.rollback();
    const parseError = help.ParseErrorMessage(error.message);

    log.Error("Finish PRODUCT_TYPE UpdateProductType Service with error", error);
    return parseError;
  }
}

async function GetProductTypeList(db, body) {
  log.Service("Start PRODUCT_TYPE GetProductTypeList Service");
  const tx = await db.transaction();

  try {
    //check id
    if (body.id !== undefined) {
      var [isProductTypeExist, err] = await Repo.ProductTypeRepo.IsProductTypeExist(tx, body.id);
      if (err !== null) {
        throw new Error(err);
      }
      if (!isProductTypeExist) {
        throw new Error(domain.ProductTypeIsNotFound);
      }
    }

    if (body.image_id !== undefined) {
      var [isImageExist, err] = await Repo.ImageRepo.IsImageExist(tx, body.image_id);
      if (err !== null) {
        throw new Error(err);
      }
      if (!isImageExist) {
        throw new Error(domain.ImageIsNotFound);
      }

      var [isSampleImage, err] = await Repo.ImageRepo.IsSampleImage(tx, body.image_id);
      if (err !== null) {
        throw new Error(err);
      }
      if (!isSampleImage) {
        throw new Error(domain.ThisIsNotSampleImage);
      }
    }

    //get productTypes
    var [productTypes, err] = await Repo.ProductTypeRepo.GetProductTypeList(tx, body);
    if (err !== null) {
      throw new Error(err);
    }

    await tx.commit();
    log.Service("Finish PRODUCT_TYPE GetProductTypeList Service");
    return [productTypes, null];
  } catch (error) {
    await tx.rollback();
    const parseError = help.ParseErrorMessage(error.message);

    log.Error("Finish PRODUCT_TYPE GetProductTypeList Service with error", error);
    return [null, parseError];
  }
}

async function DeleteProductType(db, product_type_id) {
  log.Service("Start PRODUCT_TYPE DeleteProductType Service");
  const tx = await db.transaction();

  try {
    //check id
    var [isProductTypeExist, err] = await Repo.ProductTypeRepo.IsProductTypeExist(tx, product_type_id);
    if (err !== null) {
      throw new Error(err);
    }
    if (!isProductTypeExist) {
      throw new Error(domain.ProductTypeIsNotFound);
    }

    //detroy new productType
    var err = await Repo.ProductTypeRepo.DetroyProductType(tx, product_type_id);
    if (err !== null) {
      throw new Error(err);
    }

    await tx.commit();
    log.Service("Finish PRODUCT_TYPE DeleteProductType Service");
    return null;
  } catch (error) {
    await tx.rollback();
    const parseError = help.ParseErrorMessage(error.message);

    log.Error("Finish PRODUCT_TYPE DeleteProductType Service with error", error);
    return parseError;
  }
}
