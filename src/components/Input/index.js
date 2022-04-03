import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import uiElementSize from 'constants/uiElementSize';
import colors from 'styles/colors';

const Input = ({
  onChangeText,
  placeholderTextColor,
  placeholder,
  secureTextEntry,
  customStyles,
  ...props
}) => {
  return (
    <View style={styles.inputView}>
      <TextInput
        {...props}
        style={[styles.inputText, customStyles]}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor || '#ffffff'}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputView: {
    width: '80%',
    backgroundColor: colors.backgroundColorSecond,
    borderRadius: uiElementSize.BORDER_RADIUS,
    height: uiElementSize.HEIGHT_INPUTS,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20
  },
  inputText: {
    color: 'white'
  }
});

export default Input;
