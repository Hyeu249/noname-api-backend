const domain = require("@server/internal/domain");
const help = require("@server/lib/help");

class Validator {
  #structKeys = [];
  #error = null;
  constructor(req, struct) {
    this.req = req;
    this.struct = struct;
    this.result = {};

    //for private
    this.#structKeys = Object.keys(struct);
  }

  Bind() {
    const req = this.req;
    const struct = this.struct;
    const structKeys = this.#structKeys;
    try {
      //bind every field value
      for (const key of structKeys) {
        var [fieldName, err] = this.#getFieldNameFromTags(struct[key].tags);
        if (err !== null) {
          throw new Error(err);
        }
        //check and assign value
        if (req[fieldName] === undefined) continue;

        if (struct[key].type.includes(typeof req[fieldName])) {
          struct[key].value = req[fieldName];
        } else {
          throw new Error(domain.MalformedJSONErrResMsg);
        }
      }
    } catch (error) {
      this.#error = error;
      return this;
    }
    return this;
  }
  ValidateStruct() {
    const struct = this.struct;
    const structKeys = this.#structKeys;
    try {
      if (this.#error !== null) throw new Error(this.#error);

      for (const key of structKeys) {
        var [validateTags, err] = this.#getValidateTags(key);
        if (err !== null) throw new Error(err);

        //check required
        if (validateTags.includes("required")) {
          if (struct[key].value === undefined) throw new Error(domain.RequiredFieldError);
        }

        //check gte
        if (validateTags.includes("gte")) {
          var [isGte, err] = this.#validateGte(validateTags, key);
          if (err !== null) throw new Error(err);
          if (!isGte) throw new Error(domain.GteValidationFailed);
        }
      }
    } catch (error) {
      this.#error = error;
      return this;
    }
    return this;
  }
  Parse() {
    const structKeys = Object.keys(this.struct);
    const result = this.result;
    try {
      if (this.#error !== null) throw new Error(this.#error);

      for (const field of structKeys) {
        const value = this.struct[field].value;
        result[field] = value;
      }
    } catch (error) {
      const parseError = help.ParseErrorMessage(error.message);

      switch (parseError) {
        case domain.MissingStructTags:
          return [null, domain.MissingStructTags];
        case domain.StructTagFormatWithoutColon:
          return [null, domain.StructTagFormatWithoutColon];
        case domain.StructDontHaveFieldName:
          return [null, domain.StructDontHaveFieldName];
        case domain.MalformedJSONErrResMsg:
          return [null, domain.MalformedJSONErrResMsg];
        case domain.RequiredFieldError:
          return [null, domain.RequiredFieldError];
        case domain.GteStructMustHaveEqualSign:
          return [null, domain.GteStructMustHaveEqualSign];
        case domain.GteStructMissingValue:
          return [null, domain.GteStructMissingValue];
        case domain.GteValidationFailed:
          return [null, domain.GteValidationFailed];
        default:
          return [null, domain.InternalErorAtValidation];
      }
    }
    return [result, null];
  }
  #getFieldNameFromTags(tags) {
    let fieldName;
    try {
      const splitTags = tags?.split(" ");
      if (!(splitTags?.length >= 0)) throw new Error(domain.MissingStructTags);
      const rawFieldNameFromTag = splitTags.find((tag) => tag.includes("json") || tag.includes("query"));

      if (!rawFieldNameFromTag.includes(":")) throw new Error(domain.StructTagFormatWithoutColon);
      const rightTarget = rawFieldNameFromTag?.split(":")[1];

      if (rightTarget.includes('"')) fieldName = rightTarget.replaceAll('"', "");
      if (rightTarget.includes("'")) fieldName = rightTarget.replaceAll("'", "");
      if (fieldName === undefined) fieldName = rightTarget;
    } catch (error) {
      return [null, error];
    }

    return [fieldName, null];
  }
  #validateGte(tags, key) {
    const struct = this.struct;

    try {
      const gte = tags
        .split(",")
        .find((v) => v.includes("gte"))
        .replaceAll('"', "");
      if (!gte.includes("=")) throw new Error(domain.GteStructMustHaveEqualSign);
      const splitGte = gte.split("=");
      if (splitGte[1] === "") throw new Error(domain.GteStructMissingValue);
      const gteNumber = Number(splitGte[1]);
      if (struct[key].value < gteNumber) return [false, null];
    } catch (error) {
      return [null, error];
    }
    return [true, null];
  }
  #getValidateTags(key) {
    const struct = this.struct;
    let validateTags = null;
    try {
      const splitTags = struct[key].tags?.split(" ");
      if (!(splitTags?.length >= 0)) throw new Error(domain.MissingStructTags);
      validateTags = splitTags?.find((tag) => tag.includes("validate"));
    } catch (error) {
      return [null, error];
    }
    return [validateTags, null];
  }
}

module.exports = Validator;
