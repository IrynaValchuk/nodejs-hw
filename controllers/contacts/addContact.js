const { Contact } = require("../../models");
const { RequestError } = require("../../helpers");

const addContact = async (req, res) => {
  const { email, phone } = req.body;
  const userEmail = await Contact.findOne({ email });
  const userPhone = await Contact.findOne({ phone });

  if (userEmail) {
    throw RequestError(409, "Field email must be unique");
  }
  if (userPhone) {
    throw RequestError(409, "Field phone must be unique");
  }

  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

module.exports = addContact;
