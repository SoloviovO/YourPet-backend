const { Schema, model } = require("mongoose");
const Joi = require("joi");

// const handleMongooseError = require("../helpers/handleMongooseError");

// const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const noticesSchema = new Schema(
  {
    titleOfAd: {
      type: String,
      required: true,
    },
    namePet: {
      type: String,
      required: [true, "Name is required"],
    },
    breed: {
      type: String,
      required: [true, "Breed is required"],
    },
    sex: {
      type: String,
      enum: ["male", "female"],
      required: [true, "Choose the sex of the animal, male or female"],
    },
    location: {
      type: String,
      required: true,
    },
    avatarURL: {
      type: String,
      required: true,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      default: "",
      required: [true, "Verify token is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

const registerSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
  subscription: Joi.string().default("starter"),
});

const logInSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const emailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
});

const schemas = {
  registerSchema,
  logInSchema,
  emailSchema,
};

// userSchema.post("save", handleMongooseError);

const Notices = model("user", userSchema);

module.exports = {};
