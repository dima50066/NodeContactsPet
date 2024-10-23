import Joi from 'joi';

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    'string.base': 'Name must be a string',
    'string.min': 'Name must be at least 3 characters long',
    'string.max': 'Name must be at most 50 characters long',
    'string.empty': 'Name cannot be an empty field',
    'any.required': 'Name is a required field',
  }),
  phoneNumber: Joi.string().min(3).max(50).required().messages({
    'string.base': 'Phone number must be a string',
    'string.empty': 'Phone number cannot be an empty field',
    'string.min': 'Phone number must be at least 3 characters long',
    'string.max': 'Phone number must be at most 50 characters long',
  }),
  email: Joi.string().min(3).max(50).email().messages({
    'string.base': 'Email must be a string',
    'string.empty': 'Email cannot be an empty field',
    'string.email': 'Email must be a valid email address',
    'string.min': 'Email must be at least 3 characters long',
    'string.max': 'Email must be at most 50 characters long',
  }),
  contactType: Joi.string().valid('work', 'home', 'personal').messages({
    'string.base': 'Contact type must be a string',
    'any.only':
      'Contact type must be one of the following: work, home, personal',
  }),
  isFavourite: Joi.boolean().default(false),
  photo: Joi.string().messages({
    'string.base': 'Photo must be a string',
  }),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(50),
  phoneNumber: Joi.string().min(3).max(50),
  email: Joi.string().email().min(3).max(50),
  contactType: Joi.string().valid('work', 'home', 'personal'),
  isFavourite: Joi.boolean(),
  photo: Joi.string(),
});
