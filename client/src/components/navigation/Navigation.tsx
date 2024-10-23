import React from 'react';
import { Link } from 'react-router-dom';

const Navigation: React.FC = () => {
  return (
    <nav>
      <ul className="flex space-x-4">
        <li>
          <Link to="/" className="text-white hover:underline">Home</Link>
        </li>
        <li>
          <Link to="/contacts" className="text-white hover:underline">Contacts</Link>
        </li>
        <li>
          <Link to="/send-reset" className="text-white hover:underline">Reset password</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
