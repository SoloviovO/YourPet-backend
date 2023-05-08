const { getNoticesList } = require("./noticesList");
const { getOneNotice } = require("./notices-findOne");
const {
  getCategory,
  addNotice,
  getNoticesByOwnerId,
} = require("./notices-category");

module.exports = {
  getNoticesList,
  getCategory,
  addNotice,
  getOneNotice,
  getNoticesByOwnerId,
};
