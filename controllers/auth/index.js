const { getCurrentUser } = require("./get-currentUser");
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
};
