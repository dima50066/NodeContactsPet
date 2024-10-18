// UpdateContactForm.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateContact } from '../../redux/contacts/operations';
import { AppDispatch } from '../../redux/store';
import { ContactType } from '../../types';

interface UpdateContactFormProps {
  contact: ContactType;
  onClose: () => void;
  onUpdateSuccess: () => void; // Додайте новий пропс
}

const UpdateContactForm: React.FC<UpdateContactFormProps> = ({ contact, onClose, onUpdateSuccess }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [name, setName] = useState(contact.name);
  const [email, setEmail] = useState(contact.email);
  const [phone, setPhone] = useState(contact.phoneNumber);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedContact = {
      id: contact._id,
      updates: {
        name,
        email,
        phoneNumber: phone,
      },
    };
    await dispatch(updateContact(updatedContact));
    onUpdateSuccess();
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Contact Name"
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Contact Email"
        required
      />
      <input
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Contact Phone"
        required
      />
      <button type="submit">Update Contact</button>
      <button type="button" onClick={onClose}>Cancel</button>
    </form>
  );
};

export default UpdateContactForm;
