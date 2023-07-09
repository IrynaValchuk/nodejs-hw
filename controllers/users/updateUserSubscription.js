const { User } = require("../../models");
const { RequestError } = require("../../helpers");

const updateUserSubscription = async (req, res) => {
  const id = req.params.userId;
  const result = await User.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!result) {
    throw RequestError(404);
  }
  res.json(result);
};

module.exports = updateUserSubscription;
