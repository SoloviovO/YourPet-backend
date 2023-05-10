const { NoticesModel } = require("../../database/models");
const { createHttpException } = require("../../services");

const getNoticesByTitle = async (req, res) => {
  const { title, category } = req.query;
  if (!title) {
    throw createHttpException(404, "Not found");
  }
  const regex = new RegExp(title, "i");
  const result = await NoticesModel.find({ title: regex, category });

  if (result.length === 0) {
    throw createHttpException(404, "Not found");
  }

  res.json(result);
};

module.exports = { getNoticesByTitle };
