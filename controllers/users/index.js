const { addNoticeToFavirite } = require("./add-to-favorite");
const { deleteFavoriteNitice } = require("./delete-from-favorite");
const { getCurrentUser } = require("./get-currentUser");
const { getFavoriteNotices } = require("./get-favorite");
const { updateAvatar } = require("./update-avatar");
const { updateCloudAvatars } = require("./update-user-avatar");
const { updateUserInfo } = require("./update-userInfo");

module.exports = {
  getCurrentUser,
  updateAvatar,
  updateUserInfo,
  updateCloudAvatars,
  addNoticeToFavirite,
  deleteFavoriteNitice,
  getFavoriteNotices,
};
