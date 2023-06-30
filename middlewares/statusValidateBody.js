const { RequestError } = require("../helpers");

const statusValidateBody = (schema) => {
  const func = (req, _, next) => {
    const { error } = schema.validate(req.body);
    if (Object.keys(req.body).length === 0) {
      next(RequestError(400, (error.message = "Missing field favorite")));
    }
    if (error) {
      next(RequestError(400, error.message));
    }
    next();
  };
  return func;
};

module.exports = statusValidateBody;
