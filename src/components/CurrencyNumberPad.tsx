// src/components/CurrencyNumberPad.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { CurrencyNumberPadProps } from '../types';
import { useCurrencyInput } from '../hooks/useCurrencyInput';
import CurrencyDisplay from './CurrencyDisplay';
import NumPad from './NumPad';

const CurrencyNumberPad: React.FC<CurrencyNumberPadProps> = ({
    initialValue = '0.00',
    currency = '$',
    maxAmount,
    minAmount,
    onValueChange,
    onError,
    customValidator,
    maxWholeDigits = 6,
    showCursor = true,
    containerStyle,
    displayStyle,
    numpadStyle,
    buttonStyle,
    currencyTextStyle,
    amountTextStyle,
    errorMessages,
    disabled = false,
    testID,
}) => {
    const {
        value,
        inputIndex,
        error,
        hasError,
        updateValue,
    } = useCurrencyInput({
        initialValue,
        maxAmount,
        minAmount,
        maxWholeDigits,
        onValueChange,
        onError,
        customValidator,
        errorMessages,
    });

    return (
        <View style={[styles.container, containerStyle]} testID={testID}>
            <CurrencyDisplay
                value={value}
                currency={currency}
                inputIndex={inputIndex}
                showCursor={showCursor && !disabled}
                currencyTextStyle={currencyTextStyle}
                amountTextStyle={amountTextStyle}
                containerStyle={displayStyle}
            />

            <NumPad
                onPress={updateValue}
                containerStyle={numpadStyle}
                buttonStyle={buttonStyle}
                disabled={disabled}
            />

            {hasError && (
                <Text style={styles.errorText} testID={`${testID}-error`}>
                    {error}
                </Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    errorText: {
        color: '#ff4444',
        fontSize: 14,
        textAlign: 'center',
        marginTop: 10,
        paddingHorizontal: 20,
    },
});

export default CurrencyNumberPad;
