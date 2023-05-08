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

router.post("/refresh", controllerWrapper(authController.refresh));

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

//Version for save images in our folder
// router.patch(
//   "/avatars",
//   userAuthMiddleware,
//   upload.single("avatar"),
//   controllerWrapper(authController.updateAvatar)
// );

//Version for save images in cloud
router.patch(
  "/avatars",
  userAuthMiddleware,
  uploadCloud.single("avatar"),
  controllerWrapper(authController.updateCloudAvatars)
);

router.get(
  "/favorite",
  userAuthMiddleware,
  controllerWrapper(authController.getFavoriteNotices)
);

router.post(
  "/favorite/:id",
  userAuthMiddleware,
  controllerWrapper(authController.addNoticeToFavirite)
);

router.delete(
  "/favorite/:id",
  userAuthMiddleware,
  controllerWrapper(authController.deleteFavoriteNitice)
);

module.exports = router;
