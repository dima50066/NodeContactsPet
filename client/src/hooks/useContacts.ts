import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { createContact, deleteContact, updateContact } from '../redux/contacts/operations';
import { ContactType } from '../types';

export const useContacts = () => {
  const dispatch = useDispatch<AppDispatch>();
  const contacts = useSelector((state: RootState) => state.contacts.items);
  const loading = useSelector((state: RootState) => state.contacts.loading);
  const error = useSelector((state: RootState) => state.contacts.error);

  const addContact = (contact: Omit<ContactType, '_id'>) => {
    dispatch(createContact(contact));
  };

  const removeContact = (id: string) => {
    dispatch(deleteContact(id));
  };
const modifyContact = (id: string, updates: Partial<ContactType>) => {
  const formData = new FormData();
  Object.keys(updates).forEach((key) => {
  const value = updates[key as keyof ContactType];
  if (value && typeof value === 'object' && 'size' in value && 'type' in value) {
    formData.append(key, value as Blob);
  } else {
    formData.append(key, value as string);
  }
});
  dispatch(updateContact({ id, updates: formData }));
};
  return {
    contacts,
    loading,
    error,
    addContact,
    removeContact,
    modifyContact,
  };
};
