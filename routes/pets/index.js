const express = require("express");

const petsController = require("../../controllers/pets");

const { userAuthMiddleware, uploadCloud } = require("../../middlewares");
const { controllerWrapper } = require("../../services");

const router = express.Router();

router.post(
  "/",
  userAuthMiddleware,
  uploadCloud.single("avatar"),
  controllerWrapper(petsController.addUserPet)
);

router.delete(
  "/:id",
  userAuthMiddleware,
  controllerWrapper(petsController.deleteUserPet)
);

module.exports = router;
