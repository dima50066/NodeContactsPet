import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { deleteContact, fetchContacts } from '../../redux/contacts/operations';
import { ContactType } from '../../types';
import { selectContacts } from '../../redux/contacts/selectors'; // Припустимо, ви маєте відповідний селектор

interface ContactListProps {
  onSelectContact: (contact: ContactType) => void;
}

const ContactList: React.FC<ContactListProps> = ({ onSelectContact }) => {
  const dispatch: AppDispatch = useDispatch();
  const contacts = useSelector(selectContacts); // Отримуємо контакти з Redux

  useEffect(() => {
    // Диспатчим fetchContacts для отримання контактів з бекенда
    dispatch(fetchContacts());
  }, [dispatch]);

  // Перевірка отриманих контактів
  useEffect(() => {
    console.log('Received contacts:', contacts);
  }, [contacts]);

  const handleRemoveContact = (id: string) => {
    dispatch(deleteContact(id));
  };

  return (
    <ul>
      {contacts.length > 0 ? (
        contacts.map((contact: ContactType) => (
          <li key={contact._id}>
            <span onClick={() => onSelectContact(contact)}>{contact.name}</span>
            <button onClick={() => handleRemoveContact(contact._id)}>Delete</button>
          </li>
        ))
      ) : (
        <li>No contacts available</li>
      )}
    </ul>
  );
};

export default ContactList;
