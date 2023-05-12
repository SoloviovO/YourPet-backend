const { NoticesModel } = require("../../database/models");
const { createHttpException } = require("../../services");

const getOneNotice = async (req, res) => {
  const { id } = req.params;

  const result = await NoticesModel.findById(id);

  if (!result) {
    throw createHttpException(404, "Not found");
  }

  res.json(result);
};

module.exports = {
  getOneNotice,
};
