// ContactPage.tsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from '../../redux/contacts/operations';
import { selectContacts } from '../../redux/contacts/selectors';
import { ContactType } from '../../types';
import ContactList from '../../components/contactList/ContactList';
import ContactForm from '../../components/contactForm/ContactForm';
import UpdateContactForm from '../../components/updateContactForm/UpdateContactForm';
import SearchBox from '../../components/searchBox/SearchBox';
import { AppDispatch } from '../../redux/store';

const ContactPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const [selectedContact, setSelectedContact] = useState<ContactType | null>(null);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div>
      <h1>Contact Page</h1>
      <SearchBox onSearch={(query) => console.log('Searching for:', query)} />
      <ContactForm contacts={contacts} onAdd={(newContact) => console.log(newContact)} />
      <ContactList onSelectContact={setSelectedContact} />
      {selectedContact && (
        <UpdateContactForm
          contact={selectedContact}
          onClose={() => setSelectedContact(null)}
          onUpdateSuccess={() => dispatch(fetchContacts())}
        />
      )}
    </div>
  );
};

export default ContactPage;
