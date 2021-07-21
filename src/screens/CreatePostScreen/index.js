import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'

import routesName from 'constants/routesName';

const CreatePostScreen = ({ navigation }) => {
  return (
    <View style={styles.center}>
      <Text>CREATE POST</Text>
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate(routesName.HOME_SCREEN)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
});

export default CreatePostScreen;
