const contacts = require("../models/contacts.js");
const { HttpError, ctrlWrapper } = require("../helpers");

const getAll = async (req, res) => {
  const { _id } = req.user;
  const result = await contacts.listContacts(_id);
  res.json(result);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.getContactById(contactId);
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

const deleteById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.removeContact(contactId);
  if (!result) {
    throw HttpError(404);
  }
  res.json({ message: "contact deleted" });
};

const add = async (req, res) => {
  const { _id } = req.user;
  const result = await contacts.addContact(_id, req.body);
  if (!result) {
    throw HttpError(404);
  }
  res.status(201).json(result);
};

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.updateContact(contactId, req.body);
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

const updateFavoriteById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.updateContact(contactId, req.body);
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  deleteById: ctrlWrapper(deleteById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  updateFavoriteById: ctrlWrapper(updateFavoriteById),
};
