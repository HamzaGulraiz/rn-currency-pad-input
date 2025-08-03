// src/components/NumPad.tsx
import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet, Dimensions } from 'react-native';
import type { NumPadProps } from '../types';


const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const dialPadContent = [1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0, 'X'];

const NumPad: React.FC<NumPadProps> = ({
    onPress,
    containerStyle,
    buttonStyle,
    disabled = false,
}) => {
    const handlePress = (item: string | number) => {
        if (!disabled) {
            onPress(item.toString());
        }
    };

    return (
        <View style={[styles.container, containerStyle]}>
            {dialPadContent.map((item, index) => (
                <TouchableOpacity
                    key={index}
                    style={[
                        styles.button,
                        buttonStyle,
                        disabled && styles.buttonDisabled,
                    ]}
                    onPress={() => handlePress(item)}
                    disabled={disabled}
                    activeOpacity={0.7}
                >
                    {item === 'X' ? (
                        <Text style={[styles.buttonText, styles.deleteText]}>⌫</Text>
                    ) : (
                        <Text style={styles.buttonText}>{item}</Text>
                    )}
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 10,
        paddingHorizontal: 20,
    },
    button: {
        width: screenWidth * 0.25,
        height: screenHeight * 0.08,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    buttonDisabled: {
        backgroundColor: '#f0f0f0',
        opacity: 0.6,
    },
    buttonText: {
        fontSize: 24,
        fontWeight: '600',
        color: '#333',
    },
    deleteText: {
        fontSize: 20,
    },
});

export default React.memo(NumPad);