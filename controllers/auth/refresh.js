const { UserModel } = require("../../database/models");
const { refreshSchema } = require("../../schemas/add-user.schema");
const {
  veryfyRefresh,
  createHttpException,
  createJWT,
  createRefresh,
} = require("../../services");

const refresh = async (req, res, next) => {
  const { refreshToken } = req.body;

  const { error } = refreshSchema.validate({ refreshToken });
  if (error) {
    throw createHttpException(400, error.message);
  }

  const tokenPayload = veryfyRefresh(refreshToken);
  const sessionKey = tokenPayload.sessionKey;
  const isExist = await UserModel.findOne({
    sessionKey: tokenPayload.sessionKey,
  });

  if (!isExist) {
    throw createHttpException(403, "Token invalid");
  }

  const accessJWT = createJWT({
    userId: String(tokenPayload.userId),
    sessionKey,
  });

  const refreshJWT = createRefresh({
    userId: String(tokenPayload.userId),
    sessionKey,
  });

  res.json({
    token: accessJWT,
    refreshToken: refreshJWT,
  });
};

module.exports = {
  refresh,
};
