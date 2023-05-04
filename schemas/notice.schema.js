const Joi = require("joi");

const addNoticeSchema = Joi.object({
  category: Joi.string()
    .valid("your pet", "sell", "lost/found", "in good hands")
    .required(),
  titleOfAd: Joi.string(),
});

const schemas = {
  addNoticeSchema,
};

module.exports = { schemas };
