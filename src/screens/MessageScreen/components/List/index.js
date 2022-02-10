import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { gql, useLazyQuery, useSubscription } from '@apollo/client';

import Loading from 'components/Loading';

import ListItem from '../ListItem';

import styles from '../../styles';

const MESSAGER_QUERY = gql`
  query Messages($id: Int!) {
    getMessages(id: $id) {
      uuid
      content
      from
      to
      createdAt
    }
  }
`;

const NEW_MESSAGE = gql`
  subscription newMessage {
    newMessage {
      from
      to
      content
      uuid
    }
  }
`;

const List = ({ id }) => {
  const [getMessages, { loading, data }] = useLazyQuery(MESSAGER_QUERY);
  const [messages, setMessages] = useState([]);

  const { data: messageData, error: messageError } = useSubscription(
    NEW_MESSAGE
  );

  useEffect(() => {
    if (id) getMessages({ variables: { id } });
  }, []);

  useEffect(() => {
    if (data?.getMessages?.length) setMessages(data.getMessages);
  }, [data]);

  useEffect(() => {
    if (messageData?.newMessage)
      setMessages((prev) => [messageData.newMessage, ...prev]);
    if (messageError) setMessages([]);
  }, [messageData, messageError]);

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
