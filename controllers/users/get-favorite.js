const { UserModel } = require("../../database/models");

const getFavoriteNotices = async (req, res, next) => {
  const user = req.user;
  const { title, page, limit } = req.query;

  const result = await UserModel.findById(user._id).populate("favorite");

  const regex = new RegExp(title, "i");

  let favoriteNoticesAll = result.favorite.filter((notice) =>
    regex.test(notice.title)
  );
  let favoriteNotices = result.favorite.filter((notice) =>
    regex.test(notice.title)
  );

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
    favorite: favoriteNotices,
  };

  res.json({ user: match, total: favoriteNoticesAll.length });
};

module.exports = {
  getFavoriteNotices,
};
