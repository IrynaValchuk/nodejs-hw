const Joi = require("joi");

const statusContactSchema = Joi.object({
  favorite: Joi.boolean().default(false).required().messages({
    "any.required": "Missing required favorite field.",
  }),
});

module.exports = statusContactSchema;
