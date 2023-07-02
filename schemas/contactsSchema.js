const Joi = require("joi");

const contactsSchema = Joi.object({
  name: Joi.string()
    .pattern(/^[\p{L}\s]+$/u)
    .required()
    .messages({
      "string.pattern.base": "Invalid name. Only letters are allowed.",
      "any.required": "Missing required name field.",
    }),
  email: Joi.string().email().required().messages({
    "string.email": "Invalid email format.",
    "any.required": "Missing required email field.",
  }),
  phone: Joi.string()
    .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
    .required()
    .messages({
      "string.pattern.base": "Invalid phone number format. Use (XXX) XXX-XXXX.",
      "any.required": "Missing required phone field.",
    }),
  favorite: Joi.boolean().default(false),
});

module.exports = contactsSchema;
