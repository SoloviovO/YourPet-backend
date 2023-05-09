const Joi = require("joi");

const addNoticeSchema = Joi.object({
  category: Joi.string()
    .valid("sell", "lost/found", "in good hands")
    .required(),
  title: Joi.string(),
  birthday: Joi.string().pattern(/^\d{2}\.\d{2}\.\d{4}$/),
  name: Joi.string(),
  breed: Joi.string(),
  sex: Joi.string().valid("male", "female").required(),
  location: Joi.string().required(),
  price: Joi.string(),
  comments: Joi.string(),
});

const addNoticeCategorySchema = Joi.object({
  category: Joi.string()
    .valid("sell", "lost/found", "in good hands")
    .required(),
  title: Joi.string(),
  birthday: Joi.string().pattern(/^\d{2}\.\d{2}\.\d{4}$/),
  name: Joi.string(),
  breed: Joi.string(),
  sex: Joi.string().valid("male", "female").required(),
  location: Joi.string().required(),
  price: Joi.string(),
  comments: Joi.string(),
  // image: Joi.object({
  //   data: Joi.binary().required(),
  //   contentType: Joi.string().required(),
  // }).required(),
});

const getCategorySchema = Joi.object({
  category: Joi.string().valid("sell", "lost/found", "in good hands"),
});

const noticeSchemas = {
  addNoticeSchema,
  getCategorySchema,
  addNoticeCategorySchema,
};

module.exports = { noticeSchemas };
