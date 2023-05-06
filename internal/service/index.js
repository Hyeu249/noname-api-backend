const UserService = require("./user_service");
const ImageService = require("./image_service");
const ProductTypeService = require("./product_type_service");
const ProductService = require("./product_service");
const CollectionService = require("./collection_service");
const ProductCollectionRelationService = require("./product_collection_relation_service");

class Service {
  constructor() {}
  static UserService = UserService;
  static ImageService = ImageService;
  static ProductTypeService = ProductTypeService;
  static ProductService = ProductService;
  static CollectionService = CollectionService;
  static ProductCollectionRelationService = ProductCollectionRelationService;
}
module.exports = Service;
