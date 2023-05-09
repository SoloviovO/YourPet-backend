const { getNoticesList } = require("./noticesList");
const { getOneNotice } = require("./notices-findOne");
const { getCategory } = require("./getCategory");
const { addNotice } = require("./addNotice");
const { getNoticesByOwnerId } = require("./getNoticesByOwnerId");
const { deleteNotice } = require("./deleteNotice");

module.exports = {
  getNoticesList,
  getCategory,
  addNotice,
  getOneNotice,
  getNoticesByOwnerId,
  deleteNotice,
};
