export interface ContactType {
  _id: string;
  name: string;
  phoneNumber: string;
  email?: string;
  isFavourite: boolean;
  contactType: 'work' | 'home' | 'personal';
  photo?: string;
}
export interface ContactsState {
  items: ContactType[];
  loading: boolean;
  error: string | null;
}

export const initialState: ContactsState = {
  items: [],
  loading: false,
  error: null,
};

export interface User {
    id: string;
    name: string;
    email: string;
    subscription: string;
}
