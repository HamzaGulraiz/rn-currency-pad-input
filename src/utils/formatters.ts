// src/utils/formatters.ts
export const formatNumberWithCommas = (value: string): string => {
  const number = value.replace(/,/g, '');
  return number.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const parseNumericValue = (value: string): number => {
  return Number(value.replace(/,/g, ''));
};

export const formatCurrencyValue = (
  value: number,
  decimalPlaces: number = 2
): string => {
  return value.toFixed(decimalPlaces);
};
