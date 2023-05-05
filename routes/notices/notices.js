const express = require("express");
const router = express.Router();
const { controllerWrapper } = require("../../services");
const ctrlNotice = require("../../controllers/notices");

router.get("/", controllerWrapper(ctrlNotice.getNoticesList));

module.exports = router;
