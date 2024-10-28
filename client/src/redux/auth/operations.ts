import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';
import { store } from '../store';

const API_URL = 'http://localhost:3001/auth';


const axiosInstance = axios.create({
    baseURL: API_URL,
});

const setAuthHeader = (token: string) => {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};


const clearAuthHeader = () => {
    delete axiosInstance.defaults.headers.common['Authorization'];
};

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

export const registerUser = createAsyncThunk('auth/register', async (userData: { email: string; password: string; }) => {
    const response = await axiosInstance.post(`${API_URL}/register`, userData);
    const { token } = response.data.data;
    setAuthHeader(token);
    return response.data.data;
});


export const loginUser = createAsyncThunk('auth/login', async (userData: { email: string; password: string; }) => {
    const response = await axiosInstance.post(`${API_URL}/login`, userData);
    const { token } = response.data.data;
    setAuthHeader(token);
    return response.data.data;
});


export const logOut = createAsyncThunk('auth/logout', async () => {
    await axiosInstance.post(`${API_URL}/logout`);
    clearAuthHeader();
});

export const refreshUser = createAsyncThunk(
    'auth/refresh',
    async (_, thunkAPI) => {
        const state = thunkAPI.getState() as RootState;
        const persistedToken = state.auth.token;

        if (!persistedToken) {
            return thunkAPI.rejectWithValue('Unable to fetch user');
        }

        try {
            setAuthHeader(persistedToken);
            const response = await axiosInstance.post(
                `${API_URL}/refresh`,
                {},
                { withCredentials: true }
            );
            return response.data.data;
        } catch (error: any) {
            clearAuthHeader();
            return thunkAPI.rejectWithValue(
                error.response?.data.message || error.message
            );
        }
    }
);
