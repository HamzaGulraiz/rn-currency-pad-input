// src/components/CurrencyDisplay.tsx
import React, { useEffect, useRef } from 'react';
import { Text, View, StyleSheet, Animated } from 'react-native';
import type { CurrencyDisplayProps } from '../types';

const CurrencyDisplay: React.FC<CurrencyDisplayProps> = ({
    value,
    currency,
    inputIndex,
    showCursor,
    currencyTextStyle,
    amountTextStyle,
    containerStyle,
}) => {
    const beforeCaret = value.slice(0, inputIndex);
    const afterCaret = value.slice(inputIndex);
    const fadeAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        if (showCursor) {
            const blinkAnimation = Animated.loop(
                Animated.sequence([
                    Animated.timing(fadeAnim, {
                        toValue: 0,
                        duration: 400,
                        useNativeDriver: true,
                    }),
                    Animated.timing(fadeAnim, {
                        toValue: 1,
                        duration: 400,
                        useNativeDriver: true,
                    }),
                ])
            );
            blinkAnimation.start();

            return () => {
                blinkAnimation.stop();
                fadeAnim.setValue(1);
            };
        } else {
            fadeAnim.setValue(1);
            return undefined;
        }
    }, [showCursor, fadeAnim]);

    return (
        <View style={[styles.container, containerStyle]}>
            <Text style={[styles.currency, currencyTextStyle]} maxFontSizeMultiplier={1.4}>
                {`${currency} `}
            </Text>
            <Text style={[styles.amount, amountTextStyle]} maxFontSizeMultiplier={1.4}>
                {beforeCaret}
            </Text>
            {showCursor && (
                <Animated.Text
                    style={[styles.cursor, { opacity: fadeAnim }]}
                    maxFontSizeMultiplier={1.4}
                >
                    |
                </Animated.Text>
            )}
            <Text style={[styles.amount, amountTextStyle]} maxFontSizeMultiplier={1.4}>
                {afterCaret}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
    },
    currency: {
        fontSize: 24,
        fontWeight: '600',
        color: '#333',
    },
    amount: {
        fontSize: 24,
        fontWeight: '600',
        color: '#333',
    },
    cursor: {
        fontSize: 24,
        fontWeight: '300',
        color: '#333',
    },
});

export default CurrencyDisplay;
