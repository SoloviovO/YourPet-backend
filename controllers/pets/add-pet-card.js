const { PetsModel } = require("../../database/models");
const { addPetSchema } = require("../../schemas");
const { createHttpException } = require("../../services");

const addUserPet = async (req, res) => {
  const { name, birthday, breed, comments } = req.body;

  const { _id } = req.user;

  const { error } = addPetSchema.validate({ name, breed, birthday });
  if (error) {
    const invalidField = error.details[0].path[0];
    throw createHttpException(
      400,
      `Missing or not valid field ${invalidField} => ${error.message}`
    );
  }

  const newPet = await PetsModel.create({
    name,
    birthday,
    breed,
    image: req.file.path,
    comments,
    owner: _id,
  });

  res.status(201).json(newPet);
};

module.exports = { addUserPet };
