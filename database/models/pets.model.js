const { Schema, model } = require("mongoose");

// const handleMongooseError = require("");

const petsSchema = new Schema(
  {
    name: {
      type: String,
      minLength: 2,
      maxLength: 16,
      required: true,
    },
    birthday: {
      type: String,
      default: "00.00.0000",
      required: true,
    },

    breed: {
      type: String,
      minLength: 2,
      maxLength: 16,
      required: true,
    },
    comments: {
      type: String,
      minLength: 8,
      maxLength: 120,
    },
    image: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: false,
  }
);

// userSchema.post("save", handleMongooseError);

const PetsModel = model("pets", petsSchema);

module.exports = { PetsModel };
