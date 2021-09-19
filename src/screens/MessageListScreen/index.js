import React from 'react';
import { View } from 'react-native';
import MessagesList from 'components/MessagesList';

const MessageListScreen = () => {
  return (
    <View style={{ flexGrow: 1 }}>
      <MessagesList
        handleEdit={() => {}}
        handleDelete={() => {}}
        items={null}
      />
    </View>
  );
};

export default MessageListScreen;
