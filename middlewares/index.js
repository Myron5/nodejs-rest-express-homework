const validateBody = require('./validateBody');
const isValidId = require('./isValidId');
const isUniqueEmail = require('./isUniqueEmail');
const authenticate = require('./authenticate');
const upload = require('./upload');
const isValidPath = require('./isValidPath');
const isVerifiedEmail = require('./isVerifiedEmail');

module.exports = {
  validateBody,
  isValidId,
  isUniqueEmail,
  authenticate,
  upload,
  isValidPath,
  isVerifiedEmail,
};
