import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCredentials } from './redux/auth/slice';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/login/Login';
import RegisterPage from './pages/register/Register';
import ResetPassword from './components/auth/SendReset';
import AppBar from './components/appBar/AppBar';
import HomePage from './pages/home/Home';
import ChangePasswordPage from './pages/change-password/ChangePasswordPage';
import ContactPage from './pages/contact/ContactPage';
import { AppDispatch } from './redux/store';
import PrivateRoute from './components/routes/PrivateRoute';
import RestrictedRoute from './components/routes/RestrictedRoute';

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
    const storedToken = localStorage.getItem('token');

    if (storedUser && storedToken) {
      dispatch(setCredentials({ user: storedUser, accessToken: storedToken }));
    }
  }, [dispatch]);

  return (
    <Router>
      <AppBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={
            <RestrictedRoute component={<LoginPage />} redirectTo="/contacts" />
          }
        />
        <Route
          path="/register"
          element={
            <RestrictedRoute component={<RegisterPage />} redirectTo="/contacts" />
          }
        />
        <Route path="/send-reset" element={<ResetPassword />} />
        <Route path="/reset-password" element={<ChangePasswordPage />} />
        <Route
          path="/contacts"
          element={
            <PrivateRoute component={<ContactPage />} redirectTo="/login" />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
