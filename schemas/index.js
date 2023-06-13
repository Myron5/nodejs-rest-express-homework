const { addSchema, updateSchema, updateFavoriteSchema } = require("./contacts");
const contactsDbSchema = require("./contactsDbSchema");

module.exports = {
  addSchema,
  updateSchema,
  updateFavoriteSchema,
  contactsDbSchema,
};
