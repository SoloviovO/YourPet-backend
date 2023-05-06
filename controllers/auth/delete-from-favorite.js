const { UserModel } = require("../../database/models");

const deleteFavoriteNitice = async (req, res, next) => {
  const { id } = req.params;
  const { _id } = req.user;

  const user = await UserModel.findById(_id);

  const noticeIndex = user.favorite.findIndex((item) => item._id == id);

  if (noticeIndex === -1) {
    return res.status(400).json({
      message: "This entry is not in your favorites list",
    });
  }

  user.favorite.splice(noticeIndex, 1);

  await user.save();

  res.json({ user });

  // Version for delete only id in array favorites

  //   const { id } = req.params;
  //   const { _id } = req.user;

  //   const userdel = await UserModel.findById(_id);
  //   const noticeExists = userdel.favorite.some((item) => item == id);

  //   if (!noticeExists) {
  //     return res.status(400).json({
  //       message: "This entry is not in your favorites list",
  //     });
  //   }
  //   const user = await UserModel.findByIdAndUpdate(
  //     _id,
  //     { $pull: { favorite: id } },
  //     { new: true }
  //   );

  //   if (!user) {
  //     return res.status(400).json({
  //       message: "The user does not exist",
  //     });
  //   }

  //   res.json({ user });
};

module.exports = {
  deleteFavoriteNitice,
};
