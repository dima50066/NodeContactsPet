import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../hooks/axiosConfig';
import { ContactType, FilterParams } from '../../types';

export const fetchContacts = createAsyncThunk<ContactType[], FilterParams>(
  'contacts/fetchContacts',
  async (params, { getState }) => {
      const response = await axiosInstance.get('/contacts', { params });
      return response.data.data.data;
  }
);

export const fetchContactById = createAsyncThunk<ContactType, string>(
  'contacts/fetchContactById',
  async (id) => {
      const response = await axiosInstance.get(`/contacts/${id}`);
      return response.data;
  }
);

export const createContact = createAsyncThunk<ContactType, Omit<ContactType, '_id'>>(
  'contacts/createContact',
  async (contact) => {
      const response = await axiosInstance.post('/contacts', contact);
      return response.data;
  }
);

export const updateContact = createAsyncThunk<ContactType, { id: string; updates: FormData }>(
  'contacts/updateContact',
  async ({ id, updates }) => {
      const response = await axiosInstance.patch(`/contacts/${id}`, updates, {
          headers: {
              'Content-Type': 'multipart/form-data',
          },
      });
      return response.data;
  }
);

export const deleteContact = createAsyncThunk<string, string>(
  'contacts/deleteContact',
  async (id) => {
      await axiosInstance.delete(`/contacts/${id}`);
      return id;
  }
);
