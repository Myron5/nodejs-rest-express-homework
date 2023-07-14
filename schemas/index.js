const { flag, flagSchema, updateFavoriteSchema } = require('./contacts');
const contactsDbSchema = require('./contactsDbSchema');
const { registerLoginSchema } = require('./users');
const userDbSchema = require('./userDbSchema');
const emailSchema = require('./emailSchema');

module.exports = {
  flag,
  flagSchema,
  updateFavoriteSchema,
  contactsDbSchema,

  userDbSchema,
  registerLoginSchema,

  emailSchema,
};
