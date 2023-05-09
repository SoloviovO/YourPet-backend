const cloudinary = require("cloudinary").v2;

const { NoticesModel } = require("../../database/models/notices.model");

const { addNoticeSchema } =
  require("../../schemas/notice.schema").noticeSchemas;
const { createHttpException } = require("../../services");

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

  const { error } = addNoticeSchema.validate({
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
    email: user.email,
    phone: user.phone,
  });

  res.status(201).json(newNotice);
};

module.exports = {
  addNotice,
};

//test
