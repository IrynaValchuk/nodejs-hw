const { User } = require("../../models");
const { RequestError } = require("../../helpers");

const updateUserSubscription = async (req, res) => {
  const { _id } = req.user;
  const result = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
  });
  if (!result) {
    throw RequestError(404);
  }
  res.json(result);
};

module.exports = updateUserSubscription;
