const express = require("express");

const noticesController = require("../../controllers/notices/notices-category");

// const validateBody = require("../../middlewares/validateBody");

const { schemas } = require("../../schemas/notice.schema");
const { userAuthMiddleware } = require("../../middlewares");
const { controllerWrapper } = require("../../services");

const router = express.Router();

router.get("/", noticesController.getCategory);

router.post(
  "/",
  userAuthMiddleware,
  controllerWrapper(noticesController.addNotice)
);

module.exports = router;
