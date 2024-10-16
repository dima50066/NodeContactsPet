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
      await axios.post('/auth/reset-pwd', { email });
      setMessage('Лист для скидання пароля надіслано на вашу електронну пошту.');
    } catch (err) {
      setError('Помилка, спробуйте ще раз');
    }
  };

  return (
    <form onSubmit={handleResetPassword}>
      <h2>Скидання пароля</h2>
      <input
        type="email"
        placeholder="Електронна пошта"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">Відправити лист для скидання</button>
      {message && <p>{message}</p>}
      {error && <p>{error}</p>}
    </form>
  );
};

export default ResetPassword;
