import { useEffect, useState } from 'react';
import axios from 'axios';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // Перевірте, чи дійсний токен
          await axios.get('/auth/refresh', { headers: { Authorization: `Bearer ${token}` } });
          setIsAuthenticated(true);
        } catch (error) {
          localStorage.removeItem('token'); // Очищення токена при помилці
          setIsAuthenticated(false);
        }
      }
    };
    checkAuth();
  }, []);

  return { isAuthenticated };
};

export default useAuth;
