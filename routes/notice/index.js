const express = require("express");

const noticesController = require("../../controllers/notices");

// const { schemas } = require("../../schemas/notice.schema");
const { userAuthMiddleware } = require("../../middlewares");
const { controllerWrapper } = require("../../services");

const router = express.Router();

router.get("/", noticesController.getCategory);
router.get("/find", controllerWrapper(noticesController.getNoticesList));
router.get("/:id", controllerWrapper(noticesController.getOneNotice));
router.post(
  "/",
  userAuthMiddleware,
  controllerWrapper(noticesController.addNotice)
);

module.exports = router;
