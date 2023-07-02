const Joi = require("joi");

const statusContactSchema = Joi.object({
  favorite: Joi.boolean().default(false).required().messages({
    "any.required": "Missing field favorite",
  }),
});

module.exports = statusContactSchema;
