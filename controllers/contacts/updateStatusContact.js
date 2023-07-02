const Contact = require("../../models/contacts");
const { RequestError } = require("../../helpers");

const updateStatusContact = async (req, res) => {
  const id = req.params.contactId;
  const result = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!result) {
    throw RequestError(404);
  }
  res.json(result);
};

module.exports = updateStatusContact;
