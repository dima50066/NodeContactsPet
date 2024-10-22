import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:3001/auth';

interface UserData {
    email: string;
    password: string;
}

export const registerUser = createAsyncThunk('auth/register', async (userData: UserData) => {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data.data;
});

export const loginUser = createAsyncThunk('auth/login', async (userData: UserData) => {
    const response = await axios.post(`${API_URL}/login`, userData);
    console.log('Login response:', response.data);
    return response.data.data;
});

export const logOut = createAsyncThunk('auth/logout', async () => {
    await axios.post(`${API_URL}/logout`);
});

export const refreshUser = createAsyncThunk('auth/refresh', async () => {
    const response = await axios.post(`${API_URL}/refresh`, {}, {
        withCredentials: true,
    });
    return response.data;
});
