const express = require("express");
const router = express.Router();

const {
  addContact,
  getContactById,
  getContacts,
  removeContact,
  updateContact,
} = require("../../controllers/contacts");
const { controllerWrap } = require("../../helpers");
const { validateBody } = require("../../middlewares");
const { contactsSchema } = require("../../schemas");

router.get("/", controllerWrap(getContacts));

router.get("/:contactId", controllerWrap(getContactById));

router.post("/", validateBody(contactsSchema), controllerWrap(addContact));

router.delete("/:contactId", controllerWrap(removeContact));

router.put(
  "/:contactId",
  validateBody(contactsSchema),
  controllerWrap(updateContact)
);

module.exports = router;
