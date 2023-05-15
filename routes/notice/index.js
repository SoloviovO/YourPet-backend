const express = require("express");

const noticesController = require("../../controllers/notices");

const { userAuthMiddleware, uploadCloud } = require("../../middlewares");
const { controllerWrapper } = require("../../services");

const router = express.Router();

router.get("/", noticesController.getCategory);

router.get("/find", controllerWrapper(noticesController.getNoticesByTitle));

router.get(
  "/owner",
  userAuthMiddleware,
  controllerWrapper(noticesController.getOwnNoticesByTitle)
);

router.get(
  "/favorite",
  userAuthMiddleware,
  controllerWrapper(noticesController.getFavoriteNoticesByTitle)
);

router.get(
  "/user",
  userAuthMiddleware,
  controllerWrapper(noticesController.getNoticesByOwnerId)
);

router.get("/:id", controllerWrapper(noticesController.getOneNotice));

router.post(
  "/",
  uploadCloud.single("avatar"),
  userAuthMiddleware,
  controllerWrapper(noticesController.addNotice)
);

router.delete(
  "/:id",
  userAuthMiddleware,
  controllerWrapper(noticesController.deleteNotice)
);

module.exports = router;
