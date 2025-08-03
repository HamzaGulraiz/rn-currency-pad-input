// Example usage:
import { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { CurrencyNumberPad } from 'rn-currency-pad-input';

const App = () => {
    const [, setAmount] = useState('0.00');

    const handleValueChange = (value: string, numericValue: number) => {
        setAmount(value);
        console.log('Value:', value, 'Numeric:', numericValue);
    };

    const handleError = (error: string) => {
        if (error) {
            Alert.alert('Error', error);
        }
    };

    const customValidator = (value: number): string | null => {
        if (value > 0 && value < 1) {
            return 'Amount must be at least $1.00';
        }
        return null;
    };

    return (
        <View style={styles.container}>
            <CurrencyNumberPad
                initialValue="0.00"
                currency="$"
                maxAmount={10000}
                minAmount={1}
                onValueChange={handleValueChange}
                onError={handleError}
                customValidator={customValidator}
                maxWholeDigits={5}
                showCursor={true}
                errorMessages={{
                    maxAmount: 'Maximum amount exceeded!',
                    minAmount: 'Please enter at least $1.00',
                }}
                testID="currency-numpad"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
});

export default App;
