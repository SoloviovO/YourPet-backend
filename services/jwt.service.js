const jwt = require("jsonwebtoken");

const {
  JWT_SECRET,
  JWT_EXPIRES_IN_SECONDS,
  REFRESH_SECRET,
  REFRESH_EXPIRES_IN_SECONDS,
} = process.env;

const createJWT = (payload) => {
  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: `${JWT_EXPIRES_IN_SECONDS}s`,
  });

  return token;
};
const createRefresh = (payload) => {
  const token = jwt.sign(payload, REFRESH_SECRET, {
    expiresIn: `${REFRESH_EXPIRES_IN_SECONDS}s`,
  });

  return token;
};

const veryfyJWT = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

const veryfyRefresh = (token) => {
  return jwt.verify(token, REFRESH_SECRET);
};

module.exports = {
  createJWT,
  veryfyJWT,
  createRefresh,
  veryfyRefresh,
};
