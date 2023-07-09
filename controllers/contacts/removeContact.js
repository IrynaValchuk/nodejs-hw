const { Contact } = require("../../models");
const { RequestError } = require("../../helpers");

const removeContact = async (req, res) => {
  const id = req.params.contactId;
  const result = await Contact.findByIdAndDelete(id);
  if (!result) {
    throw RequestError(404);
  }
  res.json({ message: "contact deleted" });
};

module.exports = removeContact;
