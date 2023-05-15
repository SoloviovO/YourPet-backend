const { errorHandlingMiddleware } = require("./error-handling.middleware");
const { uploadCloud, handleUpload } = require("./uploadCloud");
const { userAuthMiddleware } = require("./user-auth.middlewares");
const passport = require("./google-authentificate");

module.exports = {
  userAuthMiddleware,
  errorHandlingMiddleware,
  handleUpload,
  passport,
};
