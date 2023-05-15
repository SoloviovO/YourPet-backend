const { NoticesModel, UserModel } = require("../../database/models");
const { createHttpException } = require("../../services");

const getFavoriteNoticesByTitle = async (req, res) => {
  const { title, page, limit } = req.query;
  const { _id } = req.user;

  const skip = (page - 1) * limit;

  if (!title) {
    throw createHttpException(404, "Not found");
  }

  const user = await UserModel.findById({ _id }).populate("favorite");
  let favoriteNotices = user.favorite;

  const regex = new RegExp(title, "i");
  const filteredNotices = favoriteNotices.filter((notice) =>
    notice.title.match(regex)
  );

  if (filteredNotices.length === 0) {
    throw createHttpException(404, "Not found");
  }

  let result;

  if (page && limit) {
    result = filteredNotices.slice(skip, skip + limit);
  } else {
    result = filteredNotices;
  }

  res.json({ notices: result, total: filteredNotices.length });
};

module.exports = { getFavoriteNoticesByTitle };
