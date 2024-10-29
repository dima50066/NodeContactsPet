import {
  getContacts,
  getContactsById,
  createContact,
  deleteContact,
  updateContact,
} from '../services/contacts.js';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { createContactSchema } from '../validation/contacts.js';

import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { env } from '../utils/env.js';

export const getContactsController = async (req, res, next) => {
  try {
    const { page, perPage } = parsePaginationParams(req.query);
    const { sortBy, sortOrder } = parseSortParams(req.query);
    const filter = parseFilterParams(req.query);

    const contactsData = await getContacts({
      page,
      perPage,
      sortBy,
      sortOrder,
      filter,
      userId: req.user._id,
    });

    res.json({
      status: 200,
      message: 'Contacts fetched successfully',
      data: contactsData,
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    next(error);
  }
};

export const getContactByIdController = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const contact = await getContactsById(contactId, req.user._id);

    if (!contact) {
      throw createHttpError(404, 'Contact not found');
    }

    res.json({
      status: 200,
      message: 'Contact fetched successfully',
      data: contact,
    });
  } catch (error) {
    console.error('Error fetching contact by ID:', error);
    next(error);
  }
};

export const createContactController = async (req, res, next) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(400).json({ message: 'User ID is missing' });
    }

    const userId = req.user._id.toString();

    // Валідація контактних даних
    const { error } = createContactSchema.validate(req.body);
    if (error) {
      console.log('Validation error:', error.details);
      return res.status(400).json({ message: error.details[0].message });
    }

    const contact = await createContact(req.body, userId); // Передаємо userId окремо
    res.status(201).json({
      status: 201,
      message: 'Contact created successfully',
      data: contact,
    });
  } catch (error) {
    console.error('Error creating contact:', error);
    next(error);
  }
};

export const deleteContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const contact = await getContactsById(contactId, req.user._id); // Перевірка контакту

    if (!contact) {
      return next(createHttpError(404, 'Contact not found'));
    }

    await deleteContact(contactId, req.user._id); // Видалення контакту
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting contact:', error);
    next(error);
  }
};

export const upsertContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const contact = await getContactsById(contactId, req.user._id); // Перевірка контакту

    if (!contact) {
      return next(createHttpError(404, 'Contact not found'));
    }

    const result = await updateContact(
      contactId,
      { ...req.body, userId: req.user._id },
      { upsert: true },
    );

    const status = result.isNew ? 201 : 200;
    res.status(status).json({
      status,
      message: 'Contact upserted successfully',
      data: result.contact,
    });
  } catch (error) {
    console.error('Error upserting contact:', error);
    next(error);
  }
};

export const patchContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const photo = req.file;

    let photoUrl;
    if (photo) {
      console.log('Uploading new photo:', photo.originalname); // Логування для підтвердження отримання файлу

      if (env('ENABLE_CLOUDINARY') === 'true') {
        photoUrl = await saveFileToCloudinary(photo);
      } else {
        photoUrl = await saveFileToUploadDir(photo);
      }

      console.log('Photo URL after upload:', photoUrl); // Логування URL після завантаження
    }

    const contact = await getContactsById(contactId, req.user._id);

    if (!contact) {
      return next(createHttpError(404, 'Contact not found'));
    }

    const updates = {
      ...req.body,
      userId: req.user._id,
      photo: photoUrl || contact.photo, // Використовуємо новий URL, якщо він доступний
    };

    const updatedContact = await updateContact(contactId, updates);

    res.json({
      status: 200,
      message: 'Contact patched successfully',
      data: updatedContact.contact,
    });
  } catch (error) {
    console.error('Error patching contact:', error);
    next(error);
  }
};
