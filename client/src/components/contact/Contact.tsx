import React from 'react';
import { ContactType } from '../../types';

interface ContactProps {
  contact: ContactType;
  onRemove: (id: string) => void;
  onSelect: (contact: ContactType) => void;
  onUpdate: (contact: ContactType) => void;
}

const Contact: React.FC<ContactProps> = ({ contact, onRemove, onSelect, onUpdate }) => {
  const handleRemove = () => onRemove(contact._id);
  const handleEdit = () => onSelect(contact);

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 max-w-xs mx-auto">
      <img
        className="w-32 h-32 object-cover rounded-full mb-4 mx-auto"
        src={contact.photo}
        alt={contact.name}
      />
      <h3 className="text-xl font-semibold mb-2 text-center">{contact.name}</h3>
      <p className="text-gray-700 text-center">Email: {contact.email}</p>
      <p className="text-gray-700 text-center">Phone: {contact.phoneNumber}</p>
      <p className="text-gray-700 text-center">Favourite: {contact.isFavourite ? 'Yes' : 'No'}</p>
      <p className="text-gray-700 text-center">Contact Type: {contact.contactType}</p>
      <div className="mt-4 flex justify-center">
        <button
          onClick={handleRemove}
          className="bg-red-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-red-600 transition"
        >
          Remove
        </button>
        <button
          onClick={handleEdit}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default Contact;
