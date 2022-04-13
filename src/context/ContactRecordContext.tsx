import ContactModel from "../models/ContactModel";
import { createContext, useState } from "react";

export const useContactRecord = createContext<any>({});
const ContactRecordContext = ({ children }: { children: any }) => {
  const [contacts, setContact] = useState<ContactModel[]>([
    {
      name: "Name",
      phoneNumber: "0109696792",
      id: "1",
    },
    {
      name: "Name1",
      phoneNumber: "0109696792",
      id: "2",
    },
    {
      name: "Name2",
      phoneNumber: "0109696792",
      id: "3",
    },
  ]);

  const deleteContact = (id: string) => {
    setContact((contacts) => contacts.filter((contact) => contact.id !== id));
  };

  const addContact = (newContact: ContactModel) => {
    setContact((contacts) => {
      const contactCopy = contacts;
      contactCopy.push(newContact);
      return contacts;
    });
  };

  const editContact = (id: string, field: Partial<ContactModel>) => {
    setContact((contacts) =>
      contacts.map((contact) => {
        if (contact.id !== id) return contact;
        return {
          ...contact,
          ...field,
        };
      })
    );
  };

  return (
    <useContactRecord.Provider
      value={{
        contacts,
        addContact,
        editContact,
        deleteContact,
      }}
    >
      {children}
    </useContactRecord.Provider>
  );
};

export default ContactRecordContext;
