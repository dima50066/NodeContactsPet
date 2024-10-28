import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, createContact, updateContact, deleteContact } from './operations';
import { initialState } from '../../types';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.items = payload;
      })
      .addCase(fetchContacts.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message || 'Failed to fetch contacts';
      })
      .addCase(createContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createContact.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.items.push(payload);
      })
      .addCase(createContact.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message || 'Failed to create contact';
      })
      .addCase(updateContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateContact.fulfilled, (state, { payload }) => {
        state.loading = false;
        const index = state.items.findIndex(
          (contact) => contact._id === payload._id
        );
        if (index !== -1) {
          state.items[index] = payload;
        }
      })
      .addCase(updateContact.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message || 'Failed to update contact';
      })
      .addCase(deleteContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteContact.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.items = state.items.filter(
          (contact) => contact._id !== payload
        );
      })
      .addCase(deleteContact.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message || 'Failed to delete contact';
      });
  },
});

export const contactsReducer = contactsSlice.reducer;
