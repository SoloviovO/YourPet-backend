const cloudinary = require("cloudinary").v2;

const { NoticesModel } = require("../../database/models/notices.model");

const { getCategorySchema, addNoticeCategorySchema } =
  require("../../schemas/notice.schema").noticeSchemas;
const { createHttpException } = require("../../services");

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
    birthday,
    name,
    breed,
    sex,
    location,
    price,
    comments,
  } = req.body;

  const { error } = addNoticeCategorySchema.validate({
    category,
    title,
    birthday,
    name,
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

  const result = await cloudinary.uploader.upload(req.file.path);

  const newNotice = await NoticesModel.create({
    category,
    title,
    birthday,
    name,
    breed,
    sex,
    location,
    price,
    comments,
    image: result.secure_url,
    owner: user._id,
  });

  res.status(201).json(newNotice);
};

const getNoticesByOwnerId = async (req, res) => {
  const { _id } = req.user;
  console.log(_id);
  const notices = await NoticesModel.find({ owner: _id });
  res.json(notices);
};

module.exports = {
  getCategory,
  addNotice,
  getNoticesByOwnerId,
};
