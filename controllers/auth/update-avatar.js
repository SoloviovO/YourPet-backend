const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");
const { UserModel } = require("../../database/models");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res, next) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;

  const filename = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, filename);
  await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join("avatars", filename);
  const smallAvatarURL = path.join("public", "avatars", filename);
  Jimp.read(smallAvatarURL, (error, filename) => {
    if (error) throw error;
    filename.cover(250, 250).quality(60).write(smallAvatarURL);
  });
  await UserModel.findByIdAndUpdate(_id, { avatarURL: smallAvatarURL });

  res.json({
    avatarURL,
  });
};

module.exports = {
  updateAvatar,
};
