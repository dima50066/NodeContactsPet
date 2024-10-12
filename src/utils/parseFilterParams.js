export const parseFilterParams = (query) => {
  const { isFavourite, contactType } = query;

  const parsedIsFavourite =
    isFavourite === 'true' ? true : isFavourite === 'false' ? false : undefined;
  const parsedContactType = ['work', 'home', 'personal'].includes(contactType)
    ? contactType
    : undefined;

  const filter = {};
  if (parsedIsFavourite !== undefined) filter.isFavourite = parsedIsFavourite;
  if (parsedContactType) filter.contactType = parsedContactType;

  return filter;
};
