const express = require("express");
const Joi = require("joi");

const contacts = require("../../models/contacts");

const router = express.Router();

const contactsSchema = Joi.object({
  name: Joi.string()
    .pattern(/^[\p{L}\s]+$/u)
    .required()
    .messages({
      "string.pattern.base": "Invalid name. Only letters are allowed.",
      "any.required": "Missing required field.",
    }),
  email: Joi.string().email().required().messages({
    "string.email": "Invalid email format.",
    "any.required": "Missing required field.",
  }),
  phone: Joi.string()
    .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
    .required()
    .messages({
      "string.pattern.base": "Invalid phone number format. Use (XXX) XXX-XXXX.",
      "any.required": "Missing required field.",
    }),
});

router.get("/", async (_, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const result = await contacts.getContactById(id);
    if (!result) {
      return res.status(404).json({ message: "Not found" });
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      return error.details.forEach((errorDetail) => {
        return res.status(400).json({ message: errorDetail.message });
      });
    }
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const result = await contacts.removeContact(id);
    if (!result) {
      return res.status(404).json({ message: "Not found" });
    }
    res.json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    console.log(req.body);
    const { error } = contactsSchema.validate(req.body);
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Missing fields" });
    }
    if (error) {
      return error.details.forEach((errorDetail) => {
        return res.status(400).json({ message: errorDetail.message });
      });
    }
    const id = req.params.contactId;
    const result = await contacts.updateContact(id, req.body);
    if (!result) {
      return res.status(404).json({ message: "Not found" });
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
