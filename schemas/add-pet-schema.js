const Joi = require("joi");

const addPetSchema = Joi.object({
  name: Joi.string().required(),
  birthday: Joi.string().pattern(/^\d{2}\.\d{2}\.\d{4}$/),
  breed: Joi.string().required(),
  image: Joi.string(),
  comments: Joi.string(),
});

module.exports = addPetSchema;
