const Repo = require("@server/internal/repo");
const domain = require("@server/internal/domain");
const log = require("@server/lib/log");
const help = require("@server/lib/help");

class ProductService {
  constructor() {}
  static CreateProduct = CreateProduct;
  static UpdateProduct = UpdateProduct;
  static GetProductList = GetProductList;
  static DeleteProduct = DeleteProduct;
}

module.exports = ProductService;

async function CreateProduct(db, body) {
  log.Service("Start PRODUCT CreateProduct Service");
  const tx = await db.transaction();

  try {
    var [isImageExist, err] = await Repo.ImageRepo.IsImageExist(tx, body.image_id);
    if (err !== null) {
      throw new Error(err);
    }
    if (!isImageExist) {
      throw new Error(domain.ImageIsNotFound);
    }

    var [isPrintingImage, err] = await Repo.ImageRepo.IsPrintingImage(tx, body.image_id);
    if (err !== null) {
      throw new Error(err);
    }
    if (!isPrintingImage) {
      throw new Error(domain.ThisIsNotPrintingImage);
    }

    var [isProductTypeExist, err] = await Repo.ProductTypeRepo.IsProductTypeExist(tx, body.product_type_id);
    if (err !== null) {
      throw new Error(err);
    }
    if (!isProductTypeExist) {
      throw new Error(domain.ProductTypeIsNotFound);
    }

    //insert new product
    var err = await Repo.ProductRepo.InsertNewProduct(tx, body);
    if (err !== null) {
      throw new Error(err);
    }

    await tx.commit();
    log.Service("Finish PRODUCT CreateProduct Service");
    return null;
  } catch (error) {
    await tx.rollback();
    const parseError = help.ParseErrorMessage(error.message);

    log.Error("Finish PRODUCT CreateProduct Service with error", error);
    return parseError;
  }
}

async function UpdateProduct(db, body, product_id) {
  log.Service("Start PRODUCT UpdateProduct Service");
  const tx = await db.transaction();

  try {
    var [isProductExist, err] = await Repo.ProductRepo.IsProductExist(tx, product_id);
    if (err !== null) {
      throw new Error(err);
    }
    if (!isProductExist) {
      throw new Error(domain.ProductIsNotFound);
    }

    if (body.image_id !== undefined) {
      var [isImageExist, err] = await Repo.ImageRepo.IsImageExist(tx, body.image_id);
      if (err !== null) {
        throw new Error(err);
      }
      if (!isImageExist) {
        throw new Error(domain.ImageIsNotFound);
      }

      var [isPrintingImage, err] = await Repo.ImageRepo.IsPrintingImage(tx, body.image_id);
      if (err !== null) {
        throw new Error(err);
      }
      if (!isPrintingImage) {
        throw new Error(domain.ThisIsNotPrintingImage);
      }
    }

    if (body.product_type_id !== undefined) {
      var [isProductTypeExist, err] = await Repo.ProductTypeRepo.IsProductTypeExist(tx, body.product_type_id);
      if (err !== null) {
        throw new Error(err);
      }
      if (!isProductTypeExist) {
        throw new Error(domain.ProductTypeIsNotFound);
      }
    }

    //insert new product
    var err = await Repo.ProductRepo.UpdateProduct(tx, body, product_id);
    if (err !== null) {
      throw new Error(err);
    }

    await tx.commit();
    log.Service("Finish PRODUCT UpdateProduct Service");
    return null;
  } catch (error) {
    await tx.rollback();
    const parseError = help.ParseErrorMessage(error.message);

    log.Error("Finish PRODUCT UpdateProduct Service with error", error);
    return parseError;
  }
}

async function GetProductList(db, body, user_id) {
  log.Service("Start PRODUCT GetProductList Service");
  const tx = await db.transaction();

  try {
    //check id
    if (body.id !== undefined) {
      var [isProductExist, err] = await Repo.ProductRepo.IsProductExist(tx, body.id);
      if (err !== null) {
        throw new Error(err);
      }
      if (!isProductExist) {
        throw new Error(domain.ProductIsNotFound);
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

      var [isPrintingImage, err] = await Repo.ImageRepo.IsPrintingImage(tx, body.image_id);
      if (err !== null) {
        throw new Error(err);
      }
      if (!isPrintingImage) {
        throw new Error(domain.ThisIsNotPrintingImage);
      }
    }

    if (body.product_type_id !== undefined) {
      var [isProductTypeExist, err] = await Repo.ProductTypeRepo.IsProductTypeExist(tx, body.product_type_id);
      if (err !== null) {
        throw new Error(err);
      }
      if (!isProductTypeExist) {
        throw new Error(domain.ProductTypeIsNotFound);
      }
    }

    //get products
    var [products, err] = await Repo.ProductRepo.GetProductList(tx, body, user_id);
    if (err !== null) {
      throw new Error(err);
    }

    await tx.commit();
    log.Service("Finish PRODUCT GetProductList Service");
    return [products, null];
  } catch (error) {
    await tx.rollback();
    const parseError = help.ParseErrorMessage(error.message);

    log.Error("Finish PRODUCT GetProductList Service with error", error);
    return [null, parseError];
  }
}

async function DeleteProduct(db, product_id) {
  log.Service("Start PRODUCT DeleteProduct Service");
  const tx = await db.transaction();

  try {
    //check id
    var [isProductExist, err] = await Repo.ProductRepo.IsProductExist(tx, product_id);
    if (err !== null) {
      throw new Error(err);
    }
    if (!isProductExist) {
      throw new Error(domain.ProductIsNotFound);
    }

    //detroy new product
    var err = await Repo.ProductRepo.DetroyProduct(tx, product_id);
    if (err !== null) {
      throw new Error(err);
    }

    await tx.commit();
    log.Service("Finish PRODUCT DeleteProduct Service");
    return null;
  } catch (error) {
    await tx.rollback();
    const parseError = help.ParseErrorMessage(error.message);

    log.Error("Finish PRODUCT DeleteProduct Service with error", error);
    return parseError;
  }
}
