import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { createContact, deleteContact, updateContact } from '../redux/contacts/operations';
import { ContactType } from '../types';

export const useContacts = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector((state: RootState) => state.contacts);

  const addContact = (contact: Omit<ContactType, '_id'>) =>
    dispatch(createContact(contact));

  const removeContact = (id: string) => dispatch(deleteContact(id));

  const modifyContact = (id: string, updates: Partial<ContactType>) => {
    const formData = new FormData();
    Object.entries(updates).forEach(([key, value]) => {
  if (typeof value === 'object' && (value as any) instanceof Blob) {
    formData.append(key, value);
  } else {
    formData.append(key, String(value));
  }
    });
    dispatch(updateContact({ id, updates: formData }));
  };

  return { items, loading, error, addContact, removeContact, modifyContact };
};
