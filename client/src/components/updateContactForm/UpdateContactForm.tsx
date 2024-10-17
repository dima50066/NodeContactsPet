import React, { useState } from 'react';
import { useContacts } from '../../hooks/useContacts';
import { ContactType } from '../../types';

interface UpdateContactFormProps {
  contact: ContactType;
  onClose: () => void;
}

const UpdateContactForm: React.FC<UpdateContactFormProps> = ({ contact, onClose }) => {
  const { modifyContact } = useContacts();
  const [name, setName] = useState(contact.name);
  const [email, setEmail] = useState(contact.email);
  const [phone, setPhone] = useState(contact.phoneNumber);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    modifyContact(contact._id, { name, email, phoneNumber: phone });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />
      <button type="submit">Update Contact</button>
    </form>
  );
};

export default UpdateContactForm;
