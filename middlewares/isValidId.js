const { isValidObjectId } = require("mongoose");
const { RequestError } = require("../helpers");

const isValidId = (req, _, next) => {
  const id = req.params.contactId;
  if (!isValidObjectId(id)) {
    next(RequestError(400, `${id} isn't valid id`));
  }
  next();
};

module.exports = isValidId;
