const { NoticesModel } = require("../../database/models/notices.model");

const { createHttpException } = require("../../services");

const deleteNotice = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;

  const noticedel = await NoticesModel.findOne({ owner: _id, _id: id });
  if (!noticedel) {
    throw createHttpException(400, "This notice is not yours");
  }

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
