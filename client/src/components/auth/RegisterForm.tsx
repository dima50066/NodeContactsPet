import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // Імпортируем Toastify

const RegisterForm: React.FC = () => {
  const [registrationName, setRegistrationName] = useState('');
  const [registrationEmail, setRegistrationEmail] = useState('');
  const [registrationPassword, setRegistrationPassword] = useState('');
  const navigate = useNavigate();

  const handleRegistration = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await axios.post('/auth/register', {
        name: registrationName,
        email: registrationEmail,
        password: registrationPassword,
      });

      toast.success('Registration successful!'); // Успішне повідомлення
      navigate('/login');
    } catch {
      toast.error('Registration failed'); // Повідомлення про помилку
    }
  };

  return (
    <form onSubmit={handleRegistration} className="space-y-4">
      <label className="block">
        <span className="text-gray-700">Name:</span>
        <input
          type="text"
          value={registrationName}
          onChange={(event) => setRegistrationName(event.target.value)}
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
        />
      </label>
      <label className="block">
        <span className="text-gray-700">Email:</span>
        <input
          type="email"
          value={registrationEmail}
          onChange={(event) => setRegistrationEmail(event.target.value)}
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
        />
      </label>
      <label className="block">
        <span className="text-gray-700">Password:</span>
        <input
          type="password"
          value={registrationPassword}
          onChange={(event) => setRegistrationPassword(event.target.value)}
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
        />
      </label>
      <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-500">
        Send
      </button>
    </form>
  );
};

export default RegisterForm;
