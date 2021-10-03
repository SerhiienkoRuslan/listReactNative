import React from 'react';
import { View, Text } from 'react-native';
import { gql, useQuery } from '@apollo/client';

import MessagesList from 'components/MessagesList';
import Loading from 'components/Loading';
import { useMessageDispatch, useMessageState } from '../../context/message';

const GET_USERS = gql`
  query getUsers {
    getUsers {
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

const MessageListScreen = () => {
  const dispatch = useMessageDispatch();
  const { users } = useMessageState();

  let usersMarkup;

  const { loading } = useQuery(GET_USERS, {
    onCompleted: (data) =>
      dispatch({ type: 'SET_USERS', payload: data.getUsers }),
    onError: (err) => console.log(err)
  });

  if (!users || loading) {
    usersMarkup = <Loading />
  } else if (users.length === 0) {
    usersMarkup = <Text>No users have joined yet</Text>
  } else if (users.length > 0) {
    usersMarkup = <MessagesList />
  }

  return (
    <View style={{ flexGrow: 1 }}>
      {usersMarkup}
    </View>
  );
};

export default MessageListScreen;
