const mongoose = require("mongoose");

const newsSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Set title for new"],
    },
    url: {
      type: String,
    },
    description: {
      type: String,
    },
    date: {
      type: String,
      default: null,
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
