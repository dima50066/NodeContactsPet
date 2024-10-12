import { SORT_ORDER } from '../constants/index.js';

export const parseSortBy = (sortBy) => {
  // Дозволені поля для сортування
  const allowedFields = [
    'name',
    'phoneNumber',
    'isFavourite',
    'contactType',
    'createdAt',
    'updatedAt',
  ];

  // Якщо поле не входить в дозволені, повертаємо 'name' як значення за замовчуванням
  return allowedFields.includes(sortBy) ? sortBy : 'name';
};

export const parseSortOrder = (sortOrder) => {
  // Якщо не передано або передано невірне значення, повертаємо 'asc' за замовчуванням
  return sortOrder === SORT_ORDER.DESC ? 'desc' : 'asc';
};

export const parseSortParams = (query) => {
  const { sortBy = 'name', sortOrder = 'asc' } = query;

  const parsedSortBy = parseSortBy(sortBy);
  const parsedSortOrder = parseSortOrder(sortOrder);

  return { sortBy: parsedSortBy, sortOrder: parsedSortOrder };
};
