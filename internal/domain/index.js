const userDomain = require("./user");

const Var = {
  InternalServerError: "Something bad happened in our server. Please contact the Administrator.",
  InternalDataBaseError: "Database insert error.",
  //validate
  MalformedJSONErrResMsg: "Payload is in wrong JSON format.",
  validationFailureErrResMsg: "Validation failed.",
  InternalErorAtValidation: "Internal error at validation.",

  RequiredFieldError: "Error! Missing Required Field.",
  GteValidationFailed: "Error! gte validation failed",
  PayloadEmailInvalid: "Payload email invalid.",
  StructTagFormatWithoutColon: "Struct tag format without colon.",
  StructDontHaveFieldName: "Error! struct don't have field name.",
  GteStructMustHaveEqualSign: "Error! gte struct must have equal sign.",
  ErrorMessageIsNotString: "Error! message is not string.",
  InternalErrorSplitMessage: "Internal error split message.",
  MissingStructTags: "Missing Struct Tags.",
  GteStructMissingValue: "Gte struct missing value.",
};

module.exports = {
  ...Var,
  //other
  ...userDomain,
};
