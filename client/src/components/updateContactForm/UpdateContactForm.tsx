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

const UpdateContactForm: React.FC<UpdateContactFormProps> = ({
  contact,
  onClose,
  onUpdateSuccess,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [name, setName] = useState(contact.name);
  const [email, setEmail] = useState(contact.email);
  const [phoneNumber, setPhoneNumber] = useState(contact.phoneNumber);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [contactType, setContactType] = useState(contact.contactType);
  const [isFavourite, setIsFavourite] = useState(contact.isFavourite);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email ?? '');
    formData.append('phoneNumber', phoneNumber);
    formData.append('isFavourite', isFavourite.toString());
    formData.append('contactType', contactType);

    if (photoFile) {
      formData.append('photo', photoFile);
    }

    await dispatch(updateContact({ id: contact._id, updates: formData }));
    onUpdateSuccess();
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Contact Name"
          required
        />
      </label>

      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Contact Email"
          required
        />
      </label>

      <label>
        Phone:
        <input
          type="tel"
          value={phoneNumber}
          onChange={(event) => setPhoneNumber(event.target.value)}
          placeholder="Contact Phone"
          required
        />
      </label>

      <label>
        Photo:
        <input
          type="file"
          onChange={(event) => setPhotoFile(event.target.files ? event.target.files[0] : null)}
          accept="image/*"
        />
      </label>

      <label>
        Type:
        <select
          value={contactType}
          onChange={(event) =>
            setContactType(event.target.value as "personal" | "work" | "home")
          }
        >
          <option value="personal">Personal</option>
          <option value="work">Work</option>
          <option value="home">Home</option>
        </select>
      </label>

      <label>
        <input
          type="checkbox"
          checked={isFavourite}
          onChange={(event) => setIsFavourite(event.target.checked)}
        />
        Favourite
      </label>

      <button type="submit">Update Contact</button>
      <button type="button" onClick={onClose}>
        Cancel
      </button>
    </form>
  );
};

export default UpdateContactForm;
