// contacts.js
import fs from "fs/promises";
import * as path from "path";
import * as _ from "lodash-es";
import { v4 as uuidv4 } from "uuid";

const contactsPath = path.join(process.cwd(), "src/db/contacts.json");

export async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    return data ? JSON.parse(data) : null;
  } catch (err) {
    throw err;
  }
}

export async function getContactById(contactId) {
  const data = await listContacts();
  return data.find((contact) => contact.id == contactId) ?? null;
}

export async function removeContact(contactId) {
  const data = await listContacts();
  if (data) {
    const deleted = _.remove(data, (contact) => contact.id == contactId);
    if (deleted) {
      fs.writeFile(contactsPath, JSON.stringify(data), function (err) {
        if (err) throw err;
      });
    }
    return deleted.length ? deleted[0] : null;
  } else return null;
}

console.log(await removeContact("AeHIrLTr6JkxGE6SN-0Rw"));
// console.log(await listContacts());

export async function addContact(name, email, phone) {
  // ...твій код. Повертає об'єкт доданого контакту (з id).
  const new_contact = { id: uuidv4(), name: name, email: email, phone: phone };
  console.log(new_contact);
}

// await addContact("Anna Lisner", "a.lisner@newmail.com", "(123) 456-7890");
