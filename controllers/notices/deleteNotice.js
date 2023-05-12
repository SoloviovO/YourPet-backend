const { NoticesModel } = require("../../database/models/notices.model");

const { createHttpException } = require("../../services");

const deleteNotice = async (req, res) => {
  const { id } = req.params;

  const result = await NoticesModel.findByIdAndDelete(id).catch((error) => {
    throw createHttpException(400, error.message);
  });

  if (!result) {
    throw createHttpException(404, "There is no such id");
  }

  res.json({
    message: "Delete success",
  });
};

module.exports = {
  deleteNotice,
};
