const Joi = require("joi");

const updateUserInfoSchema = Joi.object({
  name: Joi.string().allow(""),
  email: Joi.string().email(),
  birthday: Joi.string().pattern(/^\d{2}\.\d{2}\.\d{4}$/),
  phone: Joi.string().pattern(/^\+380\d{9}$/),
  city: Joi.string().pattern(/^[A-Z][a-z]+(?:[\s-][A-Z][a-z]+)*$/),
});

module.exports = {
  updateUserInfoSchema,
};
