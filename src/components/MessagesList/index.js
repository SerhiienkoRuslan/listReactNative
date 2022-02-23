import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { FlatList, RectButton } from 'react-native-gesture-handler';

import routesName from 'constants/routesName';

import AppleStyleSwipeableRow from './AppleStyleSwipeableRow';

const MessagesList = ({ navigation, users }) => {
  const isWeb = Platform.OS === 'web';

  const Row = ({ item }) => {
    return (
      <RectButton
        style={styles.rectButton}
        onPress={() => {
          navigation?.navigate(routesName.CHAT_SCREEN, {
            messager: {
              ...item,
              id: item.id,
              title: item.name || 'Messager'
            }
          });
        }}
      >
        <Text style={styles.fromText}>{item?.name || ''}</Text>

        <Text numberOfLines={2} style={styles.messageText}>
          {item?.latestMessage?.text || 'No Message yet'}
        </Text>

        <Text style={styles.dateText}>
          {item?.latestMessage?.createdAt
            ? new Date(item?.latestMessage?.createdAt)
                .toISOString()
                .split('T')[0]
            : ''}{' '}
          ❭
        </Text>
      </RectButton>
    );
  };

  const ItemSwipeable = (item) => {
    if (isWeb) {
      return <Row item={item} />;
    }

    return (
      <AppleStyleSwipeableRow>
        <Row item={item} />
      </AppleStyleSwipeableRow>
    );
  };

  return (
    <FlatList
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      style={{ flexGrow: 1 }}
      data={users || []}
      renderItem={({ item }) => ItemSwipeable(item)}
      keyExtractor={(item) => item._id.toString()}
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
