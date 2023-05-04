const Joi = require("joi");

const addUserSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports = {
  addUserSchema,
};
