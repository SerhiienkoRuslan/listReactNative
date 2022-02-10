import React from 'react';
import { View } from 'react-native';

import Form from './components/Form';
import List from './components/List';

import styles from './styles';

const MessageScreen = ({ route }) => {
  const currentId = route?.params?.messager?.id;

  return (
    <View style={styles.wrap}>
      <List id={currentId} />

      <Form id={currentId} />
    </View>
  );
};

export default MessageScreen;
