const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const emailRegexp =
  /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: String,
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Missing required name field.",
  }),
  email: Joi.string().pattern(emailRegexp).required().messages({
    "string.pattern.base": "Invalid email format. Use «nick@gmail.com».",
    "any.required": "Missing required email field.",
  }),
  password: Joi.string().required().min(7),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    "string.pattern.base": "Invalid email format. Use «nick@gmail.com».",
    "any.required": "Missing required email field.",
  }),
  password: Joi.string().required().min(7),
});

const userSchemas = {
  registerSchema,
  loginSchema,
};

const User = model("user", userSchema);

module.exports = { User, userSchemas };
