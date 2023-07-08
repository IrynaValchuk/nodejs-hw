const express = require("express");
const { register, login } = require("../../controllers/users");
const { controllerWrap } = require("../../helpers");
const { validateBody } = require("../../middlewares");
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

module.exports = router;
