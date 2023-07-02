const express = require("express");
const router = express.Router();

const {
  addContact,
  getContactById,
  getContacts,
  removeContact,
  updateContact,
  updateStatusContact,
} = require("../../controllers/contacts");
const { controllerWrap } = require("../../helpers");
const {
  validateBody,
  isValidId,
  statusValidateBody,
} = require("../../middlewares");
const { contactsSchema, statusContactSchema } = require("../../schemas");

router.get("/", controllerWrap(getContacts));

router.get("/:contactId", isValidId, controllerWrap(getContactById));

router.post("/", validateBody(contactsSchema), controllerWrap(addContact));

router.delete("/:contactId", isValidId, controllerWrap(removeContact));

router.put(
  "/:contactId",
  isValidId,
  validateBody(contactsSchema),
  controllerWrap(updateContact)
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  statusValidateBody(statusContactSchema),
  controllerWrap(updateStatusContact)
);

module.exports = router;
