const express = require("express");

const noticesController = require("../../controllers/notices");

const { schemas } = require("../../schemas/notice.schema");
// const { schemas } = require("../../schemas/notice.schema");
const {
  userAuthMiddleware,
  upload,
  uploadCloud,
} = require("../../middlewares");
const { controllerWrapper } = require("../../services");

const router = express.Router();

router.get("/", noticesController.getCategory);
router.get("/find", controllerWrapper(noticesController.getNoticesList));
router.get(
  "/user",
  userAuthMiddleware,
  controllerWrapper(noticesController.getNoticesByOwnerId)
);
router.get("/:id", controllerWrapper(noticesController.getOneNotice));
router.post(
  "/",
  // upload.single("image"),
  uploadCloud.single("avatar"),
  userAuthMiddleware,
  controllerWrapper(noticesController.addNotice)
);

module.exports = router;
