const { addNoticeToFavirite } = require("./add-to-favorite");
const { deleteFavoriteNitice } = require("./delete-from-favorite");
const { getCurrentUser } = require("./get-currentUser");
const { getFavoriteNotices } = require("./get-favorite");
const { logout } = require("./logout");
const { signIn } = require("./sign-in");
const { signUp } = require("./sign-up");
const { updateAvatar } = require("./update-avatar");
const { updateCloudAvatars } = require("./update-user-avatar");
const { updateUserInfo } = require("./update-userInfo");

module.exports = {
  signUp,
  signIn,
  logout,
  getCurrentUser,
  updateAvatar,
  updateUserInfo,
  updateCloudAvatars,
  addNoticeToFavirite,
  deleteFavoriteNitice,
  getFavoriteNotices,
};
