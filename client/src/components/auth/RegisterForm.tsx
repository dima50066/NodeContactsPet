import React, { useState } from 'react';
import axios from 'axios';

const RegisterForm: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('/auth/register', { name, email, password });
      // Додайте логіку після успішної реєстрації (наприклад, перенаправлення)
    } catch (err) {
      setError('Помилка реєстрації, спробуйте ще раз');
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Реєстрація</h2>
      <input
        type="text"
        placeholder="Ім'я"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Електронна пошта"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Зареєструватись</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default RegisterForm;
