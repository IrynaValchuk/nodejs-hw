const contacts = require("../../models/contacts");
const { RequestError } = require("../../helpers");

const updateContact = async (req, res) => {
  const id = req.params.contactId;
  const result = await contacts.updateContact(id, req.body);
  if (!result) {
    throw RequestError(404);
  }
  res.json(result);
};

module.exports = updateContact;
