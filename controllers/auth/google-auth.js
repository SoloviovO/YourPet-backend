const { UserModel } = require("../../database/models");
const crypto = require("crypto");
const { createJWT, createRefresh } = require("../../services");

const { FRONTEND_URL } = process.env;

const googleAuth = async (req, res, next) => {
  const { _id: id } = req.user;

  const sessionKey = crypto.randomUUID();
  await UserModel.findByIdAndUpdate(id, { sessionKey });

  const accessJWT = createJWT({
    userId: String(id),
    sessionKey,
  });

  const refreshJWT = createRefresh({
    userId: String(id),
    sessionKey,
  });

  res.redirect(
    `${FRONTEND_URL}?accessToken=${accessJWT}&refreshToken=${refreshJWT}`
  );
};

module.exports = {
  googleAuth,
};
