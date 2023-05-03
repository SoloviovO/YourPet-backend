const { addContactSchema } = require("../../schemas");
const { ContactModel } = require("../../database/models");
const { mapContactOutput } = require("./services/contact-mapping.service");

const createContact = async (req, res, next) => {
  try {
    const { name, email, phone, favorite } = req.body;

    const { error } = addContactSchema.validate({ name, email, phone });
    if (error) {
      const invalidField = error.details[0].path[0];
      const err = new Error(`missing required ${invalidField} field`);
      err.code = 400;
      throw err;
    }
    const newContacts = await ContactModel.create({
      name,
      email,
      phone,
      favorite,
    });

    const mappedContact = mapContactOutput(newContacts);
    res.status(201).json(mappedContact);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createContact,
};
