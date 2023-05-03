const { ContactModel } = require("../../database/models");

const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await ContactModel.findByIdAndDelete(id).catch((error) => {
      const err = Error(error.message);
      err.code = 400;
      throw err;
    });
    if (result === null) {
      const err = new Error("Not found");
      err.code = 404;
      throw err;
    }
    res.status(200).send({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  deleteContact,
};
