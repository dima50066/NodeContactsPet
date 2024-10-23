import React from 'react';
import { Link } from 'react-router-dom';

export const AuthNav: React.FC = () => {
  return (
    <div className="flex space-x-4">
      <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
      <Link to="/register" className="text-blue-600 hover:underline">Register</Link>
    </div>
  );
};
