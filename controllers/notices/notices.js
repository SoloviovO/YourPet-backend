const NoticesModel = require("../../database/models/notices.model");

const { HttpError, ctrlWrapper } = require("../../helpers");

const getCategory = async (req, res) => {
  const { category } = req.query;
  const notices = await NoticesModel.find({ category });
  res.json(notices);
};

const addNotice = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await NoticesModel.create({ ...req.body, owner });
  res.status(201).json(result);
};

module.exports = {
  getCategory: ctrlWrapper(getCategory),
  addNotice: ctrlWrapper(addNotice),
};
