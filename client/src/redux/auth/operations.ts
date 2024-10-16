import { createAsyncThunk } from '@reduxjs/toolkit';
import { register, login, logout, refresh } from '../../api/AuthService';

interface UserData {
    email: string;
    password: string;
}

export const registerUser = createAsyncThunk('auth/register', async (userData: UserData) => {
    const response = await register(userData);
    console.log(response.data);
    return response.data;
});

export const loginUser = createAsyncThunk('auth/login', async (userData: UserData) => {
    const response = await login(userData);
    console.log(response.data);
    return response.data;
});

export const logOut = createAsyncThunk('auth/logout', async () => {
    await logout();
});

export const refreshUser = createAsyncThunk('auth/refresh', async () => {
    const response = await refresh();
    return response.data;
});
