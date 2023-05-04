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
      required: true,
    },
    favorite: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Notices" }],
    },
    sessionKey: {
      type: String,
      default: null,
      trim: true,
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
