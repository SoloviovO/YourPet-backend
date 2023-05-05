const express = require("express");
const authController = require("../../controllers/auth");
const { controllerWrapper } = require("../../services");
const {
  userAuthMiddleware,
  upload,
  uploadCloud,
} = require("../../middlewares");

const router = express.Router();

router.post("/register", controllerWrapper(authController.signUp));

router.post("/login", controllerWrapper(authController.signIn));

router.post(
  "/logout",
  userAuthMiddleware,
  controllerWrapper(authController.logout)
);

router.get(
  "/current",
  userAuthMiddleware,
  controllerWrapper(authController.getCurrentUser)
);

router.patch(
  "/update",
  userAuthMiddleware,
  controllerWrapper(authController.updateUserInfo)
);

// router.patch(
//   "/avatars",
//   userAuthMiddleware,
//   upload.single("avatar"),
//   controllerWrapper(authController.updateAvatar)
// );

router.patch(
  "/avatars",
  userAuthMiddleware,
  uploadCloud.single("avatar"),
  controllerWrapper(authController.updateCloudAvatars)
);

module.exports = router;
