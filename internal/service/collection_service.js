const Repo = require("@server/internal/repo");
const domain = require("@server/internal/domain");
const log = require("@server/lib/log");
const help = require("@server/lib/help");

class CollectionService {
  constructor() {}
  static CreateCollection = CreateCollection;
  static UpdateCollection = UpdateCollection;
  static GetCollectionList = GetCollectionList;
  static DeleteCollection = DeleteCollection;
}

module.exports = CollectionService;

async function CreateCollection(db, body, user_id) {
  log.Service("Start COLLECTION CreateCollection Service");
  const tx = await db.transaction();

  try {
    //insert new collection
    var err = await Repo.CollectionRepo.InsertNewCollection(tx, body, user_id);
    if (err !== null) {
      throw new Error(err);
    }

    await tx.commit();
    log.Service("Finish COLLECTION CreateCollection Service");
    return null;
  } catch (error) {
    await tx.rollback();
    const parseError = help.ParseErrorMessage(error.message);

    log.Error("Finish COLLECTION CreateCollection Service with error", error);
    return parseError;
  }
}

async function UpdateCollection(db, body, collection_id) {
  log.Service("Start COLLECTION UpdateCollection Service");
  const tx = await db.transaction();

  try {
    var [isCollectionExist, err] = await Repo.CollectionRepo.IsCollectionExist(tx, collection_id);
    if (err !== null) {
      throw new Error(err);
    }
    if (!isCollectionExist) {
      throw new Error(domain.CollectionIsNotFound);
    }

    //insert new collection
    var err = await Repo.CollectionRepo.UpdateCollection(tx, body, collection_id);
    if (err !== null) {
      throw new Error(err);
    }

    await tx.commit();
    log.Service("Finish COLLECTION UpdateCollection Service");
    return null;
  } catch (error) {
    await tx.rollback();
    const parseError = help.ParseErrorMessage(error.message);

    log.Error("Finish COLLECTION UpdateCollection Service with error", error);
    return parseError;
  }
}

async function GetCollectionList(db, body, user_id) {
  log.Service("Start COLLECTION GetCollectionList Service");
  const tx = await db.transaction();

  try {
    if (body.id !== undefined) {
      var [isCollectionExist, err] = await Repo.CollectionRepo.IsCollectionExist(tx, body.id);
      if (err !== null) {
        throw new Error(err);
      }
      if (!isCollectionExist) {
        throw new Error(domain.CollectionIsNotFound);
      }
    }

    //get collections
    var [collections, err] = await Repo.CollectionRepo.GetCollectionList(tx, body, user_id);
    if (err !== null) {
      throw new Error(err);
    }

    await tx.commit();
    log.Service("Finish COLLECTION GetCollectionList Service");
    return [collections, null];
  } catch (error) {
    await tx.rollback();
    const parseError = help.ParseErrorMessage(error.message);

    log.Error("Finish COLLECTION GetCollectionList Service with error", error);
    return [null, parseError];
  }
}

async function DeleteCollection(db, collection_id) {
  log.Service("Start COLLECTION DeleteCollection Service");
  const tx = await db.transaction();

  try {
    //check id
    var [isCollectionExist, err] = await Repo.CollectionRepo.IsCollectionExist(tx, collection_id);
    if (err !== null) {
      throw new Error(err);
    }
    if (!isCollectionExist) {
      throw new Error(domain.CollectionIsNotFound);
    }

    //detroy new collection
    var err = await Repo.CollectionRepo.DetroyCollection(tx, collection_id);
    if (err !== null) {
      throw new Error(err);
    }

    await tx.commit();
    log.Service("Finish COLLECTION DeleteCollection Service");
    return null;
  } catch (error) {
    await tx.rollback();
    const parseError = help.ParseErrorMessage(error.message);

    log.Error("Finish COLLECTION DeleteCollection Service with error", error);
    return parseError;
  }
}
