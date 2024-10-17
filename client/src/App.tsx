import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCredentials } from './redux/auth/slice';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/login/Login';
import RegisterPage from './pages/register/Register';
import ResetPassword from './components/auth/SendReset';
import AppBar from './components/appBar/AppBar';
import HomePage from './pages/home/Home';
import ResetPasswordPage from './pages/reset-password/ResetPasswordPage';
import ChangePasswordPage from './pages/change-password/ChangePasswordPage';

import { ContactType } from './types';
import ContactForm from './components/contactForm/ContactForm';
import ContactList from './components/contactList/ContactList';
import UpdateContactForm from './components/updateContactForm/UpdateContactForm';
import SearchBox from './components/searchBox/SearchBox';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const [selectedContact, setSelectedContact] = useState<ContactType | null>(null);
  const [contacts, setContacts] = useState<ContactType[]>([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    const token = localStorage.getItem('token');

    if (user && token) {
      dispatch(setCredentials({ user, accessToken: token }));
    }
  }, [dispatch]);

  return (
    <Router>
      <AppBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/send-reset" element={<ResetPassword />} />
        <Route path="/reset-password" element={<ChangePasswordPage />} />
        <Route path="/contacts" element={
          <div>
            <SearchBox onSearch={(query) => console.log('Searching for:', query)} />
            <ContactForm  contacts={contacts} onAdd={newContact => console.log(newContact)}/>
            <ContactList
              onSelectContact={setSelectedContact}
            />
            {selectedContact && (
              <UpdateContactForm
                contact={selectedContact}
                onClose={() => setSelectedContact(null)}
              />
            )}
          </div>
        } />
      </Routes>
    </Router>
  );
};

export default App;
