const express = require("express");
const { register, login, logout } = require("../../controllers/users");
const { controllerWrap } = require("../../helpers");
const { validateBody, authenticate } = require("../../middlewares");
const {
  userSchemas: { registerSchema, loginSchema },
} = require("../../models");

const router = express.Router();

router.post(
  "/register",
  validateBody(registerSchema),
  controllerWrap(register)
);

router.post("/login", validateBody(loginSchema), controllerWrap(login));

router.post("/logout", authenticate, controllerWrap(logout));

module.exports = router;
