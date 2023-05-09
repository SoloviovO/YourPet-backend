const { news } = require("./get-news");
const { getNewsByTitle } = require("./news-find-title");

module.exports = {
  news,
  getNewsByTitle,
};
