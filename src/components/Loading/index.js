import React from 'react';
import { View, ActivityIndicator } from 'react-native';

import colors from 'styles/colors';

import styles from './styles';

export default () => (
  <View style={styles.centered}>
    <ActivityIndicator size="large" color={colors.primary} />
  </View>
);
