const errorMessageList = {
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not found",
  409: "Conflict",
};

const createHttpException = (code, message = errorMessageList[code]) => {
  const err = new Error(message);
  err.code = code;
  return err;
};

module.exports = {
  createHttpException,
};
