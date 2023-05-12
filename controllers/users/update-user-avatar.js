const { UserModel } = require("../../database/models");

const updateCloudAvatars = async (req, res) => {
  const { _id } = req.user;

  await UserModel.findByIdAndUpdate(_id, { image: req.file.path });

  res.json({ image: req.file.path });
};

module.exports = {
  updateCloudAvatars,
};
