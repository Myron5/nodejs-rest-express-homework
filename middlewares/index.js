const validateBody = require("./validateBody");
const isValidId = require("./isValidId");
const isUniqueEmail = require("./isUniqueEmail");
const authenticate = require("./authenticate");
const upload = require("./upload");

module.exports = {
  validateBody,
  isValidId,
  isUniqueEmail,
  authenticate,
  upload,
};
