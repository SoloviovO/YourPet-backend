const { UserModel } = require("../../database/models");
const cloudinary = require("cloudinary").v2;

const updateCloudAvatars = async (req, res) => {
  const { _id } = req.user;

  const result = await cloudinary.uploader.upload(req.file.path);
  await UserModel.findByIdAndUpdate(_id, { image: result.secure_url });

  res.json({ image: result.secure_url });
};

module.exports = {
  updateCloudAvatars,
};
