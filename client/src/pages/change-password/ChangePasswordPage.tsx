import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const ChangePasswordPage: React.FC = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const resetToken = queryParams.get('token');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [formError, setFormError] = useState('');

  const handlePasswordChange = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormMessage('');
    setFormError('');

    if (newPassword !== confirmNewPassword) {
      setFormError('Passwords do not match');
      return;
    }

    try {
      await axios.post('/auth/reset-pwd', { resetToken, newPassword });
      setFormMessage('Your password has been changed.');
      localStorage.removeItem('token');
    } catch (error) {
      setFormError('Something went wrong. Please try again.');
    }
  };

  return (
    <form onSubmit={handlePasswordChange}>
      <h2>Change Password</h2>
      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(event) => setNewPassword(event.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Confirm New Password"
        value={confirmNewPassword}
        onChange={(event) => setConfirmNewPassword(event.target.value)}
        required
      />
      <button type="submit">Change Password</button>
      {formMessage && <p>{formMessage}</p>}
      {formError && <p>{formError}</p>}
    </form>
  );
};

export default ChangePasswordPage;
