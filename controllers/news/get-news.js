const { NewsModel } = require("../../database/models");

const news = async (req, res, next) => {
  const { page, limit } = req.query;

  const news = await NewsModel.find({}, null, {
    skip: (page - 1) * limit,
    limit: limit,
  });
  res.json(news);
};

module.exports = {
  news,
};
