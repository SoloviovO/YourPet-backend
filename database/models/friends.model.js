const mongoose = require("mongoose");

const friendsSchema = mongoose.Schema(
  {
    title: {
      type: String,
    },
    url: {
      type: String,
    },
    addressUrl: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
    address: {
      type: String,
    },
    workDays: {
      type: Array,
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
    },
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
