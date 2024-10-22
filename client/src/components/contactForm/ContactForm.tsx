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

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newContact: Omit<ContactType, '_id'> = {
            name,
            email,
            phoneNumber,
            isFavourite: false,
            contactType: 'personal',
        };

        addContact(newContact);
        setName('');
        setEmail('');
        setPhoneNumber('');

        dispatch(fetchContacts({} as FilterParams));
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </label>

            <label>
                Email:
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </label>

            <label>
                Phone:
                <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                />
            </label>

            <button type="submit">Add Contact</button>
        </form>
    );
};

export default ContactForm;
