const { UserModel } = require("../../database/models");

const logout = async (req, res, next) => {
  const user = req.user;
  await UserModel.findByIdAndUpdate(user._id, { sessionKey: null });
  res.status(204).json();
};

module.exports = {
  logout,
};
