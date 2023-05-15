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
    throw createHttpException(
      400,
      `Missing or not valid field ${invalidField} => ${error.message}`
    );
  }

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
    image: req.file.path,
    owner: user._id,
    email: user.email,
    phone: user.phone,
  });

  res.status(201).json(newNotice);
};

module.exports = {
  addNotice,
};
