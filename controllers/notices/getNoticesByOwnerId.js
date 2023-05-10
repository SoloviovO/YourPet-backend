const { NoticesModel } = require("../../database/models/notices.model");

const getNoticesByOwnerId = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 5 } = req.query;
  const skip = (page - 1) * limit;

  const notices = await NoticesModel.find({ owner: _id })
    .skip(skip)
    .limit(limit);

  res.json(notices);
};

module.exports = {
  getNoticesByOwnerId,
};