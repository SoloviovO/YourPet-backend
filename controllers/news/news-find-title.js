const { NewsModel } = require("../../database/models");
const { createHttpException } = require("../../services");

const getNewsByTitle = async (req, res) => {
  const { title, page, limit } = req.query;

  if (!title) {
    throw createHttpException(400, "Your request is empty");
  }

  const regex = new RegExp(title, "i");
  const result = await NewsModel.find({ title: regex }, null, {
    skip: (page - 1) * limit,
    limit: limit,
  });

  if (result.length === 0) {
    throw createHttpException(404, "No results for your request");
  }

  res.json(result);
};

module.exports = { getNewsByTitle };
