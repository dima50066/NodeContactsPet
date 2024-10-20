import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/auth/operations';
import { AppDispatch } from '../../redux/store';
import { useNavigate } from 'react-router-dom';
import { selectIsLoggedIn, selectError } from '../../redux/auth/selectors';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const loginError = useSelector(selectError);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const resultAction = await dispatch(loginUser({ email, password }));
      if (loginUser.fulfilled.match(resultAction)) {
        // Успішний логін, перехід на контактну сторінку
        navigate('/contacts');
      } else {
        // Якщо логін не вдався
        setError('Login failed: ' + (resultAction.payload as string || 'Unknown error'));
      }
    } catch (err: any) {
      setError(err.message || 'Login failed');
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/contacts');
    }
  }, [isLoggedIn, navigate]);

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
        title="Please enter a valid email address"
        autoComplete='email'
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
        autoComplete='current-password'
      />
      <button type="submit">Login</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loginError && <p style={{ color: 'red' }}>{loginError}</p>} {/* Відображаємо помилку з Redux */}
    </form>
  );
};

export default LoginForm;
