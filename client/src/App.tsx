import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCredentials }  from './redux/auth/slice';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/login/Login';
import RegisterPage from './pages/register/Register';
import ResetPassword from './components/auth/SendReset';
import AppBar from './components/appBar/AppBar';
import HomePage from './pages/home/Home';
import ResetPasswordPage from './pages/reset-password/ResetPasswordPage';
import ChangePasswordPage from './pages/change-password/ChangePasswordPage';

const App: React.FC = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    const token = localStorage.getItem('token');

    if (user && token) {
      dispatch(setCredentials({ user, accessToken: token }));
    }
  }, [dispatch]);




  return (
    <Router>
      <AppBar />
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/send-reset" element={<ResetPasswordPage />} />
        <Route path="/reset-password" element={<ChangePasswordPage />} />
      </Routes>
    </Router>
  );
};

export default App;
