const { UserModel } = require("../../database/models");

const getFavoriteNotices = async (req, res, next) => {
  // const { _id } = req.user;

  // const user = await UserModel.findById(_id).populate("favorite");

  // res.json({ user });
  // const user = req.user;
  // const { page, limit } = req.query;

  // const result = await UserModel.findById(user._id);

  // let favoriteNotices = result.favorite;

  // if (page && limit) {
  //   const startIndex = (page - 1) * limit;
  //   const endIndex = page * limit;
  //   favoriteNotices = favoriteNotices.slice(startIndex, endIndex);
  // }

  // const match = {
  //   id: user._id,
  //   email: user.email,
  //   name: user.name,
  //   birthday: user.birthday,
  //   phone: user.phone,
  //   city: user.city,
  //   image: user.image,
  //   favorite: user.favorite,
  //   pets: user.pets,
  //   notices: user.notices,
  //   favorite: favoriteNotices,
  // };

  // res.json({ user: match });
  const user = req.user;
  const { page, limit } = req.query;

  const result = await UserModel.findById(user._id).populate("favorite");

  let favoriteNotices = result.favorite;

  if (page && limit) {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    favoriteNotices = favoriteNotices.slice(startIndex, endIndex);
  }

  const match = {
    id: user._id,
    email: user.email,
    name: user.name,
    birthday: user.birthday,
    phone: user.phone,
    city: user.city,
    image: user.image,
    favorite: user.favorite,
    pets: user.pets,
    notices: user.notices,
    favorite: favoriteNotices,
  };

  res.json({ user: match });
};

module.exports = {
  getFavoriteNotices,
};
