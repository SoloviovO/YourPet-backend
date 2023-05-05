const express = require("express");
const friendsController = require("../../controllers/friends");
const { controllerWrapper } = require("../../services");

const router = express.Router();

router.get("/", controllerWrapper(friendsController.friends));

module.exports = router;
