// src/types/index.ts
import type { ViewStyle, TextStyle } from 'react-native';

export interface CurrencyNumberPadProps {
  /** Initial value for the currency input */
  initialValue?: string;
  /** Currency symbol to display */
  currency?: string;
  /** Maximum amount allowed */
  maxAmount?: number;
  /** Minimum amount allowed */
  minAmount?: number;
  /** Callback when value changes */
  onValueChange: (value: string, numericValue: number) => void;
  /** Callback when an error occurs */
  onError?: (error: string) => void;
  /** Custom validation function */
  customValidator?: (value: number) => string | null;
  /** Maximum digits before decimal */
  maxWholeDigits?: number;
  /** Show blinking cursor */
  showCursor?: boolean;
  /** Custom styles for the container */
  containerStyle?: ViewStyle;
  /** Custom styles for the display */
  displayStyle?: ViewStyle;
  /** Custom styles for the numpad */
  numpadStyle?: ViewStyle;
  /** Custom styles for numpad buttons */
  buttonStyle?: ViewStyle;
  /** Custom styles for currency text */
  currencyTextStyle?: TextStyle;
  /** Custom styles for amount text */
  amountTextStyle?: TextStyle;
  /** Custom error messages */
  errorMessages?: {
    maxAmount?: string;
    minAmount?: string;
  };
  /** Disable the component */
  disabled?: boolean;
  /** Test ID for testing */
  testID?: string;
}

export interface CurrencyDisplayProps {
  value: string;
  currency: string;
  inputIndex: number;
  showCursor: boolean;
  currencyTextStyle?: TextStyle;
  amountTextStyle?: TextStyle;
  containerStyle?: ViewStyle;
}

export interface NumPadProps {
  onPress: (value: string) => void;
  containerStyle?: ViewStyle;
  buttonStyle?: ViewStyle;
  disabled?: boolean;
}
