import axios from 'axios';
import store from '../redux/store';
import { refreshUser } from '../redux/auth/operations'; // Імпортуємо вашу операцію для рефрешу токена

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001',
});

// Інтерсептор для запитів
axiosInstance.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Інтерсептор для відповідей
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Якщо отримали 401, спробуйте оновити токен
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Спробуйте оновити токен
      const result = await store.dispatch(refreshUser());

      if (result.meta.requestStatus === 'fulfilled') {
        const newToken = result.payload.accessToken;
        localStorage.setItem('token', newToken);

        // Оновіть заголовок запиту з новим токеном
        axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;

        // Повторіть запит
        return axiosInstance(originalRequest);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
