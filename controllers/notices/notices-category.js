const { NoticesModel } = require("../../database/models/notices.model");

const { getCategorySchema, addNoticeSchema, addNoticeCategorySchema } =
  require("../../schemas/notice.schema").noticeSchemas;
const { createHttpException } = require("../../services");
const { upload } = require("../../middlewares");
// const { NoticesModel } = require("../../database/models");
const { noticeSchemas } = require("../../schemas/notice.schema");
const gravatar = require("gravatar");

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
  // console.log(req.body);
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
    // image,
  } = req.body;
  // console.log(req.files);

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
    // image,
  });
  if (error) {
    const invalidField = error.details[0].path[0];
    throw createHttpException(400, `missing required ${invalidField} field`);
  }
  const photoURL = gravatar.url();
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
    photoURL,
    // image,
    owner: user._id,
  });

  res.status(201).json(newNotice);
};

module.exports = {
  getCategory,
  // addNotice: [upload.single("image"), addNotice],
  addNotice,
};
