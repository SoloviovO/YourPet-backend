const Joi = require("joi");

const addPetSchema = Joi.object({
  name: Joi.string().min(2).max(16).required(),
  birthday: Joi.string().pattern(/^\d{2}\.\d{2}\.\d{4}$/),
  breed: Joi.string().min(2).max(16).required(),
  image: Joi.string(),
  comments: Joi.string().min(8).max(120),
});

module.exports = addPetSchema;
