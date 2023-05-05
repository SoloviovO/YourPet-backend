const express = require("express");
const newsController = require("../../controllers/news");
const { controllerWrapper } = require("../../services");

const router = express.Router();

router.get("/", controllerWrapper(newsController.news));

module.exports = router;
