const { UserModel } = require("../../database/models");

const getFavoriteNotices = async (req, res, next) => {
  const { _id } = req.user;

  const user = await UserModel.findById(_id).populate("favorite");

  res.json({ user });
};

module.exports = {
  getFavoriteNotices,
};
