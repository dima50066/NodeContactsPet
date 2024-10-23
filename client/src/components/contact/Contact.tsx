import React from 'react';
import { ContactType } from '../../types';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { MdHome, MdWork, MdPerson } from 'react-icons/md'; // Material Icons

interface ContactProps {
  contact: ContactType;
  onRemove: (id: string) => void;
  onSelect: (contact: ContactType) => void;
  onUpdate: (contact: ContactType) => void;
}

const Contact: React.FC<ContactProps> = ({ contact, onRemove, onSelect, onUpdate }) => {
  const handleRemove = () => onRemove(contact._id);
  const handleEdit = () => onSelect(contact);

  // Функція для рендерингу іконок типів контактів
  const renderContactTypeIcon = (type: string) => {
    switch (type) {
      case 'home':
        return <MdHome className="text-blue-500 mr-1" title="Home" />;
      case 'work':
        return <MdWork className="text-green-500 mr-1" title="Work" />;
      case 'personal':
        return <MdPerson className="text-purple-500 mr-1" title="Personal" />;
      default:
        return null;
    }
  };

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
      <p className="text-gray-700 text-center">
        Favourite: <span className={`inline ${contact.isFavourite ? 'text-yellow-500' : 'text-gray-300'}`}>⭐</span>
      </p>
      <p className="text-gray-700 text-center flex items-center justify-center">
        Contact Type: {renderContactTypeIcon(contact.contactType)}
      </p>
      <div className="mt-4 flex justify-center">
        <button
          onClick={handleRemove}
          className="bg-red-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-red-600 transition flex items-center"
        >
          <FaTrash className="mr-2" /> Remove
        </button>
        <button
          onClick={handleEdit}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition flex items-center"
        >
          <FaEdit className="mr-2" /> Edit
        </button>
      </div>
    </div>
  );
};

export default Contact;
