const { UserModel } = require("../../database/models/user.model");
const { createHash, createHttpException } = require("../../services");
const { addUserSchema } = require("../../schemas");
const gravatar = require("gravatar");

const signUp = async (req, res, next) => {
  const { email, password } = req.body;

  const { error } = addUserSchema.validate({ email, password });
  if (error) {
    throw createHttpException(400, error.message);
  }
  const user = await UserModel.findOne({ email });
  if (user) {
    throw createHttpException(409, "Email in use");
  }
  const passwordHash = await createHash(password);
  const image = gravatar.url(email);

  const newUser = await UserModel.create({
    email,
    passwordHash,
    image,
  });

  res.status(201).json({
    user: {
      email: newUser.email,
      name: newUser.name,
      birthday: newUser.birthday,
      phone: newUser.phone,
      city: newUser.city,
      image: newUser.image,
    },
  });
};

module.exports = {
  signUp,
};
