const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    passwordHash: {
      type: String,
      required: [true, "Set password for user"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      index: true,
    },
    sessionKey: {
      type: String,
      default: null,
      trim: true,
    },
    token: {
      type: String,
    },
    avatarURL: {
      type: String,
      required: true,
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
