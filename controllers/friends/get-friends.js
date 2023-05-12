const { FriendModel } = require("../../database/models");

const friends = async (req, res, next) => {
  const friend = await FriendModel.find({});

  res.json(friend);
};

module.exports = {
  friends,
};
