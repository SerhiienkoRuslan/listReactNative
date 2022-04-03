import React, { useCallback } from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import * as Updates from 'expo-updates';

import styles from './styles';

const ErrorBoundary = () => {
  const onReloadPress = useCallback(() => {
    if (Platform.OS === 'web') {
      location.reload();
    } else {
      Updates.reloadAsync();
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Something went wrong...</Text>

      <TouchableOpacity style={styles.loginBtn} onPress={onReloadPress}>
        <Text style={styles.loginText}>Try Again</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ErrorBoundary;
