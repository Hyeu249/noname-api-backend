module.exports = function PersistentFlags() {
  return {
    StringVar: (describe, defaultValue, alias, demandOption = false) => {
      return {
        alias: alias,
        demandOption: demandOption,
        default: defaultValue,
        describe: describe,
        type: "string",
      };
    },
    IntVar: (describe, defaultValue, alias, demandOption = false) => {
      return {
        alias: alias,
        demandOption: demandOption,
        default: defaultValue,
        describe: describe,
        type: "number",
      };
    },
    BoolVarP: (describe, alias, defaultValue = false, demandOption = false) => {
      return {
        alias: alias,
        demandOption: demandOption,
        default: defaultValue,
        describe: describe,
        type: "boolean",
      };
    },
  };
};
