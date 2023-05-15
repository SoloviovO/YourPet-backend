const express = require("express");
const authController = require("../../controllers/auth");
const { controllerWrapper } = require("../../services");
const { userAuthMiddleware, passport } = require("../../middlewares");

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  controllerWrapper(authController.googleAuth)
);

router.post("/register", controllerWrapper(authController.signUp));

router.post("/login", controllerWrapper(authController.signIn));

router.post("/refresh", controllerWrapper(authController.refresh));

router.post(
  "/logout",
  userAuthMiddleware,
  controllerWrapper(authController.logout)
);

module.exports = router;
