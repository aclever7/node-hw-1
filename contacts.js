const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "/db/contacts.json");

const updateContacts = async (contact) => {
  await fs.writeFile(contactsPath, JSON.stringify(contact, null, 2));
};

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const result = contacts.find((contact) => contactId === contact.id);

  if (!result) return null;

  return result;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const newContacts = contacts.filter((contact) => contactId !== contact.id);

  if (!newContacts) return null;
  updateContacts(newContacts);

  return newContacts;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();

  const newContact = {
    name,
    email,
    phone,
    id: nanoid(),
  };

  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContacts,
};
