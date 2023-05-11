const { UserModel } = require("../../database/models");
const cloudinary = require("cloudinary").v2;

const updateCloudAvatars = async (req, res) => {
  // const { _id } = req.user;

  // const result = await cloudinary.uploader.upload(req.file.path);
  // if (!result) {
  //   throw createHttpException(400, "Error download");
  // }
  // await UserModel.findByIdAndUpdate(_id, { image: result.secure_url });

  // res.json({ image: result.secure_url });
  const { _id } = req.user;

  await UserModel.findByIdAndUpdate(_id, { image: req.file.path });

  res.json({ image: req.file.path });
};

module.exports = {
  updateCloudAvatars,
};
