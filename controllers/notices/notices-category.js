const NoticesModel = require("../../database/models/notices.model");

const { getCategorySchema, addNoticeSchema } =
  require("../../schemas/notice.schema").noticeSchemas;
const { createHttpException } = require("../../services");

// const { noticeSchemas } = require("../../schemas");

// const getCategory = async (req, res) => {
//   const { category } = req.query;

//   const allowedCategories = ["sell", "lost/found", "in good hands"];

//   if (category && !allowedCategories.includes(category)) {
//     return res
//       .status(400)
//       .json({
//         error:
//           "Invalid category, please select one of: [ sell, lost/found, in good hands]",
//       });
//   }

//   const notices = await NoticesModel.find({
//     category: category ? category : "sell",
//   });
//   res.json(notices);
// };

const getCategory = async (req, res) => {
  const { category } = req.query;

  const { error } = getCategorySchema.validate({ category });
  if (error) {
    return res.status(400).json({
      error:
        'Invalid category, please select one of: ["sell", "lost/found", "in good hands"]',
    });
  }

  const notices = await NoticesModel.find({
    category: category ? category : "sell",
  });
  res.json(notices);
};

// const getCategory = async (req, res) => {
//   const { category } = req.query;

//   const { error } = getCategorySchema.validate({ category });
//   if (error) {
//     throw createHttpException(400, error.message);
//   }

//   const notices = await NoticesModel.find({
//     category: category ? category : "sell",
//   });
//   res.json(notices);
// };

const addNotice = async (req, res) => {
  const {
    category,
    title,
    dateOfBirth,
    namePet,
    breed,
    sex,
    location,
    price,
    comments,
  } = req.body;

  const { error } = addNoticeSchema.validate({
    category,
    title,
    dateOfBirth,
    namePet,
    breed,
    sex,
    location,
    price,
    comments,
  });
  if (error) {
    const message = error.details.map((detail) => detail.message).join(", ");
    throw createHttpException(400, message);
  }

  const notice = new NoticesModel({
    category,
    title,
    dateOfBirth,
    namePet,
    breed,
    sex,
    location,
    price,
    comments,
    owner: req.user._id,
  });

  const savedNotice = await notice.save();

  res.status(201).json({ notice: savedNotice });
};

module.exports = {
  getCategory,
  addNotice,
};
