const fs = require("fs");
const crypto = require("crypto");
const util = require("util");
const unlikeFile = util.promisify(fs.unlink);

const { uploadFile } = require("../s3");

const fileController = {
  // POST /images
  uploadFiles: async (req, res) => {
    const file = req.file;
    const fileHash = crypto.randomBytes(10).toString("hex");
    const fileName = `${fileHash}-${file.originalname}`;

    const result = await uploadFile(file, fileName);

    await unlikeFile(file.path);
    res.send({ imagePath: `/images/${result.Key}` });
  },
};

exports.fileController = fileController;
