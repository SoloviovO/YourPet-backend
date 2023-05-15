const { UserModel } = require("../../database/models");
const { updateUserInfoSchema } = require("../../schemas");
const { createHttpException } = require("../../services");

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
    const invalidField = error.details[0].path[0];
    throw createHttpException(
      400,
      `Missing or not valid field ${invalidField} => ${error.message}`
    );
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
