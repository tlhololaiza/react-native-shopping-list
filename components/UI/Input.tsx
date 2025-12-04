import React from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {
  accessibilityLabel: string;
}

export const Input: React.FC<InputProps> = ({ style, accessibilityLabel, ...props }) => {
  return (
    <TextInput
      style={[styles.input, style]}
      accessibilityLabel={accessibilityLabel}
      placeholderTextColor="#999"
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
});