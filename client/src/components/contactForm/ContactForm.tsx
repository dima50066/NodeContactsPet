import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchContacts } from '../../redux/contacts/operations';
import { useContacts } from '../../hooks/useContacts';
import { ContactType } from '../../types';
import { AppDispatch } from '../../redux/store';
import { FilterParams } from '../../types';

interface ContactFormProps {
    contacts: ContactType[];
    onAdd: (newContact: ContactType) => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ contacts, onAdd }) => {
    const { addContact } = useContacts();
    const dispatch = useDispatch<AppDispatch>();

    const [contactName, setContactName] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [contactPhoneNumber, setContactPhoneNumber] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newContact: Omit<ContactType, '_id'> = {
            name: contactName,
            email: contactEmail,
            phoneNumber: contactPhoneNumber,
            isFavourite: false,
            contactType: 'personal',
        };

        addContact(newContact);
        setContactName('');
        setContactEmail('');
        setContactPhoneNumber('');

        dispatch(fetchContacts({} as FilterParams));
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input
                    type="text"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    required
                />
            </label>

            <label>
                Email:
                <input
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    required
                />
            </label>

            <label>
                Phone:
                <input
                    type="tel"
                    value={contactPhoneNumber}
                    onChange={(e) => setContactPhoneNumber(e.target.value)}
                    required
                />
            </label>

            <button type="submit">Add Contact</button>
        </form>
    );
};

export default ContactForm;
