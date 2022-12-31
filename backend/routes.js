const express = require("express");
const multer = require("multer");
const { fileController } = require("./controllers/fileController");

const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.post("/images", upload.single("image"), fileController.uploadFiles);

module.exports = router;
