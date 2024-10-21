import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/auth/operations';
import { AppDispatch } from '../../redux/store';
import { useNavigate } from 'react-router-dom';
import { selectIsLoggedIn, selectError } from '../../redux/auth/selectors';

const LoginForm: React.FC = () => {
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const errorFromRedux = useSelector(selectError);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    try {
      const resultAction = await dispatch(loginUser({ email: emailInput, password: passwordInput }));
      if (loginUser.fulfilled.match(resultAction)) {
        navigate('/contacts');
      } else {
        setLoginError('Login failed: ' + (resultAction.payload as string || 'Unknown error'));
      }
    } catch (err: any) {
      setLoginError(err.message || 'Login failed');
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/contacts');
    }
  }, [isLoggedIn, navigate]);

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        value={emailInput}
        onChange={(e) => setEmailInput(e.target.value)}
        placeholder="Email"
        required
        autoComplete='email'
      />
      <input
        type="password"
        value={passwordInput}
        onChange={(e) => setPasswordInput(e.target.value)}
        placeholder="Password"
        required
        autoComplete='current-password'
      />
      <button type="submit">Login</button>
      {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
      {errorFromRedux && <p style={{ color: 'red' }}>{errorFromRedux}</p>}
    </form>
  );
};

export default LoginForm;
