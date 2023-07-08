const express = require("express");
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
  authenticate,
} = require("../../middlewares");
const {
  contactSchemas: { addSchema, statusContactSchema },
} = require("../../models");

const router = express.Router();

router.get("/", authenticate, controllerWrap(getContacts));

router.get(
  "/:contactId",
  authenticate,
  isValidId,
  controllerWrap(getContactById)
);

router.post(
  "/",
  authenticate,
  validateBody(addSchema),
  controllerWrap(addContact)
);

router.delete(
  "/:contactId",
  authenticate,
  isValidId,
  controllerWrap(removeContact)
);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(addSchema),
  controllerWrap(updateContact)
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  statusValidateBody(statusContactSchema),
  controllerWrap(updateStatusContact)
);

module.exports = router;
