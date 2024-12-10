const multer = require("multer");
const path = require("path");

// Configuration du stockage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/meetings"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// Filtrage des fichiers pour n'accepter que les .mp3
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "audio/mpeg" || file.mimetype === "audio/mp3") {
    cb(null, true);
  } else {
    cb(new Error("Seuls les fichiers MP3 sont autorisés."), false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
