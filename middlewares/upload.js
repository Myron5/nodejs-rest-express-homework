const multer = require('multer');
const path = require('node:path');

const { HttpError } = require('../helpers');
const { limitFileAvatar } = require('../constants');
const tempDir = path.join(__dirname, '../', 'tmp');

const multerStorage = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, callback) => {
    const [_, extension] = file.mimetype.split('/');
    const { _id } = req.user;
    const newFileName = `${_id}.${extension}`;
    callback(null, newFileName);
  },
});

const multerFilter = (_, file, callback) => {
  if (file.mimetype.includes('image/')) {
    callback(null, true);
  } else {
    callback(HttpError(400, 'Please, upload images only!'), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: {
    size: limitFileAvatar,
  },
}).single('avatar');

module.exports = upload;
