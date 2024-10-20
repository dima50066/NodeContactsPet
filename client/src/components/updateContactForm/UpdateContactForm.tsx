import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateContact } from '../../redux/contacts/operations';
import { AppDispatch } from '../../redux/store';
import { ContactType } from '../../types';

interface UpdateContactFormProps {
  contact: ContactType;
  onClose: () => void;
  onUpdateSuccess: () => void;
}

const UpdateContactForm: React.FC<UpdateContactFormProps> = ({ contact, onClose, onUpdateSuccess }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [name, setName] = useState(contact.name);
  const [email, setEmail] = useState(contact.email);
  const [phone, setPhone] = useState(contact.phoneNumber);
  const [photo, setPhoto] = useState<File | null>(null); // Додаємо стан для фото

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Створюємо FormData для відправки файлу разом з іншими даними
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email ?? '');
    formData.append('phoneNumber', phone);

    if (photo) {
      formData.append('photo', photo);
    }

    await dispatch(updateContact({ id: contact._id, updates: formData })); // Передаємо FormData
    onUpdateSuccess();
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
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
      <input
        type="file"
        onChange={(e) => setPhoto(e.target.files ? e.target.files[0] : null)} // Завантаження фото
        accept="image/*"
      />
      <button type="submit">Update Contact</button>
      <button type="button" onClick={onClose}>Cancel</button>
    </form>
  );
};

export default UpdateContactForm;
