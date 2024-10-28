import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ContactType } from '../../types';
import { FilterParams } from '../../types';
import { RootState } from '../store';


export const fetchContacts = createAsyncThunk<ContactType[], FilterParams>(
  'contacts/fetchContacts',
  async ({ filter, sortOrder, contactType, isFavourite, sortBy }, { getState }) => {
    const state = getState() as RootState;
    const token = state.auth.token;

    const response = await axios.get('/contacts', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
  async (id, { getState }) => {
    const state = getState() as RootState;
    const token = state.auth.token;

    console.log('Fetching contact by ID with token:', token);

    const response = await axios.get(`/contacts/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  }
);

export const createContact = createAsyncThunk<ContactType, Omit<ContactType, '_id'>>(
  'contacts/createContact',
  async (contact, { getState }) => {
    const state = getState() as RootState;
    const token = state.auth.token;


    console.log('Creating contact with token:', token);

    const response = await axios.post('/contacts', contact, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  }
);

export const updateContact = createAsyncThunk<ContactType, { id: string; updates: FormData }>(
  'contacts/updateContact',
  async ({ id, updates }, { getState }) => {
    const state = getState() as RootState;
    const token = state.auth.token;

    console.log('Updating contact with token:', token);

    const response = await axios.put(`/contacts/${id}`, updates, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  }
);

export const deleteContact = createAsyncThunk<string, string>(
  'contacts/deleteContact',
  async (id, { getState }) => {
    const state = getState() as RootState;
    const token = state.auth.token;


    console.log('Deleting contact with token:', token);

    await axios.delete(`/contacts/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return id;
  }
);
