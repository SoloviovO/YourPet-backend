const { ContactModel } = require("../../database/models");
const { mapContactOutput } = require("./services/contact-mapping.service");

const getContacts = async (req, res, next) => {
  try {
    const contacts = await ContactModel.find({});

    const mappedContacts = contacts.map(mapContactOutput);
    res.json(mappedContacts);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getContacts,
};
