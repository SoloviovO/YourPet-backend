const { NoticesModel } = require("../../database/models/notices.model");

const { createHttpException } = require("../../services");

const deleteNotice = async (req, res) => {
  const { id } = req.params;
  const result = await NoticesModel.findByIdAndDelete(id);

  if (!result) {
    throw createHttpException(404, "Not found");
  }

  res.json({
    message: "Delete success",
  });
};

module.exports = {
  deleteNotice,
};

//test
