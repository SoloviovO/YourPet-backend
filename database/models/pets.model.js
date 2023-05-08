const { Schema, model } = require("mongoose");

// const handleMongooseError = require("");

const petsSchema = new Schema(
  {
    dateOfBirth: {
      type: String,
    },
    namePet: {
      type: String,
    },
    breed: {
      type: String,
    },
    comments: {
      type: String,
    },
    photoURL: {
      type: String,
      // required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

// userSchema.post("save", handleMongooseError);

const PetsModel = model("pets", petsSchema);

module.exports = { PetsModel };
