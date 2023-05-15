const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    passwordHash: {
      type: String,
      required: [true, "Set password for user"],
      trim: true,
    },
    name: {
      type: String,
      default: "Name",
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      index: true,
    },
    birthday: {
      type: String,
      default: "00.00.0000",
      required: true,
    },
    phone: {
      type: String,
      unique: true,
      default: "+380000000000",
    },
    city: {
      type: String,
      default: "City",
    },
    image: {
      type: String,
    },
    favorite: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "notices",
      },
    ],
    pets: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "pets",
      default: [],
    },
    notices: [
      {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "notices",
        default: [],
      },
    ],
    sessionKey: {
      type: String,
      default: null,
      trim: true,
    },
    refreshToken: {
      type: String,
    },
    token: {
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: false,
  }
);

const UserModel = mongoose.model("user", userSchema);

module.exports = {
  UserModel,
};
