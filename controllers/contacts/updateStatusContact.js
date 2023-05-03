const { addContactStatusUpdateSchema } = require("../../schemas");
const { ContactModel } = require("../../database/models");
const { mapContactOutput } = require("./services/contact-mapping.service");

const updateStatusContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { favorite } = req.body;

    const { error } = addContactStatusUpdateSchema.validate({
      favorite,
    });
    if (error) {
      const err = new Error("missing field favorite");
      err.code = 400;
      throw err;
    }

    const result = await ContactModel.findByIdAndUpdate(
      id,
      {
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
  updateStatusContact,
};
