import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterForm: React.FC = () => {
  const [registrationName, setRegistrationName] = useState('');
  const [registrationEmail, setRegistrationEmail] = useState('');
  const [registrationPassword, setRegistrationPassword] = useState('');
  const [registrationError, setRegistrationError] = useState('');
  const navigate = useNavigate();

  const handleRegistration = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setRegistrationError('');

    try {
      await axios.post('/auth/register', {
        name: registrationName,
        email: registrationEmail,
        password: registrationPassword,
      });

      navigate('/login');
    } catch {
      setRegistrationError('Registration failed');
    }
  };

  return (
    <form onSubmit={handleRegistration}>
      <h2>Register</h2>
      <label>
        Name:
        <input
          type="text"
          value={registrationName}
          onChange={(event) => setRegistrationName(event.target.value)}
          required
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          value={registrationEmail}
          onChange={(event) => setRegistrationEmail(event.target.value)}
          required
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={registrationPassword}
          onChange={(event) => setRegistrationPassword(event.target.value)}
          required
        />
      </label>
      <button type="submit">Send</button>
      {registrationError && <p>{registrationError}</p>}
    </form>
  );
};

export default RegisterForm;
