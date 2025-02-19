const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const emailRegexp =
  /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
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
    avatarURL: {
      type: String,
      required: true,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
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
  password: Joi.string().required().min(7).messages({
    "any.required": "Missing required password field.",
  }),
});

const emailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    "string.pattern.base": "Invalid email format. Use «nick@gmail.com».",
    "any.required": "Missing required email field.",
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    "string.pattern.base": "Invalid email format. Use «nick@gmail.com».",
    "any.required": "Missing required email field.",
  }),
  password: Joi.string().required().min(7).messages({
    "any.required": "Missing required password field.",
  }),
});

const userSubscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid("starter", "pro", "business")
    .default("starter")
    .required()
    .messages({
      "any.required": "Missing field subscription",
      "any.only":
        "Allowed values for this field are: 'starter', 'pro', 'business'",
    }),
});

const userSchemas = {
  registerSchema,
  emailSchema,
  loginSchema,
  userSubscriptionSchema,
};

const User = model("user", userSchema);

module.exports = { User, userSchemas };
