const express = require("express");
const authController = require("../../controllers/users");
const { controllerWrapper } = require("../../services");
const { userAuthMiddleware, handleUpload } = require("../../middlewares");

const router = express.Router();

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

router.patch(
  "/avatars",
  handleUpload,
  userAuthMiddleware,
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
