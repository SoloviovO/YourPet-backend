const { PetsModel } = require("../../database/models");
const { addPetSchema } = require("../../schemas");
const { createHttpException } = require("../../services");
const cloudinary = require("cloudinary").v2;

const addUserPet = async (req, res) => {
  const { name, dateOfBirth, breed, comments } = req.body;
  const { _id: owner } = req.user;
  const { error } = addPetSchema.validate({ name, breed });
  if (error) {
    throw createHttpException(400, "Name or breed required");
  }
  const result = await cloudinary.uploader.upload(req.file.path);
  console.log(Boolean(result));

  const newPet = await PetsModel.create({
    name,
    dateOfBirth,
    breed,
    photoURL: result.secure_url,
    comments,
    owner,
  });

  res.json(newPet);
};

module.exports = { addUserPet };
