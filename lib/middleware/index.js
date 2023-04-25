const { StatusCodes } = require("http-status-codes");

const domain = require("@server/internal/domain");
const Sequelize = require("@server/lib/sequelize");
const Jwt = require("@server/lib/jwt");

const { UNAUTHORIZED } = StatusCodes;

const ValidateUserAccessJWT = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");

    const decoded = Jwt.VerifyToken(token);
    const user = await Sequelize.User.findOne({ attributes: ["id"], where: { id: decoded.user_id } });

    if (!user) {
      throw new Error("Can't get user.");
    }

    req.token = token;
    req.user_id = user.id;
    next();
  } catch (error) {
    res.status(UNAUTHORIZED).send({ error: domain.PleaseAuthenticate });
  }
};

module.exports = [ValidateUserAccessJWT];
