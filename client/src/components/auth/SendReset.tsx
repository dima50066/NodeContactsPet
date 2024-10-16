import React, { useState } from 'react';
import axios from 'axios';

const ResetPassword: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      await axios.post('/auth/send-reset-email', { email });
      setMessage('List for resetting password sent to your email.');
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <form onSubmit={handleResetPassword}>
      <h2>Reset password</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">Send reset email</button>
      {message && <p>{message}</p>}
      {error && <p>{error}</p>}
    </form>
  );
};

export default ResetPassword;
