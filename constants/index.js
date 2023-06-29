const { mixToRegexp, phoneRegexOne, phoneRegexTwo, passwordRegex, emailRegex } = require('./regex');
const { imageConfig, cloudinaryConfig } = require('./cloudinaryConfig');
const gravatarConfig = require('./gravatarConfig');
const mongooseSchemaConfig = require('./mongooseSchemaConfig');

module.exports = {
  mixToRegexp,
  phoneRegexOne,
  phoneRegexTwo,
  passwordRegex,
  emailRegex,
  imageConfig,
  cloudinaryConfig,
  gravatarConfig,
  mongooseSchemaConfig,
};
