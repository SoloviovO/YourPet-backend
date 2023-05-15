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
}).single("avatar");

const handleUpload = (req, res, next) => {
  uploadCloud(req, res, (err) => {
    if (err) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({ error: "File size limit exceeded" });
      }
      return res.status(400).json({ error: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ error: "File not provided" });
    }
    next();
  });
};

module.exports = {
  uploadCloud,
  handleUpload,
};
