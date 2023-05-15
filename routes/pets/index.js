const express = require("express");

const petsController = require("../../controllers/pets");

const { userAuthMiddleware, handleUpload } = require("../../middlewares");
const { controllerWrapper } = require("../../services");

const router = express.Router();

router.post(
  "/",
  handleUpload,
  userAuthMiddleware,
  controllerWrapper(petsController.addUserPet)
);

router.delete(
  "/:id",
  userAuthMiddleware,
  controllerWrapper(petsController.deleteUserPet)
);

module.exports = router;
