const { PetsModel } = require("../../database/models");
const { addPetSchema } = require("../../schemas");
const { createHttpException } = require("../../services");
const cloudinary = require("cloudinary").v2;

const addUserPet = async (req, res) => {
  const { name, birthday, breed, comments } = req.body;
  const { _id } = req.user;

  const { error } = addPetSchema.validate({ name, breed, birthday });
  if (error) {
    const invalidField = error.details[0].path[0];
    throw createHttpException(400, `missing required ${invalidField} field`);
  }

  const result = await cloudinary.uploader.upload(req.file.path);

  const newPet = await PetsModel.create({
    name,
    birthday,
    breed,
    image: result.secure_url,
    comments,
    owner: _id,
  });

  res.status(201).json(newPet);
};

module.exports = { addUserPet };
