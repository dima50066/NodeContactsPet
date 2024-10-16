import React from 'react';
import { useSelector } from 'react-redux';
import Navigation from '../navigation/Navigation';
import UserMenu from '../../components/userMenu/UserMenu';
import { AuthNav } from '../authNav/AuthNav';
import { selectToken } from '../../redux/auth/selectors';

const AppBar: React.FC = () => {
  const token = useSelector(selectToken);
  const isAuthenticated = Boolean(token);

  return (
    <header aria-label="navigation">
      <Navigation />
      {isAuthenticated ? <UserMenu /> : <AuthNav />}
    </header>
  );
};

export default AppBar;
