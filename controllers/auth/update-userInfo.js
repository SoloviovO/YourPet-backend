const { UserModel } = require("../../database/models");
const {
  addUserUpdateSubscriptionSchema,
  updateUserInfoSchema,
} = require("../../schemas");
const { createHttpException, mapContactOutput } = require("../../services");

const updateUserInfo = async (req, res, next) => {
  const user = req.user;
  const { name, email, birthday, phone, city } = req.body;

  const { error } = updateUserInfoSchema.validate({
    name,
    email,
    birthday,
    phone,
    city,
  });
  if (error) {
    throw createHttpException(400, "missing field subscription");
  }

  const result = await UserModel.findByIdAndUpdate(
    user._id,
    {
      name,
      email,
      birthday,
      phone,
      city,
    },
    { new: true }
  ).catch((error) => {
    throw createHttpException(400, error.message);
  });
  if (result === null) {
    throw createHttpException(404, "Not found");
  }

  res.json(result);
};

module.exports = {
  updateUserInfo,
};
