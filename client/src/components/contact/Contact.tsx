// Contact.tsx
import React from 'react';
import { ContactType } from '../../types';

interface ContactProps {
  contact: ContactType;
  onRemove: (id: string) => void;
  onSelect: (contact: ContactType) => void;
  onUpdate: (contact: ContactType) => void;
}

const Contact: React.FC<ContactProps> = ({ contact, onRemove, onSelect }) => {
  const handleRemove = () => {
    onRemove(contact._id);
  };

  const handleEdit = () => {
    onSelect(contact); // Викликаємо onSelect для вибору контакту
  };

  return (
    <div>
      <h3>{contact.name}</h3>
      <p>Email: {contact.email}</p>
      <p>Phone: {contact.phoneNumber}</p>
      <button onClick={handleRemove}>Remove</button>
      <button onClick={handleEdit}>Edit</button> {/* Кнопка для редагування контакту */}
    </div>
  );
};

export default Contact;
