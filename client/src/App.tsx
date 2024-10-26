import React, { useEffect, useState } from 'react'; // Додайте useState
import { useDispatch, useSelector } from 'react-redux';
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
import { refreshUser } from './redux/auth/operations'; // Імпортуємо refreshUser
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isRefreshing, setIsRefreshing] = useState(true); // Додано стан для відстеження рефрешу

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
    const storedToken = localStorage.getItem('token');

    if (storedUser && storedToken) {
      dispatch(setCredentials({ user: storedUser, accessToken: storedToken }));

      // Спробуйте оновити токен
      const refreshToken = async () => {
        const result = await dispatch(refreshUser());

        if (result.meta.requestStatus === 'fulfilled') {
          // Токен успішно оновлено, оновлюємо локальне сховище
          const { accessToken } = result.payload; // Звертаємось до правильного значення
          localStorage.setItem('token', accessToken); // Зберігаємо новий токен
        } else {
          // Якщо не вдалося оновити токен, видаляємо дані
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          // Додайте редирект на сторінку логіну, якщо потрібно
        }
        setIsRefreshing(false); // Завершуємо процес рефрешу
      };

      refreshToken();
    } else {
      setIsRefreshing(false); // Якщо токена немає, завершуємо рефреш
    }
  }, [dispatch]);

  if (isRefreshing) {
    return <b>Refreshing user...</b>; // Показуємо індикатор завантаження
  }

  return (
    <Router>
      <AppBar />
      <ToastContainer />
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
