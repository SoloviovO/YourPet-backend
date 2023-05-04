const Joi = require("joi");

const addNoticeSchema = Joi.object({
  category: Joi.string()
    .valid("your pet", "sell", "lost/found", "in good hands")
    .required(),
  titleOfAd: Joi.string(),

  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean().default(false),
});

const schemas = {
  addNoticeSchema,
};

module.exports = { schemas };
