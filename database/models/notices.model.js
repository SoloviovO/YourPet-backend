const { Schema, model } = require("mongoose");

// const handleMongooseError = require("");

const noticesSchema = new Schema(
  {
    category: {
      type: String,
      enum: ["sell", "lost/found", "in good hands"],
      required: true,
    },
    title: {
      type: String,
    },
    dateOfBirth: {
      type: String,
    },
    namePet: {
      type: String,
    },
    breed: {
      type: String,
    },
    sex: {
      type: String,
      enum: ["male", "female"],
      required: [true, "Choose the sex of the animal, male or female"],
    },
    location: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      // default: "",
    },
    comments: {
      type: String,
    },
    photoURL: {
      type: String,
      //   required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: false }
);

// userSchema.post("save", handleMongooseError);

const NoticesModel = model("notices", noticesSchema);

module.exports = { NoticesModel };
