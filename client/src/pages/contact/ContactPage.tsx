import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from '../../redux/contacts/operations';
import { selectContacts } from '../../redux/contacts/selectors';
import { ContactType } from '../../types';
import ContactList from '../../components/contactList/ContactList';
import ContactForm from '../../components/contactForm/ContactForm';
import UpdateContactForm from '../../components/updateContactForm/UpdateContactForm';
import { AppDispatch } from '../../redux/store';
import { FilterParams } from '../../types';
import { toast } from 'react-toastify'; // Імпорт для повідомлень

const ContactPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const contacts = useSelector(selectContacts);
  const [selectedContact, setSelectedContact] = useState<ContactType | null>(null);

  const [filterParams, setFilterParams] = useState<FilterParams>({
    filter: '',
    sortOrder: 'asc',
    contactType: 'all',
    isFavourite: undefined,
    sortBy: 'name',
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [isFavoriteChecked, setIsFavoriteChecked] = useState(false);

  useEffect(() => {
    const params: FilterParams = {
      ...filterParams,
      isFavourite: isFavoriteChecked ? true : undefined,
    };

    dispatch(fetchContacts(params));
  }, [dispatch, filterParams, isFavoriteChecked]);

  const handleAddContact = (newContact: ContactType) => {
    // Handle adding a new contact
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSortOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterParams((prev) => ({ ...prev, sortOrder: e.target.value as 'asc' | 'desc' }));
    toast.info(`Contacts sorted in ${e.target.value === 'asc' ? 'ascending' : 'descending'} order.`); // Повідомлення про сортування
  };

  const handleSortByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterParams((prev) => ({ ...prev, sortBy: e.target.value }));
    toast.info(`Contacts sorted by ${e.target.value}.`); // Повідомлення про сортування
  };

  const handleContactTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterParams((prev) => ({ ...prev, contactType: e.target.value }));
  };

  const handleIsFavoriteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsFavoriteChecked(e.target.checked);
    toast.info(e.target.checked ? 'Showing favorite contacts only.' : 'Showing all contacts.'); // Повідомлення про показ тільки улюблених
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">Contacts</h1>

      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={handleFilterChange}
        className="p-2 border border-gray-300 rounded mb-4 w-full max-w-xs"
      />

      <div className="mb-4">
        <label className="mr-2">Sort Order:</label>
        <select
          value={filterParams.sortOrder}
          onChange={handleSortOrderChange}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="asc">Sort Ascending</option>
          <option value="desc">Sort Descending</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="mr-2">Sort By:</label>
        <select
          value={filterParams.sortBy}
          onChange={handleSortByChange}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="name">Sort by Name</option>
          <option value="phoneNumber">Sort by Phone Number</option>
          <option value="email">Sort by Email</option>
          <option value="isFavourite">Sort by Favorite</option>
          <option value="contactType">Sort by Contact Type</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="mr-2">Contact Type:</label>
        <select
          value={filterParams.contactType}
          onChange={handleContactTypeChange}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="all">All</option>
          <option value="work">Work</option>
          <option value="personal">Personal</option>
          <option value="home">Home</option>
        </select>
      </div>

      <label className="inline-flex items-center mb-4">
        <input
          type="checkbox"
          checked={isFavoriteChecked}
          onChange={handleIsFavoriteChange}
          className="mr-2"
        />
        Show Favorites Only
      </label>

      <ContactForm onAdd={handleAddContact} contacts={contacts} />
      <ContactList contacts={filteredContacts} onSelectContact={setSelectedContact} />
      {selectedContact && (
        <UpdateContactForm
          contact={selectedContact}
          onClose={() => setSelectedContact(null)}
          onUpdateSuccess={() => dispatch(fetchContacts(filterParams))}
        />
      )}
    </div>
  );
};

export default ContactPage;
