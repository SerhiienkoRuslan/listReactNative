import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import uiElementSize from 'constants/uiElementSize';
import colors from 'styles/colors';

const CustomButton = ({ onPress, text, customStyles, ...rest }) => {
  return (
    <TouchableOpacity
      {...rest}
      style={[styles.submitBtn, customStyles]}
      onPress={onPress}
    >
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  submitBtn: {
    height: uiElementSize.HEIGHT_INPUTS,
    backgroundColor: colors.primary,
    borderRadius: uiElementSize.BORDER_RADIUS,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: 'white'
  }
});

CustomButton.defaultProps = {
  onPress: () => {},
  text: ''
};

export default CustomButton;
