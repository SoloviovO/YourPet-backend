const Joi = require("joi");

const addContactSchema = Joi.object({
  name: Joi.string().alphanum().min(2).max(25).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),

  phone: Joi.string()
    .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
    .required(),
  favorite: Joi.boolean().default(false),
});

const addContactStatusUpdateSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = {
  addContactSchema,
  addContactStatusUpdateSchema,
};
