const { NoticesModel } = require("../../database/models/notices.model");

const { getCategorySchema, addNoticeSchema, addNoticeCategorySchema } =
  require("../../schemas/notice.schema").noticeSchemas;
const { createHttpException } = require("../../services");
const { upload } = require("../../middlewares");

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

const addNotice = async (req, res) => {
  const user = req.user;
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

  const { error } = addNoticeCategorySchema.validate({
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
    const invalidField = error.details[0].path[0];
    throw createHttpException(400, `missing required ${invalidField} field`);
  }
  const newNotice = await NoticesModel.create({
    category,
    title,
    dateOfBirth,
    namePet,
    breed,
    sex,
    location,
    price,
    comments,
    owner: user._id,
  });

  res.status(201).json(newNotice);
};

// const addNotice = async (req, res, next) => {
//   try {
//     const user = req.user;
//     const {
//       category,
//       title,
//       dateOfBirth,
//       namePet,
//       breed,
//       sex,
//       location,
//       price,
//       comments,
//     } = req.body;

//     const { error } = addNoticeCategorySchema.validate({
//       category,
//       title,
//       dateOfBirth,
//       namePet,
//       breed,
//       sex,
//       location,
//       price,
//       comments,
//     });
//     if (error) {
//       const invalidField = error.details[0].path[0];
//       throw createHttpException(400, `missing required ${invalidField} field`);
//     }
//     const newNotice = await NoticesModel.create({
//       category,
//       title,
//       dateOfBirth,
//       namePet,
//       breed,
//       sex,
//       location,
//       price,
//       comments,
//       owner: user._id,
//     });

//     res.status(201).json(newNotice);
//   } catch (error) {
//     next(error);
//   }
// };

module.exports = {
  getCategory,
  // addNotice: [upload.single("image"), addNotice],
  addNotice,
};
