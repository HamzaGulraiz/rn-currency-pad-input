# 💰 React Native Currency Number Pad

A highly customizable, TypeScript-ready currency input component for React Native with decimal precision, validation, and smooth animations.

![demo](https://postimg.cc/gwNDhszj)

## ✨ Features

- 🎯 **Decimal precision handling** with automatic formatting
- 💱 **Multi-currency support** with customizable symbols
- ✅ **Built-in validation** (min/max amounts, custom validators)
- 🎨 **Fully customizable** styling and theming
- 📱 **Cross-platform** (iOS & Android)
- 🔢 **Smart number formatting** with comma separators
- ⚡ **Performance optimized** with React.memo and useCallback
- 🎭 **Smooth animations** using React Native's Animated API
- 🧪 **Test-friendly** with comprehensive testID support
- 📝 **TypeScript** first with full type safety
- ♿ **Accessibility** ready with proper font scaling

## 🚀 Installation

### Option 1: Direct Integration (Recommended)

Copy the component files directly into your project:

```bash
# No additional dependencies required!
# Just copy the component files to your project
```

### Option 2: As NPM Package

```bash
npm install react-native-currency-numpad
# or
yarn add react-native-currency-numpad
```

## 📋 Requirements

- React Native 0.60+
- React 16.8+
- TypeScript (optional but recommended)

**No additional native dependencies required!** This package uses only React Native's built-in APIs.

## 🎯 Quick Start

```typescript
import React from 'react';
import { SafeAreaView } from 'react-native';
import CurrencyNumberPad from './src/components/CurrencyNumberPad';

const App = () => {
  const handleValueChange = (value: string, numericValue: number) => {
    console.log('Formatted:', value, 'Numeric:', numericValue);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CurrencyNumberPad
        currency="$"
        maxAmount={10000}
        onValueChange={handleValueChange}
      />
    </SafeAreaView>
  );
};

export default App;
```

## 📖 API Reference

### Props

| Prop              | Type                                            | Default      | Description                   |
| ----------------- | ----------------------------------------------- | ------------ | ----------------------------- |
| `currency`        | `string`                                        | `"$"`        | Currency symbol to display    |
| `initialValue`    | `string`                                        | `"0.00"`     | Initial amount value          |
| `maxAmount`       | `number`                                        | `undefined`  | Maximum allowed amount        |
| `minAmount`       | `number`                                        | `undefined`  | Minimum allowed amount        |
| `maxWholeDigits`  | `number`                                        | `6`          | Maximum digits before decimal |
| `showCursor`      | `boolean`                                       | `true`       | Show blinking cursor          |
| `disabled`        | `boolean`                                       | `false`      | Disable the input             |
| `onValueChange`   | `(value: string, numericValue: number) => void` | **Required** | Called when value changes     |
| `onError`         | `(error: string) => void`                       | `undefined`  | Called when validation fails  |
| `customValidator` | `(value: number) => string \| null`             | `undefined`  | Custom validation function    |

### Styling Props

| Prop                | Type        | Description                   |
| ------------------- | ----------- | ----------------------------- |
| `containerStyle`    | `ViewStyle` | Main container styling        |
| `displayStyle`      | `ViewStyle` | Currency display area styling |
| `numpadStyle`       | `ViewStyle` | Number pad container styling  |
| `buttonStyle`       | `ViewStyle` | Individual button styling     |
| `currencyTextStyle` | `TextStyle` | Currency symbol text styling  |
| `amountTextStyle`   | `TextStyle` | Amount text styling           |

### Error Messages

| Prop                      | Type     | Description                    |
| ------------------------- | -------- | ------------------------------ |
| `errorMessages`           | `object` | Custom error message overrides |
| `errorMessages.maxAmount` | `string` | Max amount error message       |
| `errorMessages.minAmount` | `string` | Min amount error message       |

## 🎨 Customization Examples

### Basic Styling

```typescript
<CurrencyNumberPad
  currency="PKR"
  containerStyle={{ backgroundColor: '#f0f0f0' }}
  displayStyle={{
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginHorizontal: 20,
    padding: 15
  }}
  currencyTextStyle={{
    color: '#007AFF',
    fontSize: 28,
    fontWeight: 'bold'
  }}
  amountTextStyle={{
    color: '#333',
    fontSize: 28
  }}
  onValueChange={handleValueChange}
/>
```

### Advanced Configuration

```typescript
<CurrencyNumberPad
  currency="€"
  initialValue="0.00"
  maxAmount={50000}
  minAmount={10}
  maxWholeDigits={5}

  // Custom validation
  customValidator={(value) => {
    if (value > 0 && value < 5) {
      return 'Amount must be at least €5.00';
    }
    if (value % 5 !== 0) {
      return 'Amount must be multiple of 5';
    }
    return null;
  }}

  // Custom error messages
  errorMessages={{
    maxAmount: 'Maximum limit of €50,000 exceeded!',
    minAmount: 'Please enter at least €10.00',
  }}

  // Event handlers
  onValueChange={(value, numericValue) => {
    setAmount(value);
    console.log('Euro amount:', numericValue);
  }}

  onError={(error) => {
    setErrorMessage(error);
  }}

  // Custom styling
  numpadStyle={{ gap: 15 }}
  buttonStyle={{
    backgroundColor: '#007AFF',
    borderColor: '#005bb5',
    borderRadius: 12,
  }}

  testID="euro-currency-pad"
/>
```

### Dark Theme Example

```typescript
<CurrencyNumberPad
  currency="$"
  containerStyle={{ backgroundColor: '#1a1a1a' }}
  displayStyle={{ backgroundColor: '#2a2a2a' }}
  currencyTextStyle={{ color: '#ffffff' }}
  amountTextStyle={{ color: '#ffffff' }}
  buttonStyle={{
    backgroundColor: '#333333',
    borderColor: '#555555',
  }}
  onValueChange={handleValueChange}
/>
```

## 🏗️ Project Structure

```
src/components/CurrencyNumberPad/
├── index.ts                    # Main exports
├── types/
│   └── index.ts               # TypeScript interfaces
├── components/
│   ├── CurrencyNumberPad.tsx  # Main component
│   ├── CurrencyDisplay.tsx    # Display with cursor
│   └── NumPad.tsx            # Number pad buttons
├── hooks/
│   └── useCurrencyInput.ts   # Input logic hook
└── utils/
    └── formatters.ts         # Formatting utilities
```

## 🧪 Testing

The component includes comprehensive testID support:

```typescript
// Main component
testID = 'currency-numpad';

// Error display
testID = 'currency-numpad-error';

// Individual buttons automatically get testIDs
```

### Jest Testing Example

```typescript
import { render, fireEvent } from '@testing-library/react-native';
import CurrencyNumberPad from './CurrencyNumberPad';

test('should format currency correctly', () => {
  const mockOnValueChange = jest.fn();

  const { getByTestId } = render(
    <CurrencyNumberPad
      currency="$"
      onValueChange={mockOnValueChange}
      testID="test-numpad"
    />
  );

  // Test number input
  fireEvent.press(getByTestId('test-numpad').findByText('1'));
  fireEvent.press(getByTestId('test-numpad').findByText('2'));

  expect(mockOnValueChange).toHaveBeenCalledWith('12.00', 12);
});
```

## 🚨 Common Issues & Solutions

### Issue: Animation not working

**Solution:** Make sure you're not using any conflicting animation libraries.

### Issue: Cursor not blinking

**Solution:** Ensure `showCursor={true}` is set and the component is properly mounted.

### Issue: Formatting issues

**Solution:** Check that your `initialValue` is properly formatted (e.g., "0.00").

### Issue: TypeScript errors

**Solution:** Ensure you're importing types correctly:

```typescript
import type { CurrencyNumberPadProps } from './types';
```

## 🎯 Best Practices

1. **Always handle errors**: Implement `onError` callback for better UX
2. **Use custom validation**: Implement business logic with `customValidator`
3. **Test on both platforms**: Ensure consistent behavior on iOS and Android
4. **Accessibility**: Test with screen readers and font scaling
5. **Performance**: Use React.memo for parent components if re-rendering frequently

## 🔄 Migration Guide

### From Version 1.x to 2.x

```typescript
// Old API
<CurrencyInput onAmountChange={handleChange} />

// New API
<CurrencyNumberPad onValueChange={(value, numeric) => handleChange(numeric)} />
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Setup

```bash
git clone https://github.com/your-username/react-native-currency-numpad.git
cd react-native-currency-numpad
yarn install

# Run tests
yarn test

# Run linter
yarn lint

# Build TypeScript
yarn build
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by financial apps requiring precise currency input
- Built with modern React Native best practices
- TypeScript-first approach for better developer experience

Made with ❤️ for the React Native community

## Author

👤 **Hamza Gulraiz**

## 📬 Support me

<p>
  <a href="mailto:devhamzagulraiz@gmail.com">
    <img alt="Email" src="https://img.shields.io/badge/email-D14836?style=for-the-badge&logo=gmail&logoColor=white"/>
  </a>
  <a href="https://www.linkedin.com/in/hamza-gulraiz-b1a105251/" target="_blank">
    <img alt="LinkedIn" src="https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white"/>
  </a>
  <a href="https://github.com/HamzaGulraiz" target="_blank">
    <img alt="GitHub" src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"/>
  </a>
  <a href="https://stackoverflow.com/users/23890926/hamza-gulraiz" target="_blank">
    <img alt="StackOverflow" src="https://img.shields.io/badge/stack%20overflow-FE7A16?style=for-the-badge&logo=stack-overflow&logoColor=white"/>
  </a>
  <a href="https://www.npmjs.com/~dev-hamza" target="_blank">
    <img alt="npm" src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white"/>
  </a>
  <a href="https://www.instagram.com/hamza_gulraiz" target="_blank">
    <img alt="Instagram" src="https://img.shields.io/badge/instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white"/>
  </a>
  <a href="https://www.facebook.com/drago.power" target="_blank">
    <img alt="Facebook" src="https://img.shields.io/badge/facebook-1877F2?style=for-the-badge&logo=facebook&logoColor=white"/>
  </a>
</p>

---

```

```
