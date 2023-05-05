const { getNoticesList } = require("./noticesList");
const { getOneNotice } = require("./notices-findOne");
const { getCategory, addNotice } = require("./notices-category");

module.exports = { getNoticesList, getCategory, addNotice, getOneNotice };
