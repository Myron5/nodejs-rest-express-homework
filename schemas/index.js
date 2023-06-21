const { addSchema, updateSchema, updateFavoriteSchema } = require("./contacts");
const contactsDbSchema = require("./contactsDbSchema");
const { registerSchema, loginSchema } = require("./users");
const userDbSchema = require("./userDbSchema");

module.exports = {
  addSchema,
  updateSchema,
  updateFavoriteSchema,
  contactsDbSchema,

  userDbSchema,
  registerSchema,
  loginSchema,
};
