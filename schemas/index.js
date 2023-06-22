const { flag, flagSchema, updateFavoriteSchema } = require("./contacts");
const contactsDbSchema = require("./contactsDbSchema");
const { registerSchema, loginSchema } = require("./users");
const userDbSchema = require("./userDbSchema");

module.exports = {
  flag,
  flagSchema,
  updateFavoriteSchema,
  contactsDbSchema,

  userDbSchema,
  registerSchema,
  loginSchema,
};
