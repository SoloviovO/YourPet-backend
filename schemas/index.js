const { addUserSchema } = require("./add-user.schema");
const noticeSchemas = require("./notice.schema");
const addPetSchema = require("./add-pet-schema");
const {
  updateUserInfo,
  updateUserInfoSchema,
} = require("./update-userInfo.schems");

module.exports = {
  addUserSchema,
  noticeSchemas,
  updateUserInfoSchema,
  addPetSchema,
};
