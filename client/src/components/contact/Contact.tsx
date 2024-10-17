import React from 'react';
import { ContactType } from '../../types';

interface ContactProps {
  contact: ContactType;
  onRemove: (id: string) => void;
}

const Contact: React.FC<ContactProps> = ({ contact, onRemove }) => {
  const handleRemove = () => {
    onRemove(contact._id);
  };

  return (
    <div>
      <h3>{contact.name}</h3>
      <p>Email: {contact.email}</p>
      <p>Phone: {contact.phoneNumber}</p>
      <button onClick={handleRemove}>Remove</button>
    </div>
  );
};

export default Contact;
