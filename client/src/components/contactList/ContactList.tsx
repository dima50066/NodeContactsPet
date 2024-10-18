// ContactList.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { deleteContact, fetchContacts } from '../../redux/contacts/operations';
import { ContactType } from '../../types';
import { selectContacts } from '../../redux/contacts/selectors';
import Contact from '../contact/Contact';

interface ContactListProps {
  onSelectContact: (contact: ContactType) => void;
}

const ContactList: React.FC<ContactListProps> = ({ onSelectContact }) => {
  const dispatch: AppDispatch = useDispatch();
  const contacts = useSelector(selectContacts); // Отримайте контакти з глобального стану

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleRemoveContact = (id: string) => {
    dispatch(deleteContact(id));
    // Можливо, ви захочете оновити список контактів після видалення
  };

  const handleUpdateContact = (updatedContact: ContactType) => {
    // Тут можна додати логіку, якщо потрібно
    // Наприклад, ви можете викликати dispatch для оновлення контактів
    dispatch(fetchContacts()); // Після оновлення контакту, повторно отримати список
  };

  return (
    <div>
      {contacts.map((contact) => (
        <Contact
          key={contact._id}
          contact={contact}
          onRemove={handleRemoveContact}
          onSelect={onSelectContact}
          onUpdate={handleUpdateContact}
        />
      ))}
    </div>
  );
};

export default ContactList;
