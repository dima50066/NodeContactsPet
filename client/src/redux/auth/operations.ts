import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store'; // Імпортуйте тип RootState для типізації стану
import { store } from '../store';

const API_URL = 'http://localhost:3001/auth';

// Створюємо екземпляр axios
const axiosInstance = axios.create({
    baseURL: 'http://localhost:3001',
});

// Функція для встановлення заголовка авторизації
const setAuthHeader = (token: string) => {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

// Функція для очищення заголовка авторизації
const clearAuthHeader = () => {
    delete axiosInstance.defaults.headers.common['Authorization'];
};

// Інтерсептор для запитів
axiosInstance.interceptors.request.use(
    (config) => {
        const state = store.getState();
        const token = state.auth.token;


        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Встановлюємо заголовок авторизації
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

// Реєстрація користувача
export const registerUser = createAsyncThunk('auth/register', async (userData: { email: string; password: string; }) => {
    const response = await axiosInstance.post(`${API_URL}/register`, userData);
    const { token } = response.data.data;
    setAuthHeader(token); // Встановлюємо токен у заголовок після реєстрації
    return response.data.data;
});

// Логін користувача
export const loginUser = createAsyncThunk('auth/login', async (userData: { email: string; password: string; }) => {
    const response = await axiosInstance.post(`${API_URL}/login`, userData);
    const { token } = response.data.data;
    setAuthHeader(token); // Встановлюємо токен у заголовок після логіну
    return response.data.data;
});

// Логаут користувача
export const logOut = createAsyncThunk('auth/logout', async () => {
    await axiosInstance.post(`${API_URL}/logout`);
    clearAuthHeader(); // Очищуємо заголовок після виходу
});

// Рефреш користувача
export const refreshUser = createAsyncThunk(
    'auth/refresh',
    async (_, thunkAPI) => {
        const state = thunkAPI.getState() as RootState;
        const persistedToken = state.auth.token;

        // Перевірка наявності токена перед запитом
        if (!persistedToken) {
            return thunkAPI.rejectWithValue('Unable to fetch user');
        }

        try {
            setAuthHeader(persistedToken); // Встановлюємо токен у заголовок
            const response = await axiosInstance.post(
                `${API_URL}/refresh`,
                {},
                { withCredentials: true }
            );
            return response.data.data;
        } catch (error: any) {
            clearAuthHeader(); // Очищаємо заголовок при помилці
            return thunkAPI.rejectWithValue(
                error.response?.data.message || error.message
            );
        }
    }
);
