const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { throws } = require("assert");
const destination = path.join(__dirname, "../public/upload/img");
const multerConfig = multer.diskStorage({
  destination: destination,
  filename: (req, file, cb, filename) => {
    cb(null, file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  //console.log("el archivo es: ", path.join(destination, file.originalname));

  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    fs.existsSync(path.join(destination, file.originalname))
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage: multerConfig, fileFilter: fileFilter }).single(
  "imagen"
);
module.exports = { multerConfig, fileFilter, upload };
