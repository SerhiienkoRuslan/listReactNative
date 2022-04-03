import React from 'react';
import { Platform, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import AppleStyleSwipeableRow from './components/AppleStyleSwipeableRow';
import MessageListItem from './components/MessageListItem';

const MessagesList = ({ users }) => {
  const isWeb = Platform.OS === 'web';

  const ItemSwipeable = (item) => {
    if (isWeb) {
      return <MessageListItem item={item} />;
    }

    return (
      <AppleStyleSwipeableRow>
        <MessageListItem item={item} />
      </AppleStyleSwipeableRow>
    );
  };

  return (
    <FlatList
      style={{ flexGrow: 1 }}
      data={users || []}
      renderItem={({ item }) => ItemSwipeable(item)}
      keyExtractor={(item) => item._id.toString()}
    />
  );
};

export default MessagesList;
