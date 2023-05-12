const mongoose = require("mongoose");

const newsSchema = mongoose.Schema(
  {
    title: {
      type: String,
    },
    text: {
      type: String,
    },
    url: {
      type: String,
    },
    imgUrl: {
      type: String,
    },
    date: {
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: false,
  }
);

const NewsModel = mongoose.model("news", newsSchema);

module.exports = {
  NewsModel,
};
