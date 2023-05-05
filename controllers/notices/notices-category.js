const NoticesModel = require("../../database/models/notices.model");

const { noticeSchemas } = require("../../schemas/notice.schema");

const getCategory = async (req, res) => {
  const { category } = req.query;

  const notices = await NoticesModel.find({
    category: category ? category : "sell",
  });
  res.json(notices);
};

const addNotice = async (req, res) => {
  const { _id: owner } = req.user;
  // const { name, email, phone, favorite } = req.body;
  const { error } = noticeSchemas.validate({ email, password });
  if (error) {
    throw createHttpException(400, error.message);
  }
  const result = await NoticesModel.create({ ...req.body, owner });
  res.status(201).json(result);
};

module.exports = {
  getCategory,
  addNotice,
};
