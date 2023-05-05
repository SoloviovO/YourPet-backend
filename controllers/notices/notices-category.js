const NoticesModel = require("../../database/models/notices.model");

const { getCategorySchema, addNoticeSchema } =
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

  // якщо є завантажене зображення - додати його посилання до запиту
  if (req.file) {
    req.body.image = req.file.filename;
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
    image: req.body.image || null,
  });

  const savedNotice = await notice.save();

  res.status(201).json({ notice: savedNotice });
};

module.exports = {
  getCategory,
  addNotice: [upload.single("image"), addNotice],
};
