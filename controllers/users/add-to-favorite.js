const { UserModel, NoticesModel } = require("../../database/models");
const { createHttpException } = require("../../services");

const addNoticeToFavirite = async (req, res, next) => {
  // const { id } = req.params;
  // const { _id } = req.user;

  // const notice = await NoticesModel.findById(id).catch((error) => {
  //   throw createHttpException(404, "This entry is not found");
  // });

  // const user = await UserModel.findById(_id);

  // const noticeExists = user.favorite.some((item) => item._id == id);

  // if (noticeExists) {
  //   return res.status(400).json({
  //     message: "This entry has already been added to the favorites list",
  //   });
  // }

  // user.favorite.push(notice);

  // await user.save();

  // res.status(201).json({ user });

  // Version for add only id in array favorites

  // const { id } = req.params;
  // const { _id } = req.user;

  // const notices = await NoticesModel.findById(id).catch((error) => {
  //   throw createHttpException(404, "This entry is not found");
  // });

  // const user = await UserModel.findOneAndUpdate(
  //   { _id, favorite: { $ne: id } },
  //   { $push: { favorite: id } },
  //   { new: true }
  // );

  // if (!user) {
  //   return res.status(400).json({
  //     message: "This entry has already been added to the favorites list",
  //   });
  // }

  // res.json({ user });
  const { id } = req.params;
  const { _id } = req.user;

  const notices = await NoticesModel.findById(id).catch((error) => {
    throw createHttpException(404, "This entry is not found");
  });

  const user = await UserModel.findOneAndUpdate(
    { _id, favorite: { $ne: id } },
    { $push: { favorite: id } },
    { new: true }
  ).populate("favorite");

  if (!user) {
    return res.status(400).json({
      message: "This entry has already been added to the favorites list",
    });
  }

  const userWithNotices = await UserModel.findById(user._id).populate(
    "favorite"
  );

  res.json({ user: userWithNotices });
};

module.exports = {
  addNoticeToFavirite,
};
