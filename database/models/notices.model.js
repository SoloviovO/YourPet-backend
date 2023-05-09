const { Schema, model } = require("mongoose");

// const handleMongooseError = require("");

const noticesSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
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
    location: {
      type: String,
      required: true,
    },
    sex: {
      type: String,
      enum: ["male", "female"],
      required: [true, "Choose the sex of the animal, male or female"],
    },
    category: {
      type: String,
      enum: ["sell", "lost/found", "in good hands"],
      required: true,
    },
    price: {
      type: String,
    },
    comments: {
      type: String,
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
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: false }
);

// userSchema.post("save", handleMongooseError);

const NoticesModel = model("notices", noticesSchema);

module.exports = { NoticesModel };
