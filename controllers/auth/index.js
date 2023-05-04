const { getCurrentUser } = require("./get-currentUser");
const { logout } = require("./logout");
const { signIn } = require("./sign-in");
const { signUp } = require("./sign-up");
const { updateAvatar } = require("./update-avatar");

module.exports = {
  signUp,
  signIn,
  logout,
  getCurrentUser,
  updateAvatar,
};
