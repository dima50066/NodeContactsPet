import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateContact } from '../../redux/contacts/operations';
import { AppDispatch } from '../../redux/store';
import { ContactType } from '../../types';
import { toast } from 'react-toastify';

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
  const [contactName, setContactName] = useState(contact.name);
  const [contactEmail, setContactEmail] = useState(contact.email ?? '');
  const [contactPhoneNumber, setContactPhoneNumber] = useState(contact.phoneNumber);
  const [contactPhoto, setContactPhoto] = useState<File | null>(null);
  const [contactType, setContactType] = useState(contact.contactType);
  const [isContactFavourite, setIsContactFavourite] = useState(contact.isFavourite);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', contactName);
    formData.append('email', contactEmail);
    formData.append('phoneNumber', contactPhoneNumber);
    formData.append('isFavourite', isContactFavourite.toString());
    formData.append('contactType', contactType);

    if (contactPhoto) {
      formData.append('photo', contactPhoto);
    }

    try {
      await dispatch(updateContact({ id: contact._id, updates: formData }));
      toast.success('Contact updated successfully!');
      onUpdateSuccess();
      onClose();
    } catch (error) {
      toast.error('Failed to update contact. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data" className="p-4 bg-white rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Update Contact</h2>

      <label className="block mb-2">
        Name:
        <input
          type="text"
          value={contactName}
          onChange={(event) => setContactName(event.target.value)}
          placeholder="Contact Name"
          required
          className="block w-full p-2 border border-gray-300 rounded"
        />
      </label>

      <label className="block mb-2">
        Email:
        <input
          type="email"
          value={contactEmail}
          onChange={(event) => setContactEmail(event.target.value)}
          placeholder="Contact Email"
          required
          className="block w-full p-2 border border-gray-300 rounded"
        />
      </label>

      <label className="block mb-2">
        Phone:
        <input
          type="tel"
          value={contactPhoneNumber}
          onChange={(event) => setContactPhoneNumber(event.target.value)}
          placeholder="Contact Phone"
          required
          className="block w-full p-2 border border-gray-300 rounded"
        />
      </label>

      <label className="block mb-2">
        Photo:
        <input
          type="file"
          onChange={(event) => setContactPhoto(event.target.files ? event.target.files[0] : null)}
          accept="image/*"
          className="block w-full p-2 border border-gray-300 rounded"
        />
      </label>

      <label className="block mb-2">
        Type:
        <select
          value={contactType}
          onChange={(event) =>
            setContactType(event.target.value as "personal" | "work" | "home")
          }
          className="block w-full p-2 border border-gray-300 rounded"
        >
          <option value="personal">Personal</option>
          <option value="work">Work</option>
          <option value="home">Home</option>
        </select>
      </label>

      <label className="flex items-center mb-4">
        <input
          type="checkbox"
          checked={isContactFavourite}
          onChange={(event) => setIsContactFavourite(event.target.checked)}
          className="mr-2"
        />
        Favourite
      </label>

      <div className="flex space-x-2">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
        >
          Update Contact
        </button>
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-200"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default UpdateContactForm;
