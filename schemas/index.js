const { flag, flagSchema, updateFavoriteSchema } = require('./contacts');
const contactsDbSchema = require('./contactsDbSchema');
const { registerLoginSchema } = require('./users');
const userDbSchema = require('./userDbSchema');

module.exports = {
  flag,
  flagSchema,
  updateFavoriteSchema,
  contactsDbSchema,

  userDbSchema,
  registerLoginSchema,
};
