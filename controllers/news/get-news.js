const { NewsModel } = require("../../database/models");

const news = async (req, res, next) => {
  const { page, limit } = req.query;

  const newsAll = await NewsModel.find({});
  const news = await NewsModel.find({}, null, {
    skip: (page - 1) * limit,
    limit: limit,
  });

  res.json({ news, total: newsAll.length });
};

module.exports = {
  news,
};
