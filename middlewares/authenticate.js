const jwt = require("jsonwebtoken");

const { User } = require("../models");
const { RequestError } = require("../helpers");
const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [type, token] = authorization.split(" ");
  if (type !== "Bearer") {
    next(RequestError(401, "Not authorized"));
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user) {
      next(RequestError(401, "Not authorized"));
    }
    req.user = user;
    next();
  } catch {
    next(RequestError(401, "Not authorized"));
  }
};

module.exports = authenticate;
