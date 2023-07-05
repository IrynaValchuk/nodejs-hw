const { Contact } = require("../../models");
const { RequestError } = require("../../helpers");

const updateContact = async (req, res) => {
  const id = req.params.contactId;
  const result = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
    select: "-createdAt -updatedAt",
  });
  if (!result) {
    throw RequestError(404);
  }
  res.json(result);
};

module.exports = updateContact;
