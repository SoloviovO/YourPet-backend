const { UserModel } = require("../../database/models/user.model");
const crypto = require("crypto");
const {
  createHash,
  createHttpException,
  createJWT,
} = require("../../services");
const { addUserSchema } = require("../../schemas");
const gravatar = require("gravatar");

const signUp = async (req, res, next) => {
  const { email, password } = req.body;

  const { error } = addUserSchema.validate({ email, password });
  if (error) {
    throw createHttpException(400, error.message);
  }

  const passwordHash = await createHash(password);
  const image = gravatar.url(email);

  const newUser = await UserModel.create({
    email,
    passwordHash,
    image,
  }).catch((error) => {
    throw createHttpException(409, "Email in use");
  });

  const sessionKey = crypto.randomUUID();
  await UserModel.findByIdAndUpdate(newUser._id, { sessionKey });

  const accessJWT = createJWT({ userId: String(newUser._id), sessionKey });

  res.status(201).json({
    user: {
      id: newUser._id,
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
