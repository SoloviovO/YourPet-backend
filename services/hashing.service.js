const bcrypt = require("bcryptjs");

const createHash = async (input) => await bcrypt.hash(input, 10);

const checkHash = async (input, hashedInput) =>
  await bcrypt.compare(input, hashedInput);

module.exports = {
  createHash,
  checkHash,
};
