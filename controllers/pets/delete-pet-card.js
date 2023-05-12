const { PetsModel } = require("../../database/models");
const { createHttpException } = require("../../services");

const deleteUserPet = async (req, res) => {
  const { id } = req.params;

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
