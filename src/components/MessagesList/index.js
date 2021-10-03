import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { FlatList, RectButton } from 'react-native-gesture-handler';

import { useMessageDispatch, useMessageState } from '../../context/message';

import AppleStyleSwipeableRow from './AppleStyleSwipeableRow';

const MessagesList = () => {
  const [isSwiping, setSwiping] = useState(false);
  const dispatch = useMessageDispatch();
  const { users } = useMessageState();

  const selectedUser = users?.find((u) => u.selected === true)?.username;

  const Row = ({ item }) => {
    const selected = selectedUser === item.username;

    return (
      <RectButton
        style={styles.rectButton}
        onPress={() => {
          console.log('-pr')
          dispatch({ type: 'SET_SELECTED_USER', payload: item.username });
        }}
      >
        <Text style={styles.fromText}>
          {item?.username || ''}
        </Text>

        <Text numberOfLines={2} style={styles.messageText}>
          {item?.latestMessage?.content || ''}
        </Text>

        <Text style={styles.dateText}>
          {item?.latestMessage?.createdAt ? new Date(item?.latestMessage?.createdAt).toISOString().split('T')[0] : ''}
          {' '}❭
        </Text>
      </RectButton>
    )
  };

  const ItemSwipeable = (item) => (
    <AppleStyleSwipeableRow>
      <Row item={item} />
    </AppleStyleSwipeableRow>
  );

  return (
    <FlatList
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      style={{ flexGrow: 1 }}
      data={users || []}
      scrollEnabled={!isSwiping}
      renderItem={({ item }) => ItemSwipeable(item)}
    />
  );
};

const styles = StyleSheet.create({
  rectButton: {
    flex: 1,
    height: 80,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    flexDirection: 'column',
    backgroundColor: 'white',
    color: '#000'
  },
  separator: {
    backgroundColor: 'rgb(200, 199, 204)',
    height: 1
  },
  fromText: {
    fontWeight: 'bold',
    backgroundColor: 'transparent'
  },
  messageText: {
    color: '#999',
    backgroundColor: 'transparent'
  },
  dateText: {
    backgroundColor: 'transparent',
    position: 'absolute',
    right: 20,
    top: 10,
    color: '#999',
    fontWeight: 'bold'
  }
});

export default MessagesList;
