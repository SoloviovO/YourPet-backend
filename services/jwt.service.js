const jwt = require("jsonwebtoken");

const {
  JWT_SECRET,
  JWT_EXPIRES_IN_SECONDS,
  REFRESH_SECRET,
  REFRESH_EXPIRES_IN_SECONDS,
} = process.env;

const createJWT = (payload) => {
  const accessToken = jwt.sign(payload, JWT_SECRET, {
    expiresIn: `${JWT_EXPIRES_IN_SECONDS}s`,
  });

  return accessToken;
};
const createRefresh = (payload) => {
  const accessToken = jwt.sign(payload, REFRESH_SECRET, {
    expiresIn: `${REFRESH_EXPIRES_IN_SECONDS}s`,
  });

  return accessToken;
};

const veryfyJWT = (accessToken) => {
  return jwt.verify(accessToken, JWT_SECRET);
};

const veryfyRefresh = (accessToken) => {
  return jwt.verify(accessToken, REFRESH_SECRET);
};

module.exports = {
  createJWT,
  veryfyJWT,
  createRefresh,
  veryfyRefresh,
};
