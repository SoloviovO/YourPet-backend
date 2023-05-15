const { UserModel, NoticesModel, PetsModel } = require("../../database/models");

const getCurrentUser = async (req, res, next) => {
  const user = req.user;

  const result = await NoticesModel.find({ owner: user._id });
  const petsRes = await PetsModel.find({ owner: user._id });
  const fav = await UserModel.findById(user._id).populate("favorite");

  res.json({
    id: user._id,
    email: user.email,
    name: user.name,
    birthday: user.birthday,
    phone: user.phone,
    city: user.city,
    image: user.image,
    favorite: fav.favorite,
    pets: petsRes,
    notices: result,
  });
};

module.exports = {
  getCurrentUser,
};
