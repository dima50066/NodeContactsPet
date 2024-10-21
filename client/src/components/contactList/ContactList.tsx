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
  const dispatch = useDispatch<AppDispatch>();
  const contacts = useSelector(selectContacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleRemove = (id: string) => dispatch(deleteContact(id));
  const handleUpdate = (updatedContact: ContactType) => dispatch(fetchContacts());

  return (
    <div>
      {contacts.map(contact => (
        <Contact
          key={contact._id}
          contact={contact}
          onRemove={handleRemove}
          onSelect={onSelectContact}
          onUpdate={handleUpdate}
        />
      ))}
    </div>
  );
};

export default ContactList;
