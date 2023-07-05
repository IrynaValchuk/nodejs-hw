const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const emailRegexp =
  /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
const phoneRegexp = /^\(\d{3}\) \d{3}-\d{4}$/;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },

  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Missing required name field.",
  }),
  email: Joi.string().pattern(emailRegexp).required().messages({
    "string.pattern.base": "Invalid email format. Use «nick@gmail.com».",
    "any.required": "Missing required email field.",
  }),
  phone: Joi.string().pattern(phoneRegexp).required().messages({
    "string.pattern.base": "Invalid phone number format. Use (XXX) XXX-XXXX.",
    "any.required": "Missing required phone field.",
  }),
  favorite: Joi.boolean().default(false),
});

const statusContactSchema = Joi.object({
  favorite: Joi.boolean().default(false).required().messages({
    "any.required": "Missing field favorite",
  }),
});

const contactSchemas = {
  addSchema,
  statusContactSchema,
};

const Contact = model("contact", contactSchema);

module.exports = { Contact, contactSchemas };
