const { UserModel, NoticesModel } = require("../../database/models");

const getCurrentUser = async (req, res, next) => {
  const user = req.user;
  const result = await NoticesModel.find({ owner: user._id });
  res.json({
    id: user._id,
    email: user.email,
    name: user.name,
    birthday: user.birthday,
    phone: user.phone,
    city: user.city,
    image: user.image,
    favorite: user.favorite,
    pets: user.pets,
    notices: result,
  });
};

module.exports = {
  getCurrentUser,
};
