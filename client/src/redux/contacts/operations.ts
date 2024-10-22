import { createAsyncThunk } from '@reduxjs/toolkit';
import { ContactType } from '../../types';
import axios from 'axios';

const API_URL = 'http://localhost:3001/contacts';

// Налаштування axios
const api = axios.create({
  baseURL: API_URL,
});

// Додаємо обробник запитів для включення токена в заголовки
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Функції для роботи з контактами
export const fetchContacts = createAsyncThunk<ContactType[]>('contacts/fetchContacts', async () => {
  const response = await api.get('/');
  return response.data.data.data; // Повертаємо дані
});

export const fetchContactById = createAsyncThunk<ContactType, string>(
  'contacts/fetchContactById',
  async (id) => {
    const response = await api.get(`/${id}`);
    return response.data; // Повертаємо дані
  }
);

export const createContact = createAsyncThunk<ContactType, Omit<ContactType, '_id'>>(
  'contacts/createContact',
  async (contact) => {
    const response = await api.post('/', contact);
    return response.data; // Повертаємо створений контакт
  }
);

export const updateContact = createAsyncThunk<ContactType, { id: string; updates: FormData }>(
  'contacts/updateContact',
  async ({ id, updates }) => {
    const response = await api.put(`/${id}`, updates, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data; // Повертаємо оновлений контакт
  }
);

export const deleteContact = createAsyncThunk<string, string>(
  'contacts/deleteContact',
  async (id) => {
    await api.delete(`/${id}`);
    return id; // Повертаємо id для видалення контакту
  }
);
