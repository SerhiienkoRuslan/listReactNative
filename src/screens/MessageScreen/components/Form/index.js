import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { Text, TouchableOpacity, View } from 'react-native';

import Input from 'components/Input';

import styles from '../../styles';

const SEND_MESSAGE = gql`
  mutation sendMessage($to: Int!, $content: String!) {
    sendMessage(to: $to, content: $content) {
      uuid
      from
      to
      content
      createdAt
    }
  }
`;

const Form = ({ id }) => {
  const [newMessage, setNewMessage] = useState('');

  const [sendMessage] = useMutation(SEND_MESSAGE, {
    onError: (err) => console.log(err)
  });

  const handleSendMessage = () => {
    if (newMessage && id) {
      sendMessage({
        variables: { to: id, content: newMessage }
      });
      setNewMessage('');
    }
  };

  return (
    <View style={styles.sendWrap}>
      <Input
        placeholder="Write a message..."
        onChangeText={(message) => setNewMessage(message)}
        value={newMessage || ''}
      />

      <TouchableOpacity style={styles.sendBtn} onPress={handleSendMessage}>
        <Text style={styles.sendText}>Send</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Form;
