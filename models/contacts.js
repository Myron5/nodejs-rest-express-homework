const fs = require("node:fs/promises");
const path = require("node:path");
const { randomUUID } = require("node:crypto");

const pathToContacts = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  return JSON.parse(await fs.readFile(pathToContacts, "utf-8"));
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  return contacts.find((contact) => contact.id === contactId) || null;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) return null;

  const [result] = contacts.splice(index, 1);
  await fs.writeFile(pathToContacts, JSON.stringify(contacts));
  return result;
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = { id: randomUUID(), ...body };
  contacts.push(newContact);
  await fs.writeFile(pathToContacts, JSON.stringify(contacts));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) return null;

  const newContact = { id: contactId, ...body };
  contacts[index] = newContact;
  await fs.writeFile(pathToContacts, JSON.stringify(contacts));
  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
