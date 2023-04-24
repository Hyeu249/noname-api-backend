const domain = require("@server/internal/domain");
const Sequelize = require("@server/lib/sequelize");
const Jwt = require("@server/lib/jwt");

const ValidateUserAccessJWT = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = Jwt.VerifyToken(token);
    const user = await Sequelize.User.findOne({ attributes: ["id"], where: { id: decoded.user_uuid } });

    if (!user) {
      throw new Error(domain.PleaseAuthenticate);
    }

    req.token = token;
    req.user_uuid = user.id;
    next();
  } catch (error) {
    res.status(401).send({ error: error });
  }
};

module.exports = { ValidateUserAccessJWT };
