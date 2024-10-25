import axios from 'axios';
import { store } from '../redux/store';
import { refreshUser } from '../redux/auth/operations';

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

export default axiosInstance;
