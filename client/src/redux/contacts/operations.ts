import { createAsyncThunk } from '@reduxjs/toolkit';
import { ContactType } from '../../types';
import axiosInstance from '../../api/axiosconfig';
import {FilterParams} from '../../types';


// Функції для роботи з контактами
export const fetchContacts = createAsyncThunk<ContactType[], FilterParams>(
  'contacts/fetchContacts',
  async ({ filter, sortOrder, contactType, isFavourite, sortBy }) => {
    const response = await axiosInstance.get('/contacts', {
      params: {
        filter,
        sortOrder,
        contactType,
        isFavourite,
        sortBy,
      },
    });
    return response.data.data.data;
  }
);

export const fetchContactById = createAsyncThunk<ContactType, string>(
  'contacts/fetchContactById',
  async (id) => {
    const response = await axiosInstance.get(`/contacts/${id}`);
    return response.data; // Повертаємо дані
  }
);

export const createContact = createAsyncThunk<ContactType, Omit<ContactType, '_id'>>(
  'contacts/createContact',
  async (contact) => {
    const response = await axiosInstance.post('/contacts', contact);
    return response.data; // Повертаємо створений контакт
  }
);

export const updateContact = createAsyncThunk<ContactType, { id: string; updates: FormData }>(
  'contacts/updateContact',
  async ({ id, updates }) => {
    const response = await axiosInstance.put(`/contacts/${id}`, updates, {
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
    await axiosInstance.delete(`/contacts/${id}`);
    return id; // Повертаємо id для видалення контакту
  }
);
