import axios from 'axios';
import { store } from '../redux/store';

const API_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://nodecontactspet.onrender.com/'
    : 'http://localhost:3001';

const axiosInstance = axios.create({
  baseURL: API_URL,
});

export const setAuthHeader = (token: string) => {
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
  delete axiosInstance.defaults.headers.common['Authorization'];
};

axiosInstance.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default axiosInstance;
