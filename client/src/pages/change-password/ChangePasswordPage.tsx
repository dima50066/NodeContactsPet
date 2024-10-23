import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'; // Імпорт для повідомлень

const ChangePasswordPage: React.FC = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const resetToken = queryParams.get('token');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const handlePasswordChange = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (newPassword !== confirmNewPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    try {
      await axios.post('/auth/reset-pwd', { resetToken, newPassword });
      toast.success('Password changed successfully.'); // Повідомлення про успішну зміну пароля
      localStorage.removeItem('token');
    } catch (error) {
      toast.error('Failed to change password. Please try again.'); // Повідомлення про помилку
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Change Password</h2>
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmNewPassword}
            onChange={(event) => setConfirmNewPassword(event.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
          />
          <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-500">
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
