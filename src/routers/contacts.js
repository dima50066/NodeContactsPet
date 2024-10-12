import { Router } from 'express';
import {
  getContactByIdController,
  getContactsController,
  createContactController,
  deleteContactController,
  upsertContactController,
  patchContactController,
} from '../controllers/contacts.js';
import { validateBody } from '../middlewares/validateBody.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';

import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contacts.js';

import { isValidId } from '../middlewares/isValidId.js';

import { authenticate } from '../middlewares/authenticate.js';

import { upload } from '../middlewares/multer.js';

const router = new Router();

router.use(authenticate);

router.get('/', ctrlWrapper(getContactsController));

router.get('/:contactId', isValidId, ctrlWrapper(getContactByIdController));

router.post(
  '/',
  upload.single('photo'),
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

router.put(
  '/:contactId',
  isValidId,
  upload.single('photo'),
  validateBody(createContactSchema),
  ctrlWrapper(upsertContactController),
);

router.patch(
  '/:contactId',
  isValidId,
  upload.single('photo'),
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController),
);

router.delete('/:contactId', isValidId, ctrlWrapper(deleteContactController));

export default router;
