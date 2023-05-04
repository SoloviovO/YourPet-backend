const express = require("express");
const authController = require("../../controllers/auth");
const { controllerWrapper } = require("../../services");
const { userAuthMiddleware } = require("../../middlewares");

const router = express.Router();

router.post("/register", controllerWrapper(authController.signUp));

router.post("/login", controllerWrapper(authController.signIn));

router.post(
  "/logout",
  userAuthMiddleware,
  controllerWrapper(authController.logout)
);

router.get(
  "/current",
  userAuthMiddleware,
  controllerWrapper(authController.getCurrentUser)
);

module.exports = router;
