const fs = require("fs");
const crypto = require("crypto");
const util = require("util");
const unlikeFile = util.promisify(fs.unlink);

const { uploadFile, getAllFiles, getFileStream } = require("../s3");

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
  // GET /images
  getAllFiles: async (req, res) => {
    const contents = await getAllFiles();

    return res.json(contents.map(content => content.Key));
  },
  // GET /images/:key
  getImageByKey: async (req, res) => {
    const { key } = req.params;
    const readStream = getFileStream(key);

    readStream.pipe(res);
  },
};

exports.fileController = fileController;
