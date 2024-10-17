import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, createContact, updateContact, deleteContact } from './operations';
import { ContactType } from '../../types';

interface ContactsState {
  loading: boolean;
  error: string | null;
  data: { contacts: ContactType[] }; // Зміна тут
}

const initialState: ContactsState = {
  data: { contacts: [] }, // Зміна тут
  loading: false,
  error: null,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch contacts
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.data.contacts = action.payload; // Зміна тут
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch contacts';
      })
      // Create contact
      .addCase(createContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createContact.fulfilled, (state, action) => {
        state.loading = false;
        state.data.contacts.push(action.payload); // Зміна тут
      })
      .addCase(createContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create contact';
      })
      // Update contact
      .addCase(updateContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.data.contacts.findIndex( // Зміна тут
          (contact) => contact._id === action.payload._id
        );
        if (index !== -1) {
          state.data.contacts[index] = action.payload; // Зміна тут
        }
      })
      .addCase(updateContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update contact';
      })
      // Delete contact
      .addCase(deleteContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.loading = false;
        state.data.contacts = state.data.contacts.filter( // Зміна тут
          (contact) => contact._id !== action.payload
        );
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete contact';
      });
  },
});

export const contactsReducer = contactsSlice.reducer;
