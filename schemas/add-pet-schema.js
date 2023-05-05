const Joi = require("joi");

const addPetSchema = Joi.object({
  name: Joi.string().required(),
  dateOfBirth: Joi.string(),
  breed: Joi.string().required(),
  photoURL: Joi.string(),
  comments: Joi.string(),
});

module.exports = { addPetSchema };
