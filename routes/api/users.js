const express = require("express");
const {
  register,
  login,
  logout,
  getCurrent,
  updateUserSubscription,
  updateAvatar,
} = require("../../controllers/users");
const { controllerWrap } = require("../../helpers");
const {
  validateBody,
  authenticate,
  statusValidateBody,
  upload,
} = require("../../middlewares");
const {
  userSchemas: { registerSchema, loginSchema, userSubscriptionSchema },
} = require("../../models");

const router = express.Router();

router.post(
  "/register",
  validateBody(registerSchema),
  controllerWrap(register)
);

router.post("/login", validateBody(loginSchema), controllerWrap(login));

router.post("/logout", authenticate, controllerWrap(logout));

router.get("/current", authenticate, controllerWrap(getCurrent));

router.patch(
  "/",
  authenticate,
  statusValidateBody(userSubscriptionSchema),
  controllerWrap(updateUserSubscription)
);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  controllerWrap(updateAvatar)
);

module.exports = router;
