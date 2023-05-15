const { getNoticesByTitle } = require("./notices-findByTitle");
const { getOneNotice } = require("./notices-findOne");
const { getCategory } = require("./getCategory");
const { addNotice } = require("./addNotice");
const { getNoticesByOwnerId } = require("./getNoticesByOwnerId");
const { deleteNotice } = require("./deleteNotice");
const { getOwnNoticesByTitle } = require("./own-notices-findByTitle");
const { getFavoriteNoticesByTitle } = require("./favorit-notices-findByTitle");

module.exports = {
  getNoticesByTitle,
  getCategory,
  addNotice,
  getOneNotice,
  getNoticesByOwnerId,
  deleteNotice,
  getOwnNoticesByTitle,
  getFavoriteNoticesByTitle,
};
