import React from 'react';
import { ContactType } from '../../types';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { MdHome, MdWork, MdPerson } from 'react-icons/md'; // Material Icons
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'; // Іконки для зірочок

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
    <div className="bg-white shadow-md rounded-lg p-4 mb-2 mx-auto w-full max-h-80">
      <img
        className="w-24 h-24 object-cover rounded-full mb-2 mx-auto"
        src={contact.photo}
        alt={contact.name}
      />
      <h3 className="text-lg font-semibold mb-1 text-center">{contact.name}</h3>
      <p className="text-gray-700 text-center text-sm">Email: {contact.email}</p>
      <p className="text-gray-700 text-center text-sm">Phone: {contact.phoneNumber}</p>
      <p className="text-gray-700 text-center flex items-center justify-center text-sm">
        Favourite:
        <span className="inline ml-1">
          {contact.isFavourite ? (
            <AiFillStar className="text-yellow-500" />
          ) : (
            <AiOutlineStar className="text-gray-300" />
          )}
        </span>
      </p>
      <p className="text-gray-700 text-center flex items-center justify-center text-sm">
        Contact Type: {renderContactTypeIcon(contact.contactType)}
      </p>
      <div className="mt-2 flex justify-center">
        <button
          onClick={handleRemove}
          className="bg-red-500 text-white px-3 py-1 rounded-md mr-1 hover:bg-red-600 transition flex items-center text-sm"
        >
          <FaTrash className="mr-1" /> Remove
        </button>
        <button
          onClick={handleEdit}
          className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition flex items-center text-sm"
        >
          <FaEdit className="mr-1" /> Edit
        </button>
      </div>
    </div>
  );
};

export default Contact;
