const mongoose = require("mongoose");

const friendsSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Set title"],
    },
    url: {
      type: String,
    },
    addressUrl: { type: String },
    imageUrl: {
      type: String,
      default: false,
    },
    address: {
      type: String,
      default: null,
    },
    workDays: {
      type: Array,
      default: null,
    },
    phone: {
      type: String,
      default: null,
    },
    email: { type: String },
  },
  {
    versionKey: false,
    timestamps: false,
  }
);

const FriendModel = mongoose.model("friends", friendsSchema);

module.exports = {
  FriendModel,
};
