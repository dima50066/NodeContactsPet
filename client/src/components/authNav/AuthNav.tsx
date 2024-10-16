import React from 'react';
import { Link } from 'react-router-dom';

export const AuthNav: React.FC = () => {
  return (
    <div>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </div>
  );
};
