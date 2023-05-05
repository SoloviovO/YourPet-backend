const Joi = require("joi");

const addNoticeSchema = Joi.object({
  category: Joi.string()
    .valid("your pet", "sell", "lost/found", "in good hands")
    .required(),
  titleOfAd: Joi.string(),
  dateOfBirth: Joi.string(),
  namePet: Joi.string(),
  breed: Joi.string(),
  sex: Joi.string().valid("male", "female").required(),
  location: Joi.string().required(),
  price: Joi.string(),
  comments: Joi.string(),
});

const noticeSchemas = {
  addNoticeSchema,
};

module.exports = { noticeSchemas };
