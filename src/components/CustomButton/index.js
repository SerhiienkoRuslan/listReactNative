import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import uiElementSize from 'constants/uiElementSize';

const CustomButton = ({ onPress, text, ...rest }) => {
  return (
    <TouchableOpacity
      {...rest}
      style={styles.submit}
      onPress={onPress}
    >
      <Text style={styles.text}>{text || ''}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  submit:{
    width: "80%",
    backgroundColor: "#fb5b5a",
    borderRadius: uiElementSize.BORDER_RADIUS,
    height: uiElementSize.HEIGHT,
    alignItems:"center",
    justifyContent:"center"
  },
  text:{
    color:"white",
    height: uiElementSize.HEIGHT
  }
});

export default CustomButton;
