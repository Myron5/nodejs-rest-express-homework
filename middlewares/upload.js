const multer = require('multer');
const path = require('node:path');

const tempDir = path.join(__dirname, '../', 'tmp');

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (_, file, cb) => {
    // eslint-disable-next-line no-unused-vars
    const [__, ext] = file.mimetype.split('/');
    file.ext = ext;
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: multerConfig,
});

module.exports = upload;
