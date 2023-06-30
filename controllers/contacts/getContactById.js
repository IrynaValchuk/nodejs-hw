const Contact = require("../../models/contacts");
const { RequestError } = require("../../helpers");

const getContactById = async (req, res) => {
  const id = req.params.contactId;
  const result = await Contact.findById(id);
  if (!result) {
    throw RequestError(404);
  }
  res.json(result);
};

module.exports = getContactById;
