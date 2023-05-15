const { PetsModel } = require("../../database/models");
const { createHttpException } = require("../../services");

const deleteUserPet = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;

  const petdel = await PetsModel.findOne({ owner: _id, _id: id });
  if (!petdel) {
    throw createHttpException(400, "This pet is not yours");
  }

  const result = await PetsModel.findByIdAndDelete(id).catch((error) => {
    throw createHttpException(400, error.message);
  });

  if (!result) {
    throw createHttpException(404, "There is no such id");
  }

  res.json({ message: "Delete success" });
};

module.exports = {
  deleteUserPet,
};
