const express = require("express");

const ctrl = require("../../controllers/notices/notices");

// const authenticate = require("../../middlewares/authenticate");
// const validateBody = require("../../middlewares/validateBody");

const { schemas } = require("../../schemas/notice.schema");

const router = express.Router();

router.get("/", ctrl.getCategory);

// router.post(
//   "/",
//   authenticate,
//   validateBody(schemas.addNoticeSchema),
//   ctrl.addNotice
// );

module.exports = router;
