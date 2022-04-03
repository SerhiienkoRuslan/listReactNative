import React from 'react';
import { Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

import routesName from 'constants/routesName';

import styles from './styles';

const MessageListItem = ({ item }) => {
  const navigation = useNavigation();

  const handleOnPress = () => {
    navigation?.navigate(routesName.CHAT_SCREEN, {
      messager: {
        ...item,
        id: item.id,
        title: item.name || 'Messager'
      }
    });
  };

  return (
    <RectButton style={styles.rectButton} onPress={handleOnPress}>
      <View style={styles.avatar} />

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.fromText}>{item?.name || ''}</Text>

          <Text style={styles.dateText}>
            {item?.latestMessage?.createdAt
              ? new Date(item?.latestMessage?.createdAt)
                  .toISOString()
                  .split('T')[0]
              : ''}
          </Text>
        </View>

        <Text numberOfLines={1} style={styles.messageText}>
          {item?.latestMessage?.text || 'No Message yet'}
        </Text>
      </View>
    </RectButton>
  );
};

export default MessageListItem;
