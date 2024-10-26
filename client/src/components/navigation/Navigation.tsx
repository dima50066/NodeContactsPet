import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <nav className="relative">
      {/*Button for menu */}
      <button
        className="flex items-center px-3 py-2 text-white bg-blue-500 rounded lg:hidden hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        onClick={toggleMenu}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>

      {/* Menu */}
      <ul className={`flex-col lg:flex-row space-x-0 mt-2 lg:space-x-4 lg:space-y-0 space-y-2 lg:space-y-0 ${isOpen ? 'block' : 'hidden'} lg:flex`}>
        <li>
          <Link
            to="/"
            className="text-white hover:bg-blue-500 hover:text-white focus:bg-blue-500 focus:text-white px-4 py-2 rounded transition duration-200"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/contacts"
            className="text-white hover:bg-blue-500 hover:text-white focus:bg-blue-500 focus:text-white px-4 py-2 rounded transition duration-200"
          >
            Contacts
          </Link>
        </li>
        <li>
          <Link
            to="/send-reset"
            className="text-white hover:bg-blue-500 hover:text-white focus:bg-blue-500 focus:text-white px-4 py-2 rounded transition duration-200"
          >
            Reset password
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
