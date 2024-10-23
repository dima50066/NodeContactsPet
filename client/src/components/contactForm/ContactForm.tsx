import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchContacts } from '../../redux/contacts/operations';
import { useContacts } from '../../hooks/useContacts';
import { ContactType } from '../../types';
import { AppDispatch } from '../../redux/store';
import { FilterParams } from '../../types';
import { toast } from 'react-toastify'; // Імпорт Toastify

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

        try {
            await addContact(newContact); // Переконайтеся, що addContact повертає promise
            toast.success('Contact added successfully!'); // Успішне повідомлення
        } catch (error) {
            toast.error('Failed to add contact. Please try again.'); // Повідомлення про помилку
        }

        setName('');
        setEmail('');
        setPhoneNumber('');

        dispatch(fetchContacts({} as FilterParams));
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-white shadow-lg rounded-lg max-w-xs mx-auto">
            <h2 className="text-lg font-semibold mb-3 text-center">Add Contact</h2>
            <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:ring-blue-300"
                    />
                </label>
            </div>

            <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:ring-blue-300"
                    />
                </label>
            </div>

            <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone:
                    <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:ring-blue-300"
                    />
                </label>
            </div>

            <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition"
            >
                Add Contact
            </button>
        </form>
    );
};

export default ContactForm;
