import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosInstance from '../../hooks/axiosConfig';

const RegisterForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await axiosInstance.post('/auth/register', { name, email, password });

      toast.success('Registration successful!');
      navigate('/login');
    } catch (error) {
      console.error('Registration error:', error); // Додано логування помилки
      toast.error('Registration failed');
    }
  };

  return (
    <form onSubmit={handleRegister} className="space-y-4">
      {/* поля для введення */}
      <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-500">
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
