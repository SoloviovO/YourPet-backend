const { PetsModel } = require("../../database/models");
const { addPetSchema } = require("../../schemas");
const { createHttpException } = require("../../services");
const cloudinary = require("cloudinary").v2;

const addUserPet = async (req, res) => {
  const { name, dateOfBirth, breed, photoURL, comments } = req.body;
  const { error } = addPetSchema.validate({ name, breed });
  if (error) {
    throw createHttpException(400, "Name or breed required");
  }
  const result = await cloudinary.uploader.upload(req.file.path);
};

module.exports = { addUserPet };
