import { RootState } from '../store';
import { ContactType } from '../../types';

export const selectContacts = (state: RootState): ContactType[] => state.contacts.data.contacts;
export const selectContactsLoading = (state: RootState): boolean => state.contacts.loading;
export const selectContactsError = (state: RootState): string | null => state.contacts.error;
