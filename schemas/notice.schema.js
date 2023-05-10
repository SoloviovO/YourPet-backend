const Joi = require("joi");

const addNoticeSchema = Joi.object({
  category: Joi.string().valid("sell", "lost-found", "for-free").required(),
  title: Joi.string().min(2).max(16).required(),
  birthday: Joi.string().pattern(/^\d{2}\.\d{2}\.\d{4}$/),
  name: Joi.string().min(2).max(16).required(),
  breed: Joi.string().min(2).max(16).required(),
  sex: Joi.string().valid("male", "female").required(),
  location: Joi.string()
    .pattern(/^[A-Za-z ]+$/)
    .min(2)
    .max(50)
    .when("category", {
      is: Joi.valid("sell", "lost-found", "for-free"),
      then: Joi.required(),
      otherwise: Joi.optional(),
    }),
  price: Joi.number()
    .min(0)
    .when("category", {
      is: "sell",
      then: Joi.number().min(1).required(),
      otherwise: Joi.optional(),
    }),
  comments: Joi.string()
    .min(8)
    .max(120)
    .regex(/^[\s\S]*.*[^\s][\s\S]*$/),
});

const getCategorySchema = Joi.object({
  category: Joi.string().valid("sell", "lost-found", "for-free"),
});

const noticeSchemas = {
  addNoticeSchema,
  getCategorySchema,
};

module.exports = { noticeSchemas };
