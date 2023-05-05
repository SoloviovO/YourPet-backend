const express = require("express");

const petsController = require("../../controllers/pets");

// const { schemas } = require("../../schemas");
const { userAuthMiddleware } = require("../../middlewares");
const { controllerWrapper } = require("../../services");

const router = express.Router();

router.post(
  "/",
  userAuthMiddleware,
  controllerWrapper(petsController.addUserPet)
);

module.exports = router;
