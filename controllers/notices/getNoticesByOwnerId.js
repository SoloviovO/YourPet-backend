const { NoticesModel } = require("../../database/models/notices.model");

const getNoticesByOwnerId = async (req, res) => {
  const { _id } = req.user;
  const { title, page, limit } = req.query;

  const skip = (page - 1) * limit;
  const regex = new RegExp(title, "i");

  const noticesAll = await NoticesModel.find({ title: regex, owner: _id });
  const notices = await NoticesModel.find({ title: regex, owner: _id })
    .skip(skip)
    .limit(limit);

  res.json({ notices, total: noticesAll.length });
};

module.exports = {
  getNoticesByOwnerId,
};
