const cloudinary = require("cloudinary").v2;
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

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
  // const { path: tempUpload, originalname } = req.file;

  // const filename = `${user._id}_${originalname}`;
  // const resultUpload = path.join(avatarsDir, filename);
  // console.log(resultUpload);
  // await fs.rename(tempUpload, resultUpload);
  // const imageUrl = path.join("avatars", filename);
  // console.log(imageUrl);
  // const smallAvatarURL = path.join("public", "avatars", filename);
  // Jimp.read(smallAvatarURL, (error, filename) => {
  //   if (error) throw error;
  //   filename.cover(250, 250).quality(60).write(smallAvatarURL);
  // });
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

  const result = await cloudinary.uploader.upload(req.file.path);
  // await NoticesModel.findByIdAndUpdate(_id, { image: result.secure_url });

  // res.json({ image: result.secure_url });

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
    // photoURL: imageUrl,
    photoURL: result.secure_url,
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
