const { addContactSchema } = require("../../schemas");
const { ContactModel } = require("../../database/models");
const { mapContactOutput } = require("./services/contact-mapping.service");

const updateOneContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, phone, favorite } = req.body;

    const { error } = addContactSchema.validate({
      name,
      email,
      phone,
      favorite,
    });
    if (error) {
      const err = new Error("missing fields");
      err.code = 400;
      throw err;
    }

    const result = await ContactModel.findByIdAndUpdate(
      id,
      {
        name,
        email,
        phone,
        favorite,
      },
      { new: true }
    ).catch((error) => {
      const err = Error(error.message);
      err.code = 400;
      throw err;
    });
    if (result === null) {
      const err = new Error("Not found");
      err.code = 404;
      throw err;
    }

    const mappedContact = mapContactOutput(result);
    res.json(mappedContact);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  updateOneContact,
};
