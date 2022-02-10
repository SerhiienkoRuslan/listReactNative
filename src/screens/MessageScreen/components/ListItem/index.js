import React from 'react';
import { Text } from 'react-native';

import styles from '../../styles';

const ListItem = ({ item }) => {
  const { content } = item;

  return <Text style={styles.header}>{content}</Text>;
};

export default ListItem;
