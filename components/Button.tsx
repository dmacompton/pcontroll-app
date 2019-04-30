import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface Props {
  onPress(): void;
  label: string;
  disabled?: boolean;
}

class Button extends Component<Props> {
  render() {
    const { onPress, label, disabled } = this.props;

    return (
      <TouchableOpacity
        activeOpacity={disabled ? 1 : 0.3}
        disabled={disabled}
        onPress={!disabled ? onPress : undefined}
        style={disabled ? [styles.button, styles.buttonDisabled] : styles.button}
      >
        <Text style={styles.buttonText}>{label}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 3,
    borderColor: '#fff',
    borderWidth: 1,
    margin: 15
  },
  buttonText: {
    color: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 15
  },
  buttonDisabled: {
    opacity: 0.5
  }
});

export default Button;
