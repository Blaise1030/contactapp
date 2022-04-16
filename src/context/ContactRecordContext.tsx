import { createContext, useEffect, useState } from "react";
import ContactModel from "../models/ContactModel";

export const useContactRecord = createContext<any>({});
const ContactRecordContext = ({ children }: { children: any }) => {
  const [contacts, setContact] = useState<ContactModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getAllContacts();
  }, []);

  const getAllContacts = async () => {
    setIsLoading(true);
    const endpoint = import.meta.env.VITE_APP_CONTACT_ENDPOINT + "contacts";
    const res = await fetch(endpoint);
    const { results } = await res.json();
    setContact(results);
    setIsLoading(false);
  };

  const editContactBE = async (contactData: ContactModel) => {
    setIsLoading(true);
    const endpoint = `${import.meta.env.VITE_APP_CONTACT_ENDPOINT}contact/${
      contactData.id
    }`;
    const res = await fetch(endpoint, {
      body: JSON.stringify(contactData),
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });
    setIsLoading(false);
    return res.json();
  };

  const postContactBE = async (contactData: ContactModel) => {
    setIsLoading(true);
    const endpoint = `${import.meta.env.VITE_APP_CONTACT_ENDPOINT}contact`;
    const res = await fetch(endpoint, {
      body: JSON.stringify(contactData),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    setIsLoading(false);
    return res.json();
  };

  const deleteContactBE = async (id: string) => {
    setIsLoading(true);
    const endpoint = `${
      import.meta.env.VITE_APP_CONTACT_ENDPOINT
    }contact/${id}`;
    const res = await fetch(endpoint, {
      method: "DELETE",
    });
    setIsLoading(false);
    return res.json();
  };

  const deleteContact = async (id: string) =>
    deleteContactBE(id)
      .catch((e) => console.log(e))
      .then((_) => setContact(contacts.filter((contact) => contact.id !== id)));

  const addContact = async (newContact: ContactModel) =>
    postContactBE(newContact)
      .catch((e) => console.log(e))
      .then(({ id }) => setContact([...contacts, { id, ...newContact }]));

  const editContact = async (id: string, field: Partial<ContactModel>) => {
    const [contact] = contacts.filter((c) => c.id === id);
    const updated = { ...contact, ...field };
    await editContactBE(updated)
      .catch((e) => console.log(e))
      .then(() =>
        setContact(
          contacts.map((contact) => (contact.id !== id ? contact : updated))
        )
      );
  };

  return (
    <useContactRecord.Provider
      value={{
        contacts,
        isLoading,
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
