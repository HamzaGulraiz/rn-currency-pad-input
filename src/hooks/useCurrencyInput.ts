// src/hooks/useCurrencyInput.ts
import { useState, useEffect, useCallback } from 'react';
import { formatNumberWithCommas, parseNumericValue } from '../utils/formatters';

interface UseCurrencyInputProps {
  initialValue?: string;
  maxAmount?: number;
  minAmount?: number;
  maxWholeDigits?: number;
  onValueChange: (value: string, numericValue: number) => void;
  onError?: (error: string) => void;
  customValidator?: (value: number) => string | null;
  errorMessages?: {
    maxAmount?: string;
    minAmount?: string;
  };
}

export const useCurrencyInput = ({
  initialValue = '0.00',
  maxAmount,
  minAmount,
  maxWholeDigits = 6,
  onValueChange,
  onError,
  customValidator,
  errorMessages,
}: UseCurrencyInputProps) => {
  const [value, setValue] = useState<string>(initialValue);
  const [afterDecimal, setAfterDecimal] = useState<boolean>(false);
  const [decimalCount, setDecimalCount] = useState<number>(0);
  const [inputIndex, setInputIndex] = useState<number>(1);
  const [error, setError] = useState<string>('');

  // Validation effect
  useEffect(() => {
    const numericValue = parseNumericValue(value);
    let errorMessage = '';

    if (maxAmount && numericValue > maxAmount) {
      errorMessage =
        errorMessages?.maxAmount || `Maximum amount is ${maxAmount}`;
    } else if (minAmount && numericValue < minAmount && numericValue > 0) {
      errorMessage =
        errorMessages?.minAmount || `Minimum amount is ${minAmount}`;
    } else if (customValidator) {
      const customError = customValidator(numericValue);
      if (customError) errorMessage = customError;
    }

    setError(errorMessage);
    onError?.(errorMessage);
    onValueChange(value, numericValue);
  }, [
    value,
    maxAmount,
    minAmount,
    customValidator,
    onValueChange,
    onError,
    errorMessages,
  ]);

  const handleNumberInput = useCallback(
    (inputValue: string) => {
      const [wholeCheck = ''] = (typeof value === 'string' ? value : '').split(
        '.'
      );
      const unformattedWhole = wholeCheck.replace(/,/g, '');

      if (unformattedWhole.length >= maxWholeDigits && !afterDecimal) {
        return;
      }

      if (afterDecimal) {
        if (decimalCount === 0) {
          const [whole] = value.split('.');
          setValue(`${whole}.${inputValue}0`);
          setDecimalCount(decimalCount + 1);
          setInputIndex((prev) => prev + 1);
        } else if (decimalCount === 1) {
          if (inputValue === '0') return;
          const [whole, fraction = ''] = (
            typeof value === 'string' ? value : ''
          ).split('.');
          const newFraction = fraction[0] + inputValue;
          setValue(`${whole}.${newFraction}`);
          setDecimalCount(decimalCount + 1);
          setInputIndex((prev) => prev + 1);
        }
      } else {
        if (value === '0.00') {
          setValue(`${inputValue}.00`);
        } else {
          const [whole, fraction] = value.split('.');
          let newWhole;

          if (unformattedWhole.length >= 3) {
            newWhole = unformattedWhole + inputValue;
            newWhole = formatNumberWithCommas(newWhole);
            setInputIndex(newWhole.length); // ".00"
          } else {
            newWhole = whole + inputValue;
            setInputIndex((prev) => prev + 1);
          }
          setValue(`${newWhole}.${fraction}`);
        }
      }
    },
    [value, afterDecimal, decimalCount, maxWholeDigits]
  );

  const handleBackspace = useCallback(() => {
    if (afterDecimal) {
      const [whole = '', fraction] = value.split('.');
      if (decimalCount === 2) {
        const newFraction = fraction && fraction.slice(0, -1) + '0';
        setValue(`${whole}.${newFraction}`);
        setDecimalCount(decimalCount - 1);
        setInputIndex((prev) => prev - 1);
      } else if (decimalCount === 1) {
        setValue(`${whole}.00`);
        setDecimalCount(decimalCount - 1);
        setInputIndex((prev) => prev - 1);
      } else {
        setAfterDecimal(false);
        setInputIndex(whole.length);
      }
    } else {
      const [whole = ''] = value.split('.');
      if (whole.length > 1) {
        let unformattedWhole = whole.replace(/,/g, '');
        unformattedWhole = unformattedWhole.slice(0, -1);
        const formattedWhole = formatNumberWithCommas(unformattedWhole);
        setValue(`${formattedWhole}.00`);
        setInputIndex(formattedWhole.length);
      } else {
        setValue('0.00');
        setDecimalCount(0);
        setInputIndex(1);
      }
    }
  }, [value, afterDecimal, decimalCount]);

  const handleDecimal = useCallback(() => {
    if (!afterDecimal) {
      setAfterDecimal(true);
      setInputIndex((prev) => prev + 1);
    }
  }, [afterDecimal]);

  const updateValue = useCallback(
    (inputValue: string) => {
      if (inputValue === 'X') {
        handleBackspace();
      } else if (inputValue === '.') {
        handleDecimal();
      } else if (Number(inputValue) >= 0 && Number(inputValue) <= 9) {
        handleNumberInput(inputValue);
      }
    },
    [handleBackspace, handleDecimal, handleNumberInput]
  );

  const resetValue = useCallback(() => {
    setValue(initialValue);
    setAfterDecimal(false);
    setDecimalCount(0);
    setInputIndex(1);
    setError('');
  }, [initialValue]);

  return {
    value,
    inputIndex,
    error,
    hasError: !!error,
    updateValue,
    resetValue,
    numericValue: parseNumericValue(value),
  };
};
