import React, { useState } from 'react';
import axios from 'axios';

const ResetPasswordPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      await axios.post('/auth/send-reset-email', { email });
      setMessage('Лист для скидання пароля надіслано на вашу електронну пошту.');
    } catch (err) {
      setError('Помилка, спробуйте ще раз');
    }
  };

  return (
    <form onSubmit={handleResetPassword}>
      <h2>Reset password</h2>
      <input
        type="email"
        placeholder="Електронна пошта"
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

export default ResetPasswordPage;
