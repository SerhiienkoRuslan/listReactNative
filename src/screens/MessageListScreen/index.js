import React from 'react';
import { View, Text } from 'react-native';
import { gql, useQuery } from '@apollo/client';

import MessagesList from 'components/MessagesList';
import Loading from 'components/Loading';

const GET_USERS = gql`
  query getUsers {
    getUsers {
      id
      username
      createdAt
      latestMessage {
        uuid
        from
        to
        content
        createdAt
      }
    }
  }
`

const MessageListScreen = ({ navigation }) => {
  let usersMarkup;

  const { data, loading } = useQuery(GET_USERS);

  if (!data || loading) {
    usersMarkup = <Loading />
  } else if (data?.getUsers?.length === 0) {
    usersMarkup = <Text>No users have joined yet</Text>
  } else if (data?.getUsers?.length > 0) {
    usersMarkup = <MessagesList
      navigation={navigation}
      users={data?.getUsers}
    />
  }

  return (
    <View style={{ flexGrow: 1 }}>
      {usersMarkup}
    </View>
  );
};

export default MessageListScreen;
