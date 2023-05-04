const { getCurrentUser } = require("./get-currentUser");
const { logout } = require("./logout");
const { signIn } = require("./sign-in");
const { signUp } = require("./sign-up");

module.exports = {
  signUp,
  signIn,
  logout,
  getCurrentUser,
};
