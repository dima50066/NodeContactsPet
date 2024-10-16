import axios from 'axios';

const API_URL = 'http://localhost:3001/auth'; // Заміни на свій API URL

// Реєстрація нового користувача
export const register = async (userData: { email: string; password: string }) => {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data; // Повертай дані, які отримуєш з API
};

// Увійти в систему
export const login = async (userData: { email: string; password: string }) => {
    const response = await axios.post(`${API_URL}/login`, userData);
    return response.data; // Повертаємо дані
};

// Вийти з системи
export const logout = async () => {
    const response = await axios.post(`${API_URL}/logout`);
    return response.data; // Повертаємо дані, якщо потрібно
};

// Оновлення сесії
export const refresh = async () => {
    const response = await axios.post(`${API_URL}/refresh`);
    return response.data; // Повертаємо дані
};

// Інші методи, якщо потрібно
