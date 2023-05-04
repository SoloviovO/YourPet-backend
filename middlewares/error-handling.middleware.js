const errorHandlingMiddleware = (err, req, res, next) => {
  const message = err.message || "Server error";
  const code = err.code || 500;
  res.status(code).json({ message });
};

module.exports = {
  errorHandlingMiddleware,
};
