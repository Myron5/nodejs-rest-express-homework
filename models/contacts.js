const { model } = require("mongoose");
const { contactsDbSchema } = require("../schemas");

const Contact = model("contact", contactsDbSchema);

const listContacts = async (owner, skip, limit) => {
  return await Contact.find({ owner }, "", { skip, limit });
};

const getContactById = async (contactId) => {
  return Contact.findById(contactId);
};

const removeContact = async (contactId) => {
  return Contact.findOneAndRemove(contactId);
};

const addContact = async (owner, body) => {
  return Contact.create({ ...body, owner });
};

const updateContact = async (contactId, body) => {
  return Contact.findByIdAndUpdate(contactId, body, { new: true });
};

module.exports = {
  Contact,
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
