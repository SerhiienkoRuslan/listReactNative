import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import uiElementSize from 'constants/uiElementSize';

const Input = ({ onChangeText, placeholderTextColor, placeholder, secureTextEntry, ...props }) => {
  return (
    <View style={styles.inputView} >
      <TextInput
        {...props}
        style={styles.inputText}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor || '#ffffff'}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputView:{
    width: "80%",
    backgroundColor: "#465881",
    borderRadius: uiElementSize.BORDER_RADIUS,
    height: uiElementSize.HEIGHT,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20
  },
  inputText:{
    color: "white"
  }
});

export default Input;
