import { createAsyncThunk } from '@reduxjs/toolkit';
import { ContactType } from '../../types';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

// Додаємо обробник запитів для включення токена в заголовки
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetchContacts = createAsyncThunk<ContactType[]>('contacts/fetchContacts', async () => {
  const response = await api.get('/contacts');
  return response.data.data.data;
});

export const createContact = createAsyncThunk<ContactType, Omit<ContactType, '_id'>>(
  'contacts/createContact',
  async (contact) => {
    const response = await api.post('/contacts', contact);
    return response.data;
  }
);

export const deleteContact = createAsyncThunk<string, string>(
  'contacts/deleteContact',
  async (id) => {
    await api.delete(`/contacts/${id}`);
    return id;
  }
);

export const updateContact = createAsyncThunk<ContactType, { id: string; updates: FormData }>(
  'contacts/updateContact',
  async ({ id, updates }) => {
    const response = await api.patch(`/contacts/${id}`, updates, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.data;
  }
);
