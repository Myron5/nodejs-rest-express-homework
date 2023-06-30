const { HttpError } = require('../helpers');

const isValidPath = (req, _, next) => {
  if (!req.file) {
    next(HttpError(404, 'File not found'));
  }
  next();
};

module.exports = isValidPath;
