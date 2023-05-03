const { ContactModel } = require("../../database/models");
const { mapContactOutput } = require("./services/contact-mapping.service");

const getContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await ContactModel.findById(id).catch((error) => {
      const err = Error(error.message);
      err.code = 400;
      throw err;
    });
    if (!contact) {
      const error = new Error("Not found");
      error.code = 404;
      throw error;
    }

    const mappedContact = mapContactOutput(contact);

    res.json(mappedContact);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getContact,
};
