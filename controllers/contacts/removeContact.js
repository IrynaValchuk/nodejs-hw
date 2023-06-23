const contacts = require("../../models/contacts");
const { RequestError } = require("../../helpers");

const removeContact = async (req, res) => {
  const id = req.params.contactId;
  const result = await contacts.removeContact(id);
  if (!result) {
    throw RequestError(404);
  }
  res.json({ message: "contact deleted" });
};

module.exports = removeContact;
