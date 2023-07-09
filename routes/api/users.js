const express = require("express");
const {
  register,
  login,
  logout,
  getCurrent,
  updateUserSubscription,
} = require("../../controllers/users");
const { controllerWrap } = require("../../helpers");
const {
  validateBody,
  authenticate,
  statusValidateBody,
  isValidId,
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
  "/:userId",
  authenticate,
  isValidId,
  statusValidateBody(userSubscriptionSchema),
  controllerWrap(updateUserSubscription)
);

module.exports = router;
