const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
require("dotenv").config();

const { CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  folder: "avatars",
  allowedFormats: ["jpg", "png", "svg"],
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

// const uploadCloud = multer({ storage, limits: { fileSize: 3000000 } });
const uploadCloud = multer({
  storage,
  limits: { fileSize: 3000000 },
  fileFilter: (req, file, cb) => {
    const allowedFormats = ["jpg", "png", "svg"];
    const fileExtension =
      file.originalname.split(".")[file.originalname.split(".").length - 1];
    if (!allowedFormats.includes(fileExtension)) {
      return cb(new Error("Invalid file format"));
    }
    cb(null, true);
  },
});

module.exports = {
  uploadCloud,
};
