import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from '../../redux/contacts/operations';
import { selectContacts } from '../../redux/contacts/selectors';
import { ContactType } from '../../types';
import ContactList from '../../components/contactList/ContactList';
import UpdateContactForm from '../../components/updateContactForm/UpdateContactForm';
import { AppDispatch } from '../../redux/store';
import { FilterParams } from '../../types';
import FilterAndSort from '../../components/filterAndSort/FilterAndSort';
import { Button, Modal, Box } from '@mui/material';
import ContactForm from '../../components/contactForm/ContactForm';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #fff',
  boxShadow: 24,
  p: 4,
};

const buttonStyle = "mb-4 mx-2 p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200";

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
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [isAddingNewContact, setIsAddingNewContact] = useState(false);
  const [isUpdatingContact, setIsUpdatingContact] = useState(false);

  useEffect(() => {
    const params: FilterParams = {
      ...filterParams,
      isFavourite: isFavoriteChecked ? true : undefined,
    };

    dispatch(fetchContacts(params));
  }, [dispatch, filterParams, isFavoriteChecked]);

  const handleAddContact = (newContact: ContactType) => {
    setIsAddingNewContact(false);
  };

  const handleSelectContact = (contact: ContactType) => {
    setSelectedContact(contact);
    setIsUpdatingContact(true);
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">Contacts</h1>
      <div className="flex">
        <button
          onClick={() => setIsFilterVisible(prev => !prev)}
          className="mb-4 mx-2 p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
        >
          {isFilterVisible ? 'Hide Filters' : 'Show Filters'}
        </button>

        <button
          onClick={() => setIsAddingNewContact(true)}
          className="mb-4 mx-2 p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
        >
          Add New Contact
        </button>
      </div>

      {isFilterVisible && (
        <FilterAndSort
          filterParams={filterParams}
          setFilterParams={setFilterParams}
          isFavoriteChecked={isFavoriteChecked}
          setIsFavoriteChecked={setIsFavoriteChecked}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      )}

      <Modal
        open={isAddingNewContact}
        onClose={() => setIsAddingNewContact(false)}
      >
        <Box sx={style}>
          <ContactForm onAdd={handleAddContact} contacts={contacts} />
        </Box>
      </Modal>

      <Modal
        open={isUpdatingContact}
        onClose={() => setIsUpdatingContact(false)}
      >
        <Box sx={style}>
          <h2 className="text-center mb-3">Update Contact</h2>
          {selectedContact && (
            <UpdateContactForm
              contact={selectedContact}
              onClose={() => setIsUpdatingContact(false)}
              onUpdateSuccess={() => {
                dispatch(fetchContacts(filterParams));
                setIsUpdatingContact(false);
              }}
            />
          )}
        </Box>
      </Modal>

      <ContactList contacts={filteredContacts} onSelectContact={handleSelectContact} />
    </div>
  );
};

export default ContactPage;
