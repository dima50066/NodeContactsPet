import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ResetPassword: React.FC = () => {
  const [email, setEmail] = useState<string>('');

  const handleResetPasswordSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await axios.post('/auth/send-reset-email', { email: email.trim() });
      toast.success('A reset password email has been sent.');
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Reset Password</h2>
        <form onSubmit={handleResetPasswordSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
          />
          <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-500">
            Send Reset Email
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
