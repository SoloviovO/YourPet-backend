const { UserModel } = require("../../database/models");

const getFavoriteNotices = async (req, res, next) => {
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
    favorite: favoriteNotices,
    total: result.favorite.length,
  };

  res.json({ user: match });
};

module.exports = {
  getFavoriteNotices,
};
