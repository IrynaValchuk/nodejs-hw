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
const {
  contactSchemas: { addSchema, statusContactSchema },
} = require("../../models");

router.get("/", controllerWrap(getContacts));

router.get("/:contactId", isValidId, controllerWrap(getContactById));

router.post("/", validateBody(addSchema), controllerWrap(addContact));

router.delete("/:contactId", isValidId, controllerWrap(removeContact));

router.put(
  "/:contactId",
  isValidId,
  validateBody(addSchema),
  controllerWrap(updateContact)
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  statusValidateBody(statusContactSchema),
  controllerWrap(updateStatusContact)
);

module.exports = router;
