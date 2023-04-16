const { User } = require("@server/lib/sequelize/model/model");

module.exports = {
  createUser: createUser,
};

const internalDataBaseError = "Database insert error.";

async function createUser(body) {
  let error = null;
  const { first_name, last_name } = body;

  await User.create({ first_name, last_name })
    .then(() => {})
    .catch((err) => {
      error = internalDataBaseError;
    });
  return error;
}
