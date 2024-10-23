import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { deleteContact } from '../../redux/contacts/operations';
import Contact from '../contact/Contact';
import { ContactType } from '../../types';
import { toast } from 'react-toastify'; // Імпорт Toastify

interface ContactListProps {
  onSelectContact: (contact: ContactType) => void;
  contacts: ContactType[];
}

const ContactList: React.FC<ContactListProps> = ({ onSelectContact, contacts }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleRemove = async (id: string) => {
    try {
      await dispatch(deleteContact(id));
      toast.success('Contact deleted successfully!'); // Успішне повідомлення
    } catch (error) {
      toast.error('Failed to delete contact. Please try again.'); // Повідомлення про помилку
    }
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2"> {/* Встановлено gap до 2 */}
      {contacts.map(contact => (
        <Contact
          key={contact._id}
          contact={contact}
          onRemove={handleRemove}
          onSelect={onSelectContact}
          onUpdate={onSelectContact}
        />
      ))}
    </div>
  );
};

export default ContactList;
