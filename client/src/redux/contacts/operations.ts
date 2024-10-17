import { createAsyncThunk } from '@reduxjs/toolkit';
import { ContactType } from '../../types';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

// Додаємо обробник запитів для включення токена в заголовки
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Отримуємо токен з localStorage або Redux
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Запит для отримання контактів
export const fetchContacts = createAsyncThunk<ContactType[]>('contacts/fetchContacts', async () => {
  const response = await api.get('/contacts');
  return response.data;
});

// Запит для створення нового контакту
export const createContact = createAsyncThunk<ContactType, Omit<ContactType, '_id'>>(
  'contacts/createContact',
  async (contact) => {
    const response = await api.post('/contacts', contact);
    return response.data;
  }
);

// Запит для видалення контакту
export const deleteContact = createAsyncThunk<string, string>(
  'contacts/deleteContact',
  async (id) => {
    await api.delete(`/contacts/${id}`);
    return id;
  }
);

// Запит для оновлення контакту
export const updateContact = createAsyncThunk<ContactType, { id: string; updates: Partial<ContactType> }>(
  'contacts/updateContact',
  async ({ id, updates }) => {
    const response = await api.patch(`/contacts/${id}`, updates);
    return response.data;
  }
);
