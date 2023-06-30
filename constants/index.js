const { mixToRegexp, phoneRegexOne, phoneRegexTwo, passwordRegex, emailRegex } = require('./regex');
const { imageConfig, cloudinaryConfig } = require('./cloudinaryConfig');
const gravatarConfig = require('./gravatarConfig');
const mongooseSchemaConfig = require('./mongooseSchemaConfig');
const jimpManipulations = require('./jimpManipulations');

const limitFileAvatar = 2 * 1024 * 1024;

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
  jimpManipulations,
  limitFileAvatar,
};
