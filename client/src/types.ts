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
  contacts: ContactType[];
  loading: boolean;
  error: string | null;
}
