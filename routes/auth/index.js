const express = require("express");
const authController = require("../../controllers/auth");
const { controllerWrapper } = require("../../services");
const {
  userAuthMiddleware,
  upload,
  uploadCloud,
} = require("../../middlewares");

const router = express.Router();

router.post("/register", controllerWrapper(authController.signUp));

router.post("/login", controllerWrapper(authController.signIn));

router.post("/refresh", controllerWrapper(authController.refresh));

router.post(
  "/logout",
  userAuthMiddleware,
  controllerWrapper(authController.logout)
);

module.exports = router;
