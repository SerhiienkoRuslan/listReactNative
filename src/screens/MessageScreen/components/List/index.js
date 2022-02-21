import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { useLazyQuery, useSubscription } from '@apollo/client';

import Loading from 'components/Loading';

import ListItem from '../ChatItem';

import styles from './styles';

import { NEW_MESSAGE, MESSAGER_QUERY } from './graphql';

const List = ({ id }) => {
  const [getMessages, { loading, data }] = useLazyQuery(MESSAGER_QUERY);
  const [messages, setMessages] = useState([]);

  useSubscription(NEW_MESSAGE, {
    onSubscriptionData: ({ subscriptionData: { data: messageData } }) =>
      setMessages((prev) => [messageData.newMessage, ...prev])
  });

  useEffect(() => {
    if (id) getMessages({ variables: { id } });
  }, []);

  useEffect(() => {
    if (data?.getMessages?.length) setMessages(data.getMessages);
  }, [data]);

  if (loading) {
    return <Loading />;
  }

  if (!data) {
    return (
      <View style={styles.centered}>
        <Text>No Message yet...</Text>
      </View>
    );
  }

  return (
    <FlatList
      style={{ flexGrow: 1 }}
      data={messages}
      renderItem={({ item }) => <ListItem item={item} />}
      keyExtractor={(item) => item.uuid.toString()}
    />
  );
};

export default List;
