const contacts = require("../../models/contacts");

const getContacts = async (_, res) => {
  const result = await contacts.listContacts();
  res.json(result);
};

module.exports = getContacts;
