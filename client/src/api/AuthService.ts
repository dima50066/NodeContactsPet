import axios from 'axios';

const API_URL = 'http://localhost:3001/auth';

export const register = async (userData: { email: string; password: string }) => {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
};

// Увійти в систему
export const login = async (userData: { email: string; password: string }) => {
    const response = await axios.post(`${API_URL}/login`, userData);
    return response.data;
};

// Вийти з системи
export const logout = async () => {
    const response = await axios.post(`${API_URL}/logout`);
    return response.data;
};

// Оновлення сесії
export const refresh = async () => {
    const response = await axios.post(`${API_URL}/refresh`, {}, {
        withCredentials: true,
    });
    return response.data;
};

// Інші методи, якщо потрібно
