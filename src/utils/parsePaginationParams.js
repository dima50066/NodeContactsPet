const parseNumber = (number, defaultValue) => {
  const parsedNumber = parseInt(number, 10); // 10 — це десяткова система
  return isNaN(parsedNumber) ? defaultValue : parsedNumber;
};

export const parsePaginationParams = (query) => {
  const { page, perPage } = query;

  const parsedPage = parseNumber(page, 1); // Якщо page некоректне, повертається 1
  const parsedPerPage = parseNumber(perPage, 10); // Якщо perPage некоректне, повертається 10

  return {
    page: parsedPage,
    perPage: parsedPerPage,
  };
};
