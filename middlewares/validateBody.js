const { RequestError } = require("../helpers");

const validateBody = (schema) => {
  const func = (req, _, next) => {
    const { error } = schema.validate(req.body);
    if (Object.keys(req.body).length === 0) {
      next(RequestError(400, "Missing fields"));
    }
    if (error) {
      next(RequestError(400, error.message));
    }
    next();
  };
  return func;
};

module.exports = validateBody;
