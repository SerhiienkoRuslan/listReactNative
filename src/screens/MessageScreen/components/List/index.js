import React, { useEffect } from 'react';
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
    }
  }
`;

const List = ({ id }) => {
  const [getMessages, { loading, data }] = useLazyQuery(MESSAGER_QUERY);

  const { data: messageData, error: messageError } = useSubscription(
    NEW_MESSAGE
  );

  console.log('messageData', messageData);
  console.log('messageError', messageError);

  useEffect(() => {
    if (id) getMessages({ variables: { id } });
  }, []);

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
      data={data?.getMessages || []}
      renderItem={({ item }) => <ListItem item={item} />}
      keyExtractor={(item) => item.uuid.toString()}
    />
  );
};

export default List;
